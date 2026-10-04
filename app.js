
const defaults={happy:82,energy:76,ready:48,look:"classic",food:"Makarna",foodIcon:"🍝"};
let state={...defaults,...JSON.parse(localStorage.getItem("betonchi-simple")||"{}")};

const $=id=>document.getElementById(id);
const clamp=n=>Math.max(0,Math.min(100,n));
function save(){localStorage.setItem("betonchi-simple",JSON.stringify(state))}
function render(){
  $("happyText").textContent=state.happy+"%"; $("energyText").textContent=state.energy+"%"; $("readyText").textContent=state.ready+"%";
  $("happyBar").style.width=state.happy+"%"; $("energyBar").style.width=state.energy+"%"; $("readyBar").style.width=state.ready+"%";
  $("concertReady").textContent=state.ready+"%"; $("concertBar").style.width=state.ready+"%";
  $("statusPill").textContent=state.energy<30?"YORGUN":state.happy>75?"MUTLU":"SAKİN";
  applyLook(state.look); save();
}
function go(id){
  document.querySelectorAll(".screen").forEach(x=>x.classList.remove("active"));
  $(id).classList.add("active");
  document.querySelectorAll(".tabbar button").forEach(x=>x.classList.toggle("active",x.dataset.nav===id));
  window.scrollTo({top:0,behavior:"instant"});
}
document.querySelectorAll("[data-nav]").forEach(b=>b.addEventListener("click",()=>go(b.dataset.nav)));

document.querySelectorAll("[data-food]").forEach(b=>b.addEventListener("click",()=>{
  document.querySelectorAll("[data-food]").forEach(x=>x.classList.remove("selected"));
  b.classList.add("selected"); state.food=b.dataset.food; state.foodIcon=b.dataset.icon;
  $("foodProp").textContent=state.foodIcon; $("foodSpeech").textContent=state.food+" mı? Olur.";
}));
$("feedButton").addEventListener("click",()=>{
  state.energy=clamp(state.energy+14); state.happy=clamp(state.happy+7);
  $("foodSpeech").textContent=state.food+" yedim. Çok iyi geldi ♡"; $("speech").textContent=state.food+" iyi geldi!";
  render();
});
$("rehearse").addEventListener("click",()=>{
  state.ready=clamp(state.ready+17); state.energy=clamp(state.energy-10); state.happy=clamp(state.happy+4);
  $("speech").textContent="Prova tamam. Bir tur daha? 🎸"; render();
});
$("sleep").addEventListener("click",()=>{
  state.energy=clamp(state.energy+20); $("speech").textContent="Biraz dinlendim. Şimdi daha iyiyim ☾"; render();
});

const looks={
 classic:{name:"Classic Beton",top:"BLACK TEE",bottom:"WIDE PANTS",topColor:"#1C1B1F",bottomColor:"#7C7880"},
 stage:{name:"Stage Beton",top:"BURGUNDY",bottom:"BLACK DENIM",topColor:"#762B48",bottomColor:"#242228"},
 leather:{name:"Leather Beton",top:"LEATHER",bottom:"DARK PANTS",topColor:"#3D393E",bottomColor:"#555057"}
};
function applyLook(key){
  const l=looks[key]||looks.classic;
  $("torso").textContent=l.top; $("legs").textContent=l.bottom; $("torso").style.background=l.topColor; $("legs").style.background=l.bottomColor; $("lookName").textContent=l.name;
  document.querySelectorAll(".look").forEach(x=>x.classList.toggle("selected",x.dataset.look===key));
}
document.querySelectorAll(".look").forEach(b=>b.addEventListener("click",()=>{
  state.look=b.dataset.look; state.happy=clamp(state.happy+2); applyLook(state.look); $("speech").textContent="Bu kombin oldu ✦"; save();
}));

$("concertButton").addEventListener("click",()=>{
  if(state.ready<70){$("concertSpeech").textContent="Hazırlık "+state.ready+"%. Biraz daha prova lazım."; return;}
  $("concertSpeech").textContent="SAHNEDEYİM! ✦"; state.happy=clamp(state.happy+15); state.energy=clamp(state.energy-20); render();
});
const messages=["Bugün sizinle takılmak iyi geldi ♡","Kostümümü seçtin mi?","Biraz prova yapıp sonra yemek yiyelim.","Dünkü konseri hâlâ düşünüyorum.","Bugün enerjim yerinde ✦"];
let msgIndex=0;
$("newMessage").addEventListener("click",()=>{msgIndex=(msgIndex+1)%messages.length;$("messageText").textContent=messages[msgIndex]});
render();
