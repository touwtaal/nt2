(function(){"use strict";
const $=id=>document.getElementById(id),params=new URLSearchParams(location.search),topics=window.GRAMMAR_TOPICS;
let selected=topics.find(t=>t.id===params.get("onderwerp"))||topics[0];
let level=["basis","gemiddeld","uitdaging"].includes(params.get("niveau"))?params.get("niveau"):"basis";
let lang=params.get("taal")==="es"?"es":"en",index=0,correct=0,openDone=0,answered=false,shown=false;
const instruction={en:{lesson:"Choose a grammar topic.",choose:"Choose the correct answer.",fill:"Type the missing word or words.",open:"Write your own complete Dutch sentence using the words below. Compare it with the example. Other correct sentences are also possible.",sample:"Show an example",check:"Check answer",next:"Next",again:"Start again",model:"Example answer:",correct:"Correct!",wrong:"Not quite. A correct answer is:",closed:"Correct answers",openScore:"Open sentences practised",listen:"Listen",slow:"Listen slowly"},
es:{lesson:"Elige un tema de gramática.",choose:"Elige la respuesta correcta.",fill:"Escribe la palabra o las palabras que faltan.",open:"Escribe tu propia frase completa en neerlandés con las palabras de abajo. Compárala con el ejemplo. Puede haber otras respuestas correctas.",sample:"Ver un ejemplo",check:"Comprobar",next:"Siguiente",again:"Empezar de nuevo",model:"Respuesta de ejemplo:",correct:"¡Correcto!",wrong:"No exactamente. Una respuesta correcta es:",closed:"Respuestas correctas",openScore:"Frases abiertas practicadas",listen:"Escuchar",slow:"Escuchar despacio"}};
const norm=v=>String(v||"").trim().toLocaleLowerCase("nl").replace(/[.!?]+$/g,"").replace(/\s+/g," ");
function cleanText(s){return String(s||"").replace(/["“”]/g,"").replace(/\p{Extended_Pictographic}/gu,"").replace(/^\s*[^:]+:\s*/,"").trim()}
function say(s,slow){if(window.TouwTaalSpeech)window.TouwTaalSpeech.play(cleanText(s),{slow,statusElement:$("audio-status")});}
function sound(s,slow=false){const b=document.createElement("button");b.type="button";b.className="sound-button";b.textContent=slow?"▶ Langzaam":"🔊 Luister";b.setAttribute("aria-label",slow?"Langzaam luisteren":"Luister naar het Nederlands");b.onclick=()=>say(s,slow);return b}
function buildChoices(item){const arr=[item.answer,...item.wrong];const rotate=index%3;return arr.map((x,i)=>arr[(i+rotate)%3])}
function full(item){return item.q.replace("___",item.answer).replace(/^Bepaald lidwoord: /,"").replace(/^(Dichtbij|Ver weg): /,"")}
function updateLanguage(){const t=instruction[lang];$("rule").textContent=selected.rule[lang];$("instruction").textContent=t[level==="basis"?"choose":level==="gemiddeld"?"fill":"open"];$("language").value=lang;document.documentElement.lang="nl";makePrint()}
function selectTopic(id){selected=topics.find(t=>t.id===id)||topics[0];index=0;correct=0;openDone=0;answered=false;$("topic").value=selected.id;$("lesson-title").textContent=selected.title;$("sub-title").textContent=selected.sub;updateLanguage();render();}
function render(){answered=false;shown=false;const item=selected.items[index],t=instruction[lang];
$("progress").textContent="Vraag "+(index+1)+" van "+selected.items.length;
$("question").textContent=level==="uitdaging"?item.cue:item.q;
$("answers").replaceChildren();$("feedback").replaceChildren();$("next").disabled=true;
$("check").hidden=level==="basis";$("check").textContent=level==="uitdaging"?t.sample:t.check;
$("instruction").textContent=t[level==="basis"?"choose":level==="gemiddeld"?"fill":"open"];
$("audio-actions").replaceChildren(sound(full(item)),sound(full(item),true));$("audio-status").textContent="";
if(level==="basis"){const choices=buildChoices(item);choices.forEach((c,i)=>{const row=document.createElement("div");row.className="answer-row";const b=document.createElement("button");b.type="button";b.className="answer";b.textContent=c;b.addEventListener("click",()=>{if(answered)return;answered=true;const ok=norm(c)===norm(item.answer);if(ok)correct++;document.querySelectorAll("#answers .answer").forEach(x=>{x.disabled=true;if(norm(x.textContent)===norm(item.answer))x.classList.add("correct");if(x===b&&!ok)x.classList.add("wrong")});feedback(ok,item);$("next").disabled=false});row.append(b,sound(c));$("answers").append(row)});}
else {const lab=document.createElement("label");lab.htmlFor="response";lab.textContent=level==="uitdaging"?(lang==="es"?"Escribe tu frase:":"Write your sentence:"):(lang==="es"?"Completa:":"Fill in:");const input=document.createElement(level==="uitdaging"?"textarea":"input");input.id="response";input.className="fill";if(level==="uitdaging")input.rows=3;else input.type="text";input.autocomplete="off";$("answers").append(lab,input);}
$("next").textContent=index===selected.items.length-1?"Bekijk je resultaat":t.next;
}
function feedback(ok,item){const t=instruction[lang],p=document.createElement("p");p.textContent=(ok?t.correct:t.wrong+" "+item.answer+".")+" "+(level==="uitdaging"?t.model+" "+full(item):"");$("feedback").append(p,sound(full(item)))}
function check(){if(answered)return;const item=selected.items[index];if(level==="uitdaging"){if(!$("response").value.trim())return;answered=true;openDone++;const p=document.createElement("p");p.textContent=instruction[lang].model+" "+full(item)+" — andere goede zinnen zijn ook mogelijk."; $("feedback").append(p,sound(full(item)));$("next").disabled=false;return}
const value=$("response").value;if(!value.trim())return;answered=true;const ok=norm(value)===norm(item.answer);if(ok)correct++;$("response").disabled=true;feedback(ok,item);$("next").disabled=false}
function finish(){$("question").textContent="Klaar!";$("answers").replaceChildren();$("audio-actions").replaceChildren();$("feedback").replaceChildren();$("check").hidden=true;$("next").disabled=true;const p=document.createElement("p");p.textContent=(level==="uitdaging"?"":instruction[lang].closed+": "+correct+" / "+selected.items.length+". ")+instruction[lang].openScore+": "+openDone+"."; $("feedback").append(p)}
function makePrint(){if(!selected)return;$("print-title").textContent=selected.title;$("print-level").textContent=({basis:"1 · Basis",gemiddeld:"2 · Gemiddeld",uitdaging:"3 · Uitdaging"})[level];$("print-questions").replaceChildren();selected.items.forEach((item,i)=>{const block=document.createElement("div");block.className="print-question";const q=document.createElement("p");q.textContent=(i+1)+". "+(level==="uitdaging"?item.cue:item.q);block.append(q);if(level==="basis"){const p=document.createElement("p");p.className="print-options";p.textContent=buildChoicesFor(item,i).map((x,j)=>String.fromCharCode(65+j)+". "+x).join("      ");block.append(p)}else{const d=document.createElement("div");d.className="print-line";block.append(d)}$("print-questions").append(block)})}
function buildChoicesFor(item,i){const a=[item.answer,...item.wrong];return a.map((_,j)=>a[(j+i%3)%3])}
const sel=$("topic");topics.forEach(topic=>{const op=document.createElement("option");op.value=topic.id;op.textContent=topic.title;sel.append(op)});
sel.addEventListener("change",()=>selectTopic(sel.value));
$("language").addEventListener("change",()=>{lang=$("language").value;updateLanguage();$("check").textContent=level==="uitdaging"?instruction[lang].sample:instruction[lang].check;});
document.querySelectorAll("[data-level]").forEach(b=>b.onclick=()=>{level=b.dataset.level;index=0;correct=0;openDone=0;document.querySelectorAll("[data-level]").forEach(x=>x.setAttribute("aria-pressed",String(x===b)));updateLanguage();render()});
$("check").onclick=check;$("next").onclick=()=>{if(!answered)return;if(index===9)finish();else{index++;render()}};
$("retry").onclick=()=>{index=0;correct=0;openDone=0;render()};
$("print").onclick=()=>{location.href="../../werkblad.html?oefening="+window.GRAMMAR_ROUTE+"&niveau="+encodeURIComponent(level)+"&taal="+lang+"&onderwerp="+encodeURIComponent(selected.id)};
selectTopic(selected.id);document.querySelectorAll("[data-level]").forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.level===level)));
})();