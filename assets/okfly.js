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
