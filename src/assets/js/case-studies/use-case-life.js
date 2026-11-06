// Moved verbatim from the use-case-life story page (src/projects/use-case-life/index.njk).
// Loaded with defer after case-study.js, which defines the Pudding helpers this uses.
// Edits to this file do not change the story's clearance hash.
(function(){
  const form=document.getElementById("toyForm");
  // [field, question, short plain label, principle chips, default]
  const qs=[
    ["already_in_use","Is it already in use?","Already in use",["context"],"yes"],
    ["student_decisions","Does it inform decisions about students or applicants?","Informs decisions about students",["fairness","accountability"],"yes"],
    ["human_review","Does a person review its output before anyone acts on it?","A person reviews output first",["accountability"],"yes"],
    ["personal_data","Does it use personal information?","Uses personal information",["privacy"],"unsure"],
    ["public_facing","Will students or the public interact with it directly?","Students use it directly",["transparency"],"no"]
  ];
  const labels={};
  qs.forEach(([key,label,short,cats,def],i)=>{
    labels[key]=label;
    const row=document.createElement("div");row.className="qrow";
    const q=document.createElement("span");q.id="ql"+i;q.textContent=label;
    const c=document.createElement("span");c.className="qchips";
    cats.forEach(t=>{const s=document.createElement("span");s.textContent=t;c.appendChild(s);});
    const seg=document.createElement("div");seg.className="seg";seg.setAttribute("role","radiogroup");seg.setAttribute("aria-labelledby","ql"+i);
    ["yes","no","unsure"].forEach(v=>{
      const id="q-"+key+"-"+v;
      const inp=document.createElement("input");inp.type="radio";inp.name=key;inp.value=v;inp.id=id;if(v===def)inp.checked=true;
      const lab=document.createElement("label");lab.htmlFor=id;lab.textContent=v[0].toUpperCase()+v.slice(1);
      seg.appendChild(inp);seg.appendChild(lab);
    });
    row.appendChild(q);row.appendChild(seg);row.appendChild(c);form.appendChild(row);
  });
  const statedList=document.getElementById("statedList"), compList=document.getElementById("compList"),
        reviewLine=document.getElementById("reviewLine"), retroLine=document.getElementById("retroLine"),
        strip=document.getElementById("rstrip"), rStatus=document.getElementById("rStatus");
  const mark=(window.Pudding&&Pudding.changed)||function(){};
  const reduce=!!(window.Pudding&&Pudding.reduce);
  function stagger(els){els.filter(Boolean).forEach((el,i)=>{if(reduce||!i)mark(el);else setTimeout(()=>mark(el),i*120);});}
  function li(parent,proKey,genKey,v,cls){
    const e=document.createElement("li");
    const p=document.createElement("span");p.dataset.aud="pro";p.textContent=proKey+" = ";
    const g=document.createElement("span");g.dataset.aud="gen";g.textContent=genKey+": ";
    const b=document.createElement("span");b.textContent=v;if(cls)b.className=cls;
    e.appendChild(p);e.appendChild(g);e.appendChild(b);parent.appendChild(e);
  }
  const LEVELS=["self","light","full"], NAMES={self:"Self-serve",light:"Light review",full:"Full review"}, cap=t=>NAMES[t]||t, low=t=>(NAMES[t]||t).toLowerCase();
  // Invented rules for an invented college.
  const RULES={
    a:c=>(c.student_decisions==="yes"&&c.human_review==="no")?"full":(c.student_decisions==="yes"||c.public_facing==="yes")?"light":"self",
    b:c=>c.student_decisions==="yes"?"full":(c.personal_data==="yes"||c.public_facing==="yes")?"light":"self"
  };
  // An unsure answer isn't counted as a no: try it both ways and keep the range of results.
  function evaluate(a,rules){
    let combos=[{}];
    qs.forEach(([k])=>{const opts=a[k]==="unsure"?["yes","no"]:[a[k]];combos=[].concat.apply([],combos.map(c=>opts.map(o=>Object.assign({},c,{[k]:o}))));});
    const idx=combos.map(c=>LEVELS.indexOf(RULES[rules](c)));
    const lo=LEVELS[Math.min.apply(null,idx)], hi=LEVELS[Math.max.apply(null,idx)];
    return {lo,hi,pending:lo!==hi};
  }
  const levelText=r=>r.pending?"Pending: "+cap(r.lo)+" to "+cap(r.hi):cap(r.lo);
  const levelWords=r=>r.pending?"pending ("+low(r.lo)+" to "+low(r.hi)+")":low(r.lo);
  function results(a){
    const r=evaluate(a,"a");
    const privacy=a.personal_data==="yes"?"routed":a.personal_data==="unsure"?"follow-up":"not needed";
    const unsure=qs.filter(([k])=>a[k]==="unsure").map(([k])=>labels[k]);
    const expert=(r.lo==="full"||unsure.length)?"triggered":"not triggered";
    return {r,privacy,unsure,expert};
  }
  let ANS=null, RES=null, PREV=null;
  const REF="REF-"+String(1000+Math.floor(Math.random()*9000));
  function run(){
    const a={};qs.forEach(([k])=>{const c=form.querySelector('input[name="'+k+'"]:checked');a[k]=c?c.value:"unsure";});
    const R=results(a);
    statedList.textContent="";compList.textContent="";
    qs.forEach(([k,,short])=>li(statedList,"answer."+k,short,a[k],a[k]==="unsure"?"v-review":""));
    li(compList,"derived.review_path","Review path",levelWords(R.r),R.r.pending?"v-review":"v-flag");
    li(compList,"derived.privacy_routing","Privacy routing",R.privacy,R.privacy==="routed"?"v-flag":R.privacy==="follow-up"?"v-review":"v-none");
    li(compList,"derived.expert_review","Expert review",R.expert,R.expert==="triggered"?"v-flag":"v-none");
    // Result strip: three paths as structure, privacy separate from the path
    strip.querySelector("[data-ltext]").textContent=levelText(R.r);
    const lo=LEVELS.indexOf(R.r.lo), hi=LEVELS.indexOf(R.r.hi);
    strip.querySelectorAll("[data-l]").forEach(seg=>{const i=LEVELS.indexOf(seg.dataset.l);
      seg.classList.toggle("cur",!R.r.pending&&i===lo);seg.classList.toggle("maybe",R.r.pending&&i>=lo&&i<=hi);});
    const pp=strip.querySelector('[data-pill="priv"]'), pe=strip.querySelector('[data-pill="exp"]');
    pp.textContent="Privacy: "+R.privacy;pp.className="pill "+(R.privacy==="routed"?"flag":R.privacy==="follow-up"?"rev":"");
    pe.textContent="Expert review: "+R.expert;pe.className="pill "+(R.expert==="triggered"?"flag":"");
    reviewLine.textContent=R.unsure.length?"Unsure on: "+R.unsure.join(" · ")+" Each one goes to a reviewer to follow up.":"No unsure answers to follow up.";
    reviewLine.classList.toggle("none",!R.unsure.length);
    retroLine.textContent=a.already_in_use==="yes"?"You've just assessed something already running. That's an assessment after the fact."
                         :a.already_in_use==="no"?"You've assessed it before it runs, which is the cheap case.":"";
    renderNotice(a,R);
    const now={level:levelText(R.r),privacy:R.privacy,expert:R.expert};
    if(PREV){
      const msgs=[], els=[];
      if(PREV.level!==now.level){msgs.push("Review path: "+PREV.level+" → "+now.level);els.push(strip.querySelector("[data-ltext]"),document.getElementById("nLevel"));}
      if(PREV.privacy!==now.privacy){msgs.push("Privacy: "+PREV.privacy+" → "+now.privacy);els.push(pp,document.getElementById("nPriv"));}
      if(PREV.expert!==now.expert){msgs.push("Expert review: "+PREV.expert+" → "+now.expert);els.push(pe,document.getElementById("nNext"));}
      if(els.length) els.splice(1,0,document.getElementById("nSubject"));
      stagger(els);
      rStatus.textContent=msgs.length?msgs.join(". ")+".":"Same result.";
    }
    PREV=now; ANS=a; RES=R;
    renderSwap(); renderReassess();
  }
  // Notice, modeled on tools that turn answers into a report with its reasoning and limits
  function renderNotice(a,R){
    const p=R.r.pending;
    document.getElementById("nSubject").textContent="Your AI use case: "+(p?"review path pending":cap(R.r.lo))+(R.expert==="triggered"?", expert review triggered":"");
    document.getElementById("nRef").textContent=REF+" (invented)";
    document.getElementById("nLevel").textContent=p?"Pending: between "+low(R.r.lo)+" and "+low(R.r.hi)+", depending on your unsure answers.":cap(R.r.lo);
    const why=[];
    if(a.student_decisions==="yes") why.push("It informs decisions about students or applicants.");
    if(a.student_decisions==="yes"&&a.human_review==="no") why.push("No person reviews its output before it's acted on.");
    if(a.public_facing==="yes") why.push("Students or the public interact with it directly.");
    if(a.personal_data==="yes") why.push("It uses personal information.");
    if(R.unsure.length) why.push("You were unsure on "+R.unsure.length+(R.unsure.length===1?" question.":" questions."));
    if(!why.length) why.push("None of the answers raised a risk indicator.");
    const ul=document.getElementById("nWhy"); ul.textContent=""; why.forEach(t=>{const li=document.createElement("li");li.textContent=t;ul.appendChild(li);});
    document.getElementById("nPriv").textContent=R.privacy==="routed"?"Routed to privacy for review.":R.privacy==="follow-up"?"Privacy will follow up on your unsure answer.":"Not needed, based on your answers.";
    document.getElementById("nNext").textContent=R.expert==="triggered"?"An expert reviewer will follow up on the points above.":"No expert review needed. Keep this notice with the use case's records.";
  }
  // Swap test: the same answers through a different tool, or through different rules
  const SW={tool:"a",rules:"a"}; let swKey=null;
  function renderSwap(announce){
    if(!ANS) return;
    const base=evaluate(ANS,"a"), now=evaluate(ANS,SW.rules), bt=levelText(base), nt=levelText(now);
    document.querySelectorAll("[data-swap]").forEach(b=>b.setAttribute("aria-pressed",String(SW[b.dataset.swap]===b.dataset.v)));
    document.querySelectorAll("[data-swmarks]").forEach(el=>{
      el.textContent="";
      qs.forEach(([k,label])=>{const m=document.createElement("span");m.className="mk "+ANS[k];m.textContent=ANS[k]==="yes"?"Y":ANS[k]==="no"?"N":"?";m.title=label+" "+ANS[k];el.appendChild(m);});
      el.setAttribute("aria-label","Your answers: "+qs.map(([k,,short])=>short+", "+ANS[k]).join("; "));
    });
    const swapped=SW.tool==="b"||SW.rules==="b";
    document.querySelectorAll("[data-swapout]").forEach(el=>{
      el.textContent="";
      if(nt!==bt){const o=document.createElement("s");o.textContent=bt;const n=document.createElement("span");n.className="chg";n.textContent=nt;el.appendChild(o);el.appendChild(document.createTextNode(" → "));el.appendChild(n);}
      else{el.appendChild(document.createTextNode(nt));if(swapped){el.appendChild(document.createTextNode(" "));const ok=document.createElement("span");ok.className="ok";ok.textContent="unchanged ✓";el.appendChild(ok);}}
    });
    const note=SW.rules==="a"?(SW.tool==="a"?"The current setup. Swap the tool, then the rules.":"Different tool, same result. The tool only moves the answers around. (This illustration shows the argument; it doesn't test it.)"):
               (nt===bt?"Different rules. For these answers the result happens to match, but other answers would differ.":"Different rules, different result. The rules are the service.");
    document.querySelectorAll("[data-swapnote]").forEach(el=>{el.textContent=note;el.classList.toggle("changed",SW.rules==="b"&&nt!==bt);});
    const key=SW.tool+SW.rules+nt;
    if(swKey!==null&&key!==swKey){document.querySelectorAll("[data-swapout]").forEach(mark);if(announce)document.getElementById("swStatus").textContent="Review path: "+(nt!==bt?bt+" → "+nt:nt+", unchanged")+". "+note;}
    swKey=key;
  }
  // Reassess: the same use case a year later gets a new reference and nothing links the two
  let REA=null;
  const CHANGES=[["public_facing","yes","Since then (invented): students use it directly."],["human_review","no","Since then (invented): nobody reviews its output first."],["personal_data","yes","Since then (invented): it uses personal information."],["student_decisions","yes","Since then (invented): it informs decisions about students."]];
  function renderReassess(){
    if(!ANS||!RES) return;
    document.querySelectorAll("[data-ra-ref]").forEach(e=>{e.textContent=REF;});
    document.querySelectorAll("[data-ra-sum]").forEach(e=>{e.textContent=levelText(RES.r)+" · privacy "+RES.privacy;});
    document.querySelectorAll(".reassess").forEach(b=>b.classList.toggle("done",!!REA));
    let msg="Your notice's reference names a submission, not the use case. See what the record makes of the same use case a year later.";
    if(REA){
      // The illustrative change: prefer one that moves the risk, since that's when the missing link matters most
      const opts=CHANGES.filter(([k,v])=>ANS[k]!==v);
      const ch=opts.find(([k,v])=>levelWords(results(Object.assign({},ANS,{[k]:v})).r)!==levelWords(RES.r))||opts[0]||CHANGES[0];
      const RB=results(Object.assign({},ANS,{[ch[0]]:ch[1]}));
      document.querySelectorAll("[data-rb-ref]").forEach(e=>{e.textContent=REA;});
      document.querySelectorAll("[data-rb-sum]").forEach(e=>{e.textContent=levelText(RB.r)+" · privacy "+RB.privacy;});
      document.querySelectorAll("[data-rb-change]").forEach(e=>{e.textContent=ch[2];});
      const a1=levelWords(RES.r), b1=levelWords(RB.r);
      msg="To you, it's the same use case. To the record, "+REF+" and "+REA+" are two unrelated submissions. "+
          (a1!==b1?"Its path moved from "+a1+" to "+b1+", and nothing here can connect the two.":"Its path stayed "+a1+", and nothing here can connect the two either.");
    }
    document.querySelectorAll("[data-rmsg]").forEach(e=>{e.textContent=msg;});
    return msg;
  }
  document.addEventListener("click",e=>{
    const b=e.target.closest("[data-swap]");
    if(b){SW[b.dataset.swap]=b.dataset.v;renderSwap(true);return;}
    const r=e.target.closest("[data-reassess]");
    if(r){
      let n;do{n="REF-"+String(1000+Math.floor(Math.random()*9000));}while(n[4]===REF[4]);
      REA=n;const msg=renderReassess();const box=r.closest(".reassess");
      document.getElementById("btwStatus").textContent=msg;
      if(box){stagger([box.querySelector(".rb-full"),box.querySelector("[data-rmsg]")]);const x=box.querySelector("[data-reassess-reset]");if(x)x.focus();}
      return;
    }
    const z=e.target.closest("[data-reassess-reset]");
    if(z){REA=null;renderReassess();document.getElementById("btwStatus").textContent="Reassessment cleared.";const box=z.closest(".reassess");if(box){const y=box.querySelector("[data-reassess]");if(y)y.focus();}}
  });
  document.addEventListener("pudding:layout",()=>{renderSwap();renderReassess();});
  Pudding.onStep("intake",(n,root)=>{root.querySelectorAll(".nghost a").forEach(a=>{a.tabIndex=n===3?0:-1;});});
  Pudding.onStep("between",(n,root)=>{const g=root.querySelector("svg.gapline");if(g)g.setAttribute("class","gapline g"+(n+1));});
  form.addEventListener("change",run); run();
})();
