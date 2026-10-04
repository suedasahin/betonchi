let s=JSON.parse(localStorage.getItem('betonchi')||'{"happy":78,"energy":72,"ready":54,"look":0}');
const clamp=n=>Math.max(0,Math.min(100,n)); const save=()=>localStorage.setItem('betonchi',JSON.stringify(s));
function render(){['happy','energy','ready'].forEach(k=>{document.getElementById(k).textContent=s[k];document.getElementById(k+'bar').style.width=s[k]+'%'}); applyLook(s.look);save()}
function say(t){document.getElementById('bubble').textContent=t;document.getElementById('dynamicMsg').textContent=t}
document.querySelectorAll('[data-go]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));document.getElementById(b.dataset.go).classList.add('active')});
document.querySelectorAll('[data-food]').forEach(b=>b.onclick=()=>{s.energy=clamp(s.energy+ +b.dataset.e);s.happy=clamp(s.happy+7);say(b.dataset.food+' iyi geldi! ♡');render();document.querySelector('[data-go="home"]').click()});
document.querySelector('[data-action="rehearse"]').onclick=()=>{s.ready=clamp(s.ready+18);s.energy=clamp(s.energy-12);s.happy=clamp(s.happy+5);say('Prova tamam! Sahneye biraz daha hazırım 🎸');render()};
document.querySelector('[data-action="rest"]').onclick=()=>{s.energy=clamp(s.energy+24);s.happy=clamp(s.happy+4);say('Biraz uyuyayım... zZz 🌙');render()};
const looks=[['BLACK TEE','WIDE PANTS','#17151b','#807c86'],['STAGE TOP','BLACK DENIM','#5b224e','#19171d'],['LEATHER','DARK PANTS','#29242b','#49434d'],['SOFT KNIT','CREAM PANTS','#c4a4bd','#ddd1bd']];
function applyLook(i){let l=looks[i];shirt.textContent=l[0];pants.textContent=l[1];shirt.style.background=l[2];pants.style.background=l[3]}
document.querySelectorAll('[data-look]').forEach(b=>b.onclick=()=>{s.look=+b.dataset.look;s.happy=clamp(s.happy+3);applyLook(s.look);say('Bu kombin oldu ✨');save()});
perform.onclick=()=>{if(s.ready<70){concertText.textContent='Biraz daha prova lazım — hazırlık şu an %'+s.ready+'.';return}s.energy=clamp(s.energy-25);s.happy=clamp(s.happy+18);concertText.textContent='KONSER TAMAMLANDI! ★ Beton sahneyi yıktı.';say('O konser neydi öyle! ★');render()};
reset.onclick=()=>{s={happy:78,energy:72,ready:54,look:0};render();say('Bugün ne yapıyoruz? ♡')};render();