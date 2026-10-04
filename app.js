const screen=document.getElementById('screen');
const phone=document.querySelector('.phone');
const main=document.getElementById('mainAction');
const back=document.getElementById('back');
let current='start';
const src=n=>`assets/${n}.jpg`;
function show(n){current=n;screen.src=src(n);phone.classList.toggle('home',n==='home');}
main.onclick=()=>{
 const next={start:'welcome',welcome:'home',home:'food',food:'home',costume:'home',concert:'home',diary:'home',game:'home',album:'home',message:'home',notifications:'home',settings:'home'};
 show(next[current]||'home');
};
back.onclick=()=>show(current==='start'?'start':'home');
document.querySelectorAll('nav button').forEach(b=>b.onclick=()=>show(b.dataset.screen));
let x0=null;
screen.addEventListener('touchstart',e=>x0=e.touches[0].clientX,{passive:true});
screen.addEventListener('touchend',e=>{
 if(current!=='costume'||x0===null)return;
 if(Math.abs(e.changedTouches[0].clientX-x0)>45) show('costume');
 x0=null;
},{passive:true});
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
