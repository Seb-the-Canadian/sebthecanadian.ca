/* front-door.js — the figures of the "One front door" case study (src/projects/front-door/).
   Builds the find-it test in the hero, the current-state sketch and the crossmap. Without
   JavaScript the page shows static copies of these (.nojs-q), hidden once html.story-js is set.
   Loaded with `defer` just BEFORE /assets/js/case-study.js (also deferred; defer keeps their
   order): the drawings must exist before case-study.js copies the figures for phones, and
   case-study.js starts on a timer once it runs, so a figure script loaded after it can lose
   that race. Step hooks go straight into Pudding.hooks, which case-study.js keeps. */
(function(){
  "use strict";
  const P=window.Pudding=window.Pudding||{}; P.hooks=P.hooks||{};
  const onStep=(id,fn)=>{(P.hooks[id]=P.hooks[id]||[]).push(fn);};
  // One invented skeleton of the two old sites. It drives the find-it test, the current-state sketch and the crossmap.
  const CATS=["Where do I start?","What are the rules?","Is my use safe?","How do I learn it?","Where's the data?","Who can help?"];
  const OLD=[
    {site:"Data office site",desc:"a page for each team",sections:[
      {label:"About the data office",to:[0,5],kids:[{label:"Our teams"},{label:"Contact us"}]},
      {label:"Policies",to:[1,2],kids:[{label:"Handling rider data",piece:"data"},{label:"Retention schedule"},{label:"Sharing data outside"}]},
      {label:"Training",to:[3],kids:[{label:"Courses"},{label:"Glossary"}]},
      {label:"Data catalogue",to:[4],kids:[{label:"Search the catalogue"},{label:"Request access"}]},
      {label:"Newsletter",to:[0]}
    ]},
    {site:"AI group site",desc:"a tools list and an FAQ",sections:[
      {label:"Start here",to:[0,3],kids:[{label:"What is AI?"},{label:"First steps"}]},
      {label:"Approved tools",to:[1],kids:[{label:"Tool list"},{label:"Request a tool"}]},
      {label:"Use-case gallery",to:[2,3],kids:[{label:"Examples"},{label:"Submit an example"}]},
      {label:"FAQ",to:[1,2,5],kids:[{label:"Can I use AI with rider data?",piece:"ai"},{label:"Which tools are approved?"},{label:"Who reviews AI use?"}]},
      {label:"Contact the group",to:[5]}
    ]}
  ];
  const PAIR_LEAF="Rider data · data and AI";
  const TREE={
    before:{label:"Start",kids:OLD.map(x=>({label:x.site,kids:x.sections}))},
    after:{label:"Home",kids:[
      {label:"Where do I start?",kids:[{label:"New here? Start with this"},{label:"What's changed lately"}]},
      {label:"What are the rules?",kids:[{label:PAIR_LEAF,piece:"both"},{label:"Keeping data"},{label:"Sharing data outside"}]},
      {label:"How do I learn it?",kids:[{label:"Data skills"},{label:"AI skills"},{label:"Learning paths"}]},
      {label:"Who can help?",kids:[{label:"Data office"},{label:"AI group"},{label:"Ask a question"}]}
    ]}
  };
  const SHORTEST={before:7,after:2};

  // ---------- Find-it tree test ----------
  const tt=document.getElementById("tt");
  const crumbs=tt.querySelector(".ttcrumbs"), list=tt.querySelector(".ttlist"), page=tt.querySelector(".ttpage");
  const msgEl=tt.querySelector(".ttmsg"), clk=tt.querySelector(".ttclicks"), resetBtn=tt.querySelector(".ttreset");
  const sr=tt.querySelector("[data-ttsr]"), cmp=tt.querySelector(".ttcompare");
  const fresh=()=>({path:[],clicks:0,back:0,got:new Set(),tried:new Set(),found:{},done:false,opened:false,msg:"",order:[]});
  const ST={before:fresh(),after:fresh()};
  let mode="before";
  const S=()=>ST[mode];
  const say=t=>{sr.textContent="";setTimeout(()=>{sr.textContent=t;},30);};
  function node(){let n=TREE[mode];S().path.forEach(i=>{n=n.kids[i];});return n;}
  function trailTo(label){let n=TREE[mode];const out=[];S().path.forEach(i=>{n=n.kids[i];out.push(n.label);});out.push(label);return out;}

  function render(focus){
    const st=S();
    tt.querySelectorAll("[data-mode]").forEach(b=>{
      b.setAttribute("aria-pressed",String(b.dataset.mode===mode));
      let ok=b.querySelector(".ok");
      if(ST[b.dataset.mode].done&&!ok){ok=document.createElement("span");ok.className="ok";ok.innerHTML='<span aria-hidden="true">✓</span><span class="sr"> done</span>';b.appendChild(ok);}
      if(!ST[b.dataset.mode].done&&ok) ok.remove();
    });
    // breadcrumbs
    crumbs.textContent="";
    let n=TREE[mode];
    const trail=[n].concat(st.path.map(i=>(n=n.kids[i])));
    if(st.opened) trail.push({label:PAIR_LEAF});
    trail.forEach((t,i)=>{
      if(i) crumbs.appendChild(document.createTextNode(" › "));
      if(i<trail.length-1&&!st.done){const b=document.createElement("button");b.type="button";b.textContent=t.label;b.dataset.up=i;crumbs.appendChild(b);}
      else {const b=document.createElement("b");b.textContent=t.label;crumbs.appendChild(b);}
    });
    // menu or opened page
    list.textContent="";
    list.hidden=st.opened; page.hidden=!st.opened;
    if(!st.opened){
      node().kids.forEach((k,i)=>{
        const li=document.createElement("li"), b=document.createElement("button");
        b.type="button";b.dataset.i=i;
        const key=st.path.concat(i).join(".");
        const isFound=k.piece&&(k.piece==="both"?st.got.size===2:st.got.has(k.piece));
        if(isFound) b.classList.add("found");
        else if(!k.kids&&st.tried.has(key)) b.classList.add("nope");
        if(st.done) b.setAttribute("aria-disabled","true");
        const l=document.createElement("span");l.textContent=k.label;b.appendChild(l);
        if(k.kids){const g=document.createElement("span");g.className="go";g.setAttribute("aria-hidden","true");g.textContent="›";b.appendChild(g);}
        else if(isFound){const g=document.createElement("span");g.className="x";g.textContent="✓ found";b.appendChild(g);}
        else if(st.tried.has(key)){const g=document.createElement("span");g.className="x";g.textContent="✕ not here";b.appendChild(g);}
        li.appendChild(b);list.appendChild(li);
      });
    }
    clk.textContent=st.clicks+(st.clicks===1?" click":" clicks");
    tt.querySelectorAll("[data-piece]").forEach(p=>p.classList.toggle("got",st.got.has(p.dataset.piece)));
    resetBtn.hidden=!(st.clicks>0);
    renderMsg();
    renderCompare();
    if(typeof focus==="number"){const f=list.querySelectorAll("button")[focus];if(f)f.focus({preventScroll:true});}
    else if(focus==="list"){const f=list.querySelector("button:not([aria-disabled='true'])");if(f)f.focus({preventScroll:true});}
    else if(focus==="msg"){const f=msgEl.querySelector("button")||msgEl;f.focus({preventScroll:true});}
  }

  function renderMsg(){
    const st=S();
    msgEl.textContent="";
    if(!st.done){msgEl.textContent=st.msg;return;}
    const p=document.createElement("p");
    if(mode==="before"){
      p.textContent="Found both, in "+st.clicks+" clicks across two sites.";
      msgEl.appendChild(p);
      const tr=document.createElement("div");tr.className="tttrail";tr.setAttribute("role","group");tr.setAttribute("aria-label","Your two routes");
      st.order.forEach((k,i)=>{
        if(i){const g=document.createElement("span");g.className="gap";g.textContent="no link between them in these menus";tr.appendChild(g);}
        const r=document.createElement("span");r.textContent=st.found[k].join(" › ");tr.appendChild(r);
      });
      msgEl.appendChild(tr);
      if(!ST.after.done){const b=document.createElement("button");b.type="button";b.className="ttnext";b.dataset.go="after";b.innerHTML='Try the front door <span aria-hidden="true">→</span>';msgEl.appendChild(b);}
    } else {
      p.textContent="Found both, in "+st.clicks+" clicks, in one place.";
      msgEl.appendChild(p);
      if(!ST.before.done){const b=document.createElement("button");b.type="button";b.className="ttnext";b.dataset.go="before";b.innerHTML='Now try the old sites <span aria-hidden="true">→</span>';msgEl.appendChild(b);}
    }
  }

  let shownCompare=false;
  function renderCompare(){
    const both=ST.before.done&&ST.after.done;
    cmp.hidden=!both;
    if(!both){shownCompare=false;return;}
    const mx=Math.max(ST.before.clicks,ST.after.clicks,SHORTEST.before);
    ["before","after"].forEach((m,i)=>{
      const bar=cmp.querySelector(".bar."+m), w=(100*ST[m].clicks/mx)+"%";
      cmp.querySelector('[data-tick="'+m+'"]').style.left=(100*SHORTEST[m]/mx)+"%";
      cmp.querySelector('[data-n="'+m+'"]').textContent=ST[m].clicks+(ST[m].clicks===1?" click":" clicks");
      if(!shownCompare){bar.style.width="0";void bar.offsetWidth;setTimeout(()=>{bar.style.width=w;},P.reduce?0:60+i*150);}
      else bar.style.width=w;
    });
    cmp.querySelector("[data-backtracks]").textContent="Backtracks: "+ST.before.back+" before, "+ST.after.back+" after. In these menus the split forces at least one.";
    shownCompare=true;
  }

  function complete(){
    const st=S();
    st.done=true;
    if(mode==="after") document.documentElement.classList.add("ff-found");
    render("msg");
    const both=ST.before.done&&ST.after.done;
    say((mode==="before"?"Found both, in "+st.clicks+" clicks across two sites. These menus had no link between the two routes.":"Found both, in "+st.clicks+" clicks, in one place: data and AI side by side.")+(both?" Before: "+ST.before.clicks+" clicks. After: "+ST.after.clicks+".":""));
  }

  function announceMenu(){
    if(S().opened) return;
    const n=node(), k=n.kids.length;
    say(n.label+": "+k+(k===1?" option.":" options."));
  }

  tt.addEventListener("click",e=>{
    const mb=e.target.closest("[data-mode]");
    if(mb){ if(mb.dataset.mode!==mode){mode=mb.dataset.mode;render(S().done?"msg":"list");if(S().done){const m=tt.querySelector(".ttmsg");say(m?m.textContent.trim():"Already found both.");}else announceMenu();} return; }
    const nx=e.target.closest(".ttnext");
    if(nx){ mode=nx.dataset.go; render("list"); announceMenu(); return; }
    if(e.target.closest(".ttreset")){
      ST[mode]=fresh();
      if(mode==="after") document.documentElement.classList.remove("ff-found");
      render("list"); say("Started again. "+TREE[mode].label+": "+TREE[mode].kids.length+" options."); return;
    }
    const st=S(); if(st.done) return;
    const up=e.target.closest("[data-up]");
    if(up){ st.clicks++; st.back++; st.path=st.path.slice(0,+up.dataset.up); st.msg=""; render("list"); announceMenu(); return; }
    const b=e.target.closest(".ttlist button"); if(!b||b.getAttribute("aria-disabled")==="true") return;
    const i=+b.dataset.i, k=node().kids[i], tkey=st.path.concat(i).join(".");
    if(!k.kids&&st.tried.has(tkey)){ st.msg=k.piece?"You already have that part.":"✕ Not here. You tried this one already."; render(i); say(st.msg); return; }
    st.clicks++;
    if(k.kids){ st.path.push(i); st.msg=""; render("list"); announceMenu(); return; }
    st.tried.add(st.path.concat(i).join("."));
    if(k.piece){
      const pieces=k.piece==="both"?["data","ai"]:[k.piece];
      let isNew=false;
      pieces.forEach(p=>{ if(!st.got.has(p)){ st.got.add(p); st.found[p]=trailTo(k.label); st.order.push(p); isNew=true; } });
      if(st.got.size===2){ if(k.piece==="both") st.opened=true; complete(); return; }
      st.msg=isNew?("That's the "+(k.piece==="data"?"data":"AI")+" part. The other part is somewhere else."):"You already have that part.";
    } else st.msg="✕ Not here.";
    render(i); say(st.msg);
    const row=list.querySelectorAll("button")[i]; if(row&&P.changed) P.changed(row);
  });
  render();

  // ---------- Current-state sketch: the same sections, mapped at step 1 ----------
  const sketch=document.querySelector(".sec > .oldsites"); // the live one; the static copy inside .nojs-q is for no-JS readers
  OLD.forEach(site=>{
    const card=document.createElement("div");card.className="site";
    const h=document.createElement("p");h.className="sname";h.textContent=site.site;card.appendChild(h);
    const ul=document.createElement("ul");ul.className="srows";
    site.sections.forEach((sec,i)=>{
      const li=document.createElement("li");
      const t=document.createElement("span");t.textContent=sec.label;li.appendChild(t);
      const mk=document.createElement("span");mk.className="mk";
      if((sec.kids||[]).some(k=>k.piece)){const h2=document.createElement("span");h2.className="half";h2.textContent="half";const hs=document.createElement("span");hs.className="sr";hs.textContent=" the answer";h2.appendChild(hs);mk.appendChild(h2);}
      const ck=document.createElement("span");ck.className="ck";ck.textContent="✓";ck.setAttribute("aria-hidden","true");ck.style.setProperty("--i",i);mk.appendChild(ck);
      li.appendChild(mk);ul.appendChild(li);
    });
    card.appendChild(ul);
    const d=document.createElement("p");d.className="sdesc";d.textContent=site.desc;card.appendChild(d);
    sketch.appendChild(card);
  });

  // ---------- Crossmap: the same invented sections -> the shared question categories ----------
  const ns="http://www.w3.org/2000/svg", svg=document.querySelector("svg.cm");
  const el=(t,a,txt,parent)=>{const e=document.createElementNS(ns,t);for(const k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;(parent||svg).appendChild(e);return e;};
  const W=138,H=22,LX=0,RX=222;
  const SRC=[]; OLD.forEach(site=>site.sections.forEach(sec=>SRC.push({label:sec.label,site:site.site,to:sec.to})));
  const into=CATS.map(()=>[]), sitesInto=CATS.map(()=>new Set());
  SRC.forEach(r=>r.to.forEach(t=>{into[t].push(r.label);sitesInto[t].add(r.site);}));
  const ty=i=>14+i*44;
  const lines=el("g",{});
  let y=0, si=0; const srcY=[];
  OLD.forEach(site=>{
    el("text",{x:LX,y:y+12,class:"grp"},site.site.toUpperCase()); y+=18;
    site.sections.forEach(()=>{srcY[si++]=y; y+=28;});
  });
  SRC.forEach((r,i)=>{
    const sy=srcY[i]+H/2;
    r.to.forEach(t=>{
      const tyc=ty(t)+H/2;
      el("path",{d:`M${LX+W} ${sy} C${LX+W+46} ${sy} ${RX-46} ${tyc} ${RX} ${tyc}`,class:"ln"+(r.to.length>1?" split":"")+(sitesInto[t].size>1?" merge":""),"data-s":i,"data-t":t},null,lines);
    });
    const g=el("g",{class:"node src","data-s":i,tabindex:"0",role:"button","aria-pressed":"false","aria-label":r.label+", "+r.site.toLowerCase()+": maps to "+r.to.map(t=>CATS[t]).join(", ")});
    el("rect",{x:LX,y:srcY[i],width:W,height:H,rx:4},null,g);
    el("text",{x:LX+8,y:srcY[i]+15},r.label,g);
  });
  CATS.forEach((t,i)=>{
    const g=el("g",{class:"node tgt"+(into[i].length>1?" many":"")+(sitesInto[i].size>1?" cross":""),"data-t":i,tabindex:"0",role:"button","aria-pressed":"false","aria-label":t+": gathers "+into[i].join(", ")+(sitesInto[i].size>1?", from both sites":"")});
    el("rect",{x:RX,y:ty(i),width:W,height:H,rx:4},null,g);
    el("text",{x:RX+8,y:ty(i)+15},t,g);
  });
  const cml=document.querySelector(".cmlist");
  SRC.forEach(r=>{const li=document.createElement("li");li.textContent=r.site+", "+r.label+": maps to "+r.to.map(t=>CATS[t]).join(", ");cml.appendChild(li);});

  // Tracing: hover or focus shows a box's links; tap or Enter pins it.
  function keyOf(nd){return nd.dataset.s!=null?"s"+nd.dataset.s:"t"+nd.dataset.t;}
  function trace(sv,key){
    sv.classList.add("tracing");
    const kind=key[0], idx=key.slice(1);
    sv.querySelectorAll(".ln").forEach(l=>l.classList.toggle("hi",(kind==="s"?l.dataset.s:l.dataset.t)===idx));
    const hs=new Set(),ht=new Set();
    sv.querySelectorAll(".ln.hi").forEach(l=>{hs.add(l.dataset.s);ht.add(l.dataset.t);});
    sv.querySelectorAll(".node").forEach(nd=>nd.classList.toggle("hi",nd.dataset.s!=null?hs.has(nd.dataset.s):ht.has(nd.dataset.t)));
  }
  function untrace(sv){sv.classList.remove("tracing");sv.querySelectorAll(".hi").forEach(x=>x.classList.remove("hi"));}
  let LOCK=null; // one pin, shared by the sticky figure and every phone copy
  function settle(sv){ if(LOCK) trace(sv,LOCK); else untrace(sv); }
  function applyLock(){
    document.querySelectorAll("svg.cm").forEach(sv=>{
      if(LOCK) sv.dataset.lock=LOCK; else delete sv.dataset.lock;
      sv.querySelectorAll(".node").forEach(x=>x.setAttribute("aria-pressed",String(LOCK!==null&&keyOf(x)===LOCK)));
      settle(sv);
    });
  }
  document.addEventListener("pudding:layout",applyLock);
  const nodeFrom=t=>t&&t.closest?t.closest(".cm .node"):null;
  document.addEventListener("pointerover",e=>{const nd=nodeFrom(e.target);if(nd)trace(nd.ownerSVGElement,keyOf(nd));});
  document.addEventListener("pointerout",e=>{const nd=nodeFrom(e.target);if(!nd||nd.contains(e.relatedTarget))return;settle(nd.ownerSVGElement);});
  document.addEventListener("focusin",e=>{const nd=nodeFrom(e.target);if(nd)trace(nd.ownerSVGElement,keyOf(nd));});
  document.addEventListener("focusout",e=>{const nd=nodeFrom(e.target);if(nd)settle(nd.ownerSVGElement);});
  function pin(nd){
    const k=keyOf(nd);
    LOCK=(LOCK===k)?null:k;
    applyLock();
  }
  document.addEventListener("click",e=>{const nd=nodeFrom(e.target);if(nd)pin(nd);});
  document.addEventListener("keydown",e=>{const nd=nodeFrom(e.target);if(nd&&(e.key==="Enter"||e.key===" ")){e.preventDefault();pin(nd);}});

  function setStepClass(elm,n){ if(!elm) return; ["s0","s1","s2","s3"].forEach(c=>elm.classList.remove(c)); elm.classList.add("s"+n); }
  onStep("crosswalk",(n,root)=>{ setStepClass(root.querySelector("svg.cm"),n); setStepClass(root.querySelector(".sec > .oldsites"),n); });
})();
