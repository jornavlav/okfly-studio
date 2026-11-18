/* OKfly Studio · JS compartido (vanilla) */
(function(){
  var KEY='okfly-lang', WA='525528879621';
  var html=document.documentElement;
  function pick(){ try{ var s=localStorage.getItem(KEY); if(s) return s; }catch(e){} return (navigator.language||'es').slice(0,2)==='en'?'en':'es'; }
  function waLinks(l){
    document.querySelectorAll('.js-wa').forEach(function(a){
      var m=a.getAttribute('data-msg-'+l)||a.getAttribute('data-msg-es')||'';
      a.href='https://wa.me/'+WA+(m?'?text='+encodeURIComponent(m):'');
    });
  }
  function setLang(l){
    html.lang=l;
    document.querySelectorAll('[data-es]').forEach(function(el){ var v=el.getAttribute('data-'+l); if(v!=null) el.textContent=v; });
    document.querySelectorAll('.lang button').forEach(function(b){ b.setAttribute('aria-pressed', b.dataset.lang===l?'true':'false'); });
    waLinks(l);
    document.querySelectorAll('[data-href-es]').forEach(function(a){ var v=a.getAttribute('data-href-'+l); if(v) a.href=v; });
    html.setAttribute('data-l',l);
    var ev; try{ ev=new CustomEvent('okfly:lang',{detail:l}); document.dispatchEvent(ev); }catch(e){}
  }
  document.querySelectorAll('.lang button').forEach(function(b){
    b.addEventListener('click',function(){ setLang(b.dataset.lang); try{ localStorage.setItem(KEY,b.dataset.lang); }catch(e){} });
  });
  setLang(pick());

  /* reveal */
  var rv=[].slice.call(document.querySelectorAll('.rv'));
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } }); },{rootMargin:'0px 0px -8% 0px',threshold:.05});
    rv.forEach(function(el){ io.observe(el); });
  } else { rv.forEach(function(el){ el.classList.add('in'); }); }

  /* giros */
  var nb=[].slice.call(document.querySelectorAll('.nb'));
  nb.forEach(function(b,i){
    b.addEventListener('click',function(){
      nb.forEach(function(x){ x.setAttribute('aria-pressed','false'); });
      b.setAttribute('aria-pressed','true');
      document.querySelectorAll('.np').forEach(function(p,j){ p.hidden = (i!==j); });
    });
  });

  /* mensual / anual */
  var tg=document.querySelectorAll('[data-billing]');
  tg.forEach(function(b){
    b.addEventListener('click',function(){
      var v=b.getAttribute('data-billing');
      document.querySelectorAll('[data-bill]').forEach(function(el){ el.setAttribute('data-bill',v); });
      tg.forEach(function(x){ x.setAttribute('aria-pressed', x.getAttribute('data-billing')===v?'true':'false'); });
    });
  });

  /* recomendador (servicios) */
  var quiz=document.getElementById('quiz');
  if(quiz){
    var ans={};
    var REC={
      sistema:{es:['Sistema completo','$6,990 MXN/mes','Necesitas todo: una página que dé confianza, redes activas y anuncios que traigan mensajes ya.'],en:['Complete System','$1,490 USD/mo','You need it all: a website that builds trust, active social media and ads that bring messages now.']},
      web:{es:['Página web Pro','$899 MXN/mes','Empieza por la base: tu página profesional. Primero la ves gratis y después decides.'],en:['Pro Website','$179 USD/mo','Start with the foundation: your professional website. You see it free first, then decide.']},
      anuncios:{es:['Anuncios','$3,990 MXN/mes + presupuesto','Ya tienes página y redes activas: lo que falta es llevar más gente a tu WhatsApp.'],en:['Ads','$790 USD/mo + ad budget','You already have a website and active socials: what is missing is sending more people to your WhatsApp.']},
      pro:{es:['Redes Pro','$5,990 MXN/mes','Ya publicas; ahora toca crecer en Facebook e Instagram con reels y un plan constante.'],en:['Social Pro','$1,290 USD/mo','You already post; now grow on Facebook and Instagram with reels and a steady plan.']},
      esencial:{es:['Redes Esencial','$3,490 MXN/mes','Tienes página pero tus redes están quietas. Empieza con presencia constante sin publicar tú.'],en:['Social Essential','$790 USD/mo','You have a website but your socials are quiet. Start with steady presence without posting yourself.']}
    };
    var wait={es:['Contesta las 3 preguntas','Te mostramos el paquete que mejor se ajusta a tu negocio.'],en:['Answer the 3 questions','We show you the package that fits your business best.']};
    function calc(){
      if(!(ans.web&&ans.post&&ans.now)) return null;
      if(ans.web==='no') return ans.now==='ya'?'sistema':'web';
      if(ans.post==='no') return 'esencial';
      return ans.now==='ya'?'anuncios':'pro';
    }
    function paint(){
      var l=html.lang==='en'?'en':'es', k=calc();
      var t=document.getElementById('recT'), p=document.getElementById('recP'), pr=document.getElementById('recPrice'), cta=document.getElementById('recCta');
      if(!k){ t.textContent=wait[l][0]; p.textContent=wait[l][1]; pr.textContent=''; cta.style.display='none'; return; }
      var r=REC[k][l]; t.textContent=r[0]; pr.textContent=r[1]; p.textContent=r[2]; cta.style.display='';
      var msg=(l==='en'?'Hi, the recommender suggested: ':'Hola, el recomendador me sugirió: ')+r[0];
      cta.href='https://wa.me/'+WA+'?text='+encodeURIComponent(msg);
    }
    quiz.querySelectorAll('.opts button').forEach(function(b){
      b.addEventListener('click',function(){
        var g=b.parentNode; g.querySelectorAll('button').forEach(function(x){ x.setAttribute('aria-pressed','false'); });
        b.setAttribute('aria-pressed','true'); ans[g.getAttribute('data-q')]=b.getAttribute('data-v'); paint();
      });
    });
    document.addEventListener('okfly:lang',paint); paint();
  }
})();
(function(){var v=document.querySelectorAll('video[data-auto]');if(!v.length)return;
v.forEach(function(x){x.muted=true;x.defaultMuted=true;});
if(!('IntersectionObserver' in window)){v.forEach(function(x){x.play&&x.play().catch(function(){});});return;}
var io=new IntersectionObserver(function(es){es.forEach(function(e){var x=e.target;if(e.isIntersecting){var p=x.play();if(p&&p.catch)p.catch(function(){});}else{x.pause();}});},{threshold:.25});
v.forEach(function(x){io.observe(x);});})();

