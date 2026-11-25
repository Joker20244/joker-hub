const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY=SITE.id;
const store={get(k,d){try{const v=localStorage.getItem('jk:'+KEY+':'+k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){localStorage.setItem('jk:'+KEY+':'+k,JSON.stringify(v))}};
const uid=()=>Math.random().toString(36).slice(2,9);
const today=()=>{const d=new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0')};
const toast=m=>{const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)};
let TH=Object.assign({mode:'dark',ac:SITE.ac||'#ff9f1c',fs:16,bgs:'grad'},JSON.parse(localStorage.getItem('jk:theme')||'{}'));
function applyTheme(){const m=TH.mode==='auto'?(matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'):TH.mode;const r=document.documentElement;r.dataset.mode=m;r.dataset.bgs=TH.bgs;r.style.setProperty('--ac',TH.ac);r.style.setProperty('--fs',TH.fs+'px');localStorage.setItem('jk:theme',JSON.stringify(TH));window.onTheme&&window.onTheme()}
function buildShell(){
 document.body.insertAdjacentHTML('afterbegin','<header class="top"><a class="home" href="./" title="الرئيسية">🏠</a><h1>'+SITE.icon+' '+SITE.title+'</h1><span class="mut">👑 جوكر</span></header>');
 document.body.insertAdjacentHTML('beforeend','<footer>فكرة وتنفيذ: الملك جوكر 👑 — العقل المدبر<br>بياناتك محفوظة على جهازك بس</footer><button class="fab" id="tb" aria-label="تخصيص">🎨</button><div class="card" id="tp"><h3>🎨 تحكم في الشكل</h3><label>الوضع</label><div class="row" id="tm"><button class="sm" data-v="dark">🌙 داكن</button><button class="sm" data-v="light">☀️ فاتح</button><button class="sm" data-v="auto">🔄 تلقائي</button></div><label>اللون الأساسي</label><div class="row" id="tc"></div><label>حجم الخط: <span id="fv"></span></label><input type="range" id="tf" min="13" max="22" style="width:100%"><label>الخلفية</label><div class="row" id="tg"><button class="sm" data-v="solid">سادة</button><button class="sm" data-v="grad">تدرج</button><button class="sm" data-v="dots">نقط</button></div><label>بياناتي</label><div class="row"><button class="sm" id="ex">⬇️ تصدير</button><button class="sm" id="im">⬆️ استيراد</button><button class="sm danger" id="rs">🗑️ مسح</button></div></div>');
 $('#tb').onclick=()=>$('#tp').classList.toggle('open');
 $('#tc').innerHTML=['#ff9f1c','#ff4d6d','#4cc9f0','#4ade80','#a78bfa','#f472b6','#facc15','#14b8a6'].map(c=>'<button class="sw" data-c="'+c+'" style="background:'+c+'"></button>').join('')+'<input type="color" id="tcc" value="'+TH.ac+'" style="width:34px;height:30px;padding:0">';
 $$('#tm button').forEach(b=>b.onclick=()=>{TH.mode=b.dataset.v;applyTheme()});
 $$('#tg button').forEach(b=>b.onclick=()=>{TH.bgs=b.dataset.v;applyTheme()});
 $$('#tc .sw').forEach(b=>b.onclick=()=>{TH.ac=b.dataset.c;$('#tcc').value=TH.ac;applyTheme()});
 $('#tcc').oninput=e=>{TH.ac=e.target.value;applyTheme()};
 $('#tf').value=TH.fs;$('#fv').textContent=TH.fs;$('#tf').oninput=e=>{TH.fs=+e.target.value;$('#fv').textContent=TH.fs;applyTheme()};
 $('#ex').onclick=()=>{const o={};Object.keys(localStorage).filter(k=>k.startsWith('jk:'+KEY+':')).forEach(k=>o[k]=localStorage[k]);const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(o)],{type:'application/json'}));a.download=KEY+'-backup.json';a.click()};
 $('#im').onclick=()=>{const i=document.createElement('input');i.type='file';i.onchange=()=>{const f=i.files[0];if(!f)return;f.text().then(t=>{try{const o=JSON.parse(t);Object.keys(o).forEach(k=>{if(k.startsWith('jk:'+KEY+':'))localStorage.setItem(k,o[k])});location.reload()}catch(e){toast('ملف غلط')}})};i.click()};
 $('#rs').onclick=()=>{if(confirm('تمسح كل بيانات الموقع ده؟')){Object.keys(localStorage).filter(k=>k.startsWith('jk:'+KEY+':')).forEach(k=>localStorage.removeItem(k));location.reload()}};
}
applyTheme();
document.addEventListener('DOMContentLoaded',()=>{buildShell();window.init&&init()});