(function(){var t=document.getElementById('tcols');if(!t||!window.matchMedia)return;var mq=window.matchMedia('(max-width:760px)');var idle=false,i=0,tm;
function go(){if(!mq.matches||idle)return;var c=t.children;if(!c.length)return;i=(i+1)%c.length;t.scrollTo({left:c[i].offsetLeft-(t.clientWidth-c[i].clientWidth)/2,behavior:'smooth'});}
function arm(){clearInterval(tm);tm=setInterval(go,4200);}
['touchstart','pointerdown'].forEach(function(e){t.addEventListener(e,function(){idle=true;clearInterval(tm);},{passive:true});});
['touchend','pointerup'].forEach(function(e){t.addEventListener(e,function(){setTimeout(function(){idle=false;var w=t.clientWidth,c=t.children;for(var k=0;k<c.length;k++){if(c[k].offsetLeft+c[k].clientWidth/2>t.scrollLeft+w/2){i=k;break;}}arm();},1500);},{passive:true});});
arm();})();

(function(){if(!document.querySelector('[data-roky]'))return;
if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion:reduce)').matches)return;
var im=document.createElement('img');im.src='assets/img/roky.webp';im.alt='';im.setAttribute('aria-hidden','true');im.className='roky';im.width=320;im.height=203;document.body.appendChild(im);
var x=.92,y=.52,fx=-1,tx=.92,ty=.52,last=0,raf=0;
function target(){var dh=document.documentElement.scrollHeight-window.innerHeight;var p=dh>0?window.scrollY/dh:0;
tx=.5+.42*Math.cos(p*Math.PI*7);ty=.52+.1*Math.sin(p*Math.PI*19);}
function tick(t){target();var dx=tx-x;x+=dx*.06;y+=(ty-y)*.06;
if(Math.abs(dx)>.0008)fx=dx>0?1:-1;
var w=im.offsetWidth,vw=window.innerWidth,vh=window.innerHeight;
var bob=Math.sin(t/420)*5;
im.style.transform='translate3d('+(x*(vw-w))+'px,'+(y*(vh-w*.63)+bob)+'px,0) scaleX('+fx+')';
raf=requestAnimationFrame(tick);}
document.addEventListener('visibilitychange',function(){if(document.hidden){cancelAnimationFrame(raf);}else{raf=requestAnimationFrame(tick);}});
im.onload=function(){im.classList.add('on');};raf=requestAnimationFrame(tick);})();
;(function(){var t=document.querySelector('.tlw[data-fly]');if(!t)return;
if(window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches)return;
if(!('IntersectionObserver' in window))return;
t.classList.add('seq');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){t.classList.add('go');io.disconnect()}})},{threshold:.35});io.observe(t)})();
;(function(){var v=document.querySelector('.xroky');if(!v)return;
var ua=navigator.userAgent,saf=/safari/i.test(ua)&&!/chrome|chromium|android|crios|fxios/i.test(ua);
var ok=!saf&&v.canPlayType&&v.canPlayType('video/webm; codecs="vp9"');
if(!ok){var i=new Image();i.className='xroky';i.alt='';i.src=v.getAttribute('poster');v.parentNode.replaceChild(i,v)}
else{var p=v.play&&v.play();if(p&&p.catch)p.catch(function(){})}})();

/* ===== Motion layer ===== */
(function(){
  var rm=window.matchMedia&&matchMedia('(prefers-reduced-motion:reduce)').matches;
  var fine=window.matchMedia&&matchMedia('(hover:hover) and (pointer:fine)').matches;
  /* barra de progreso + nav con material */
  var bar=document.createElement('div'); bar.className='sprog'; document.body.appendChild(bar);
  var nw=document.querySelector('.navwrap'), tk=false;
  function onS(){ tk=false; var h=document.documentElement; var m=h.scrollHeight-innerHeight; bar.style.transform='scaleX('+(m>0?Math.min(1,scrollY/m):0)+')'; if(nw) nw.classList.toggle('sc',scrollY>12); par(); }
  addEventListener('scroll',function(){ if(!tk){ tk=true; requestAnimationFrame(onS); } },{passive:true});
  /* reveal escalonado: retrasos por hermano */
  document.querySelectorAll('.rv').forEach(function(el){
    var p=el.parentElement; if(!p) return;
    var sib=[].filter.call(p.children,function(c){ return c.classList.contains('rv'); });
    var i=sib.indexOf(el); if(i>0) el.style.setProperty('--d',Math.min(i,5)*70+'ms');
  });
  /* imágenes con revelado (solo con JS; sin JS se ven normales) */
  document.querySelectorAll('.rv > img, .rv > picture img, .rv .shot img, .rv .tcard img').forEach(function(im){ if(!im.closest('.phone')) im.classList.add('mi'); });
  /* aurora en el hero */
  var hero=document.querySelector('.hero, .ah');
  if(hero&&!hero.querySelector('.aur')){ var a=document.createElement('div'); a.className='aur'; a.setAttribute('aria-hidden','true'); a.innerHTML='<i></i><i></i><i></i>'; hero.insertBefore(a,hero.firstChild); }
  /* flotar chips y resplandor tras mockups */
  document.querySelectorAll('.rkchip, .chipf, .tag').forEach(function(el,i){ if(!rm) el.classList.add('floaty', i%2?'b':'a'); });
  document.querySelectorAll('.rkstage, .ladder + *, .shotwrap').forEach(function(el){ el.classList.add('glow'); });
  /* parallax suave en elementos [data-par] y hero */
  var pars=[].slice.call(document.querySelectorAll('.ladder'));
  function par(){ if(rm||!fine) return; pars.forEach(function(el){ var r=el.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) return; var k=(r.top+r.height/2-innerHeight/2)/innerHeight; el.style.transform='translate3d(0,'+(k*-18).toFixed(1)+'px,0)'; }); }
  /* inclinación 3D con inercia en tarjetas de plan y mockups */
  if(fine&&!rm){
    document.querySelectorAll('.card.plan, .rkstage, .tcard').forEach(function(el){
      el.setAttribute('data-tilt','');
      var rx=0,ry=0,tx=0,ty=0,raf=0;
      function step(){ rx+=(tx-rx)*.12; ry+=(ty-ry)*.12; el.style.transform='perspective(900px) rotateX('+rx.toFixed(2)+'deg) rotateY('+ry.toFixed(2)+'deg)'; if(Math.abs(tx-rx)>.01||Math.abs(ty-ry)>.01) raf=requestAnimationFrame(step); else raf=0; }
      el.addEventListener('pointermove',function(e){ var r=el.getBoundingClientRect(); ry=ry; tx=-((e.clientY-r.top)/r.height-.5)*6; ty=((e.clientX-r.left)/r.width-.5)*8; if(!raf) raf=requestAnimationFrame(step); });
      el.addEventListener('pointerleave',function(){ tx=0; ty=0; if(!raf) raf=requestAnimationFrame(step); });
    });
  }
  onS();
})();
