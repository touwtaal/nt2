/* TouwTaal Dutch speech: normal = one complete sentence; slow = short phrases and pauses. */
(function(){
 "use strict";
 let runId=0, pauseTimer=null;
 function stop(){
  runId++;
  if(pauseTimer!==null){clearTimeout(pauseTimer);pauseTimer=null;}
  if("speechSynthesis" in window)window.speechSynthesis.cancel();
 }
 function partsForSlow(text){
  const words=text.split(/\s+/).filter(Boolean),parts=[];
  for(let i=0;i<words.length;i+=2)parts.push(words.slice(i,i+2).join(" "));
  return parts;
 }
 function cleanSpeech(text){
  return String(text??"").replace(/\\/g,"").replace(/["“”„«»]/g,"").replace(/[\p{Extended_Pictographic}\uFE0F\u200D]/gu," ").replace(/_{2,}/g," ").replace(/\s+/g," ").trim();
 }
 function play(text,opts){
  opts=opts||{};
  const status=opts.statusElement||null;
  text=cleanSpeech(text);
  if(!text)return;
  if(!("speechSynthesis" in window)||!("SpeechSynthesisUtterance" in window)){
   if(status)status.textContent="Audio is niet beschikbaar op dit apparaat.";
   return;
  }
  stop();
  const id=runId,slow=!!opts.slow,synth=window.speechSynthesis;
  const list=slow?partsForSlow(text):[text];
  const voices=synth.getVoices();
  const dutch=voices.find(v=>v.lang.toLowerCase()==="nl-nl")||
              voices.find(v=>v.lang.toLowerCase().startsWith("nl"))||null;
  if(status)status.textContent="";
  function next(i){
   if(id!==runId||i>=list.length)return;
   const utterance=new window.SpeechSynthesisUtterance(list[i]);
   utterance.lang="nl-NL";
   utterance.rate=slow?0.55:1.0;
   if(dutch)utterance.voice=dutch;
   utterance.onend=()=>{
    if(id!==runId||i+1>=list.length)return;
    pauseTimer=setTimeout(()=>{pauseTimer=null;next(i+1)},320);
   };
   utterance.onerror=(e)=>{
    if(id!==runId)return;
    if(e.error==="canceled"||e.error==="interrupted")return;
    if(status)status.textContent="Het voorlezen lukt niet. Probeer het nog eens.";
   };
   synth.speak(utterance);
  }
  next(0);
 }
 window.TouwTaalSpeech={play,stop};

 // A shared, accessible review for productive language tasks.
 // A model is never a complete list of possible Dutch responses.
 const reviewStyle=document.createElement("style");
 reviewStyle.textContent=".tt-review{margin-top:1rem}.tt-review h3{font-size:1.05rem;margin:.7rem 0}.tt-review ol{margin:.5rem 0 1rem;padding-left:1.5rem}.tt-review li{padding:.4rem 0;line-height:1.6;overflow-wrap:anywhere}.tt-review li+li{border-top:1px solid var(--line,#e5dce7)}.tt-review .tt-review-row{display:flex;flex-wrap:wrap;gap:.75rem;margin:1rem 0}.tt-review .tt-review-btn{border:2px solid var(--deep,#604675);border-radius:12px;background:#fff;color:var(--deep,#604675);padding:.8rem 1.05rem;font:inherit;font-weight:800;cursor:pointer;min-width:9rem}.tt-review .tt-review-btn:focus-visible{outline:3px solid #9674b5;outline-offset:3px}.tt-review .tt-review-btn:hover{background:#f5eff8}.tt-review .tt-review-btn:disabled{opacity:.55;cursor:default}.tt-review .tt-review-status{font-weight:800;margin:.7rem 0}.tt-review .tt-review-hint{margin:.55rem 0;line-height:1.55}";
 document.head.append(reviewStyle);
 const reviewText={
  nl:{title:"Mogelijke goede antwoorden",note:"Andere goede formuleringen zijn mogelijk. Controleer of jouw antwoord de opdracht goed uitvoert.",good:"👍 Goed",wrong:"👎 Niet goed",question:"Is jouw antwoord goed?",matched:"Je antwoord is gelijk aan een voorbeeld: automatisch goedgekeurd.",markedGood:"Je hebt dit antwoord als goed beoordeeld.",markedWrong:"Je hebt dit antwoord als niet goed beoordeeld.",example:"Luister naar een voorbeeld"},
  en:{title:"Possible correct answers",note:"Other answers may also be correct. Check whether your answer meets the task.",good:"👍 Correct",wrong:"👎 Not correct",question:"Was your answer correct?",matched:"Your answer matches an example: marked correct automatically.",markedGood:"You marked your answer as correct.",markedWrong:"You marked your answer as incorrect.",example:"Listen to an example"},
  es:{title:"Posibles respuestas correctas",note:"También puede haber otras respuestas correctas. Comprueba si tu respuesta cumple la tarea.",good:"👍 Correcto",wrong:"👎 Incorrecto",question:"¿Tu respuesta es correcta?",matched:"Tu respuesta coincide con un ejemplo: se ha marcado automáticamente como correcta.",markedGood:"Has marcado tu respuesta como correcta.",markedWrong:"Has marcado tu respuesta como incorrecta.",example:"Escuchar un ejemplo"}
 };
 function reviewNormalize(v){return String(v||"").toLocaleLowerCase("nl-NL").trim().replace(/[.!?;:,“”"']/g,"").replace(/\s+/g," ");}
 function reviewOpen(opts){
  const o=opts||{},container=o.container;
  if(!container)throw Error("A review container is required");
  const lang=reviewText[o.lang]?o.lang:"nl",t=reviewText[lang];
  const sentences=[...(o.examples||[])].filter(x=>typeof x==="string"&&x.trim());
  const unique=[...new Map(sentences.map(x=>[reviewNormalize(x),x.trim()])).values()];
  if(!unique.length)throw Error("At least one correct example is required");
  container.replaceChildren();
  const box=document.createElement("section");box.className="tt-review";box.setAttribute("aria-label",t.title);
  const header=document.createElement("h3");header.textContent=t.title;box.append(header);
  const list=document.createElement("ol");
  unique.forEach((sentence,i)=>{
   const li=document.createElement("li");li.textContent=sentence;
   if(typeof o.listen==="function"){const audio=o.listen(sentence,i);if(audio)li.append(document.createTextNode(" "),audio);}
   list.append(li);
  });
  box.append(list);
  if(o.criteria){const rule=document.createElement("p");rule.className="tt-review-hint";
   rule.textContent=o.criteria;box.append(rule);}
  const note=document.createElement("p");note.className="tt-review-hint";note.textContent=t.note;box.append(note);
  const status=document.createElement("p");status.className="tt-review-status";status.setAttribute("role","status");
  let recorded=false;
  function decide(ok,auto){
   if(recorded)return;
   recorded=true;status.textContent=auto?t.matched:(ok?t.markedGood:t.markedWrong);
   if(typeof o.onVote==="function")o.onVote(ok,!!auto);
   if(buttons)Array.from(buttons.querySelectorAll("button")).forEach(b=>b.disabled=true);
  }
  const answer=String(o.answer||"").trim();
  let buttons=null;
  if(answer&&unique.some(s=>reviewNormalize(answer)===reviewNormalize(s))){
   decide(true,true);
  }else{
   const question=document.createElement("p");question.textContent=t.question;box.append(question);
   buttons=document.createElement("div");buttons.className="tt-review-row";
   for(const [ok,label]of [[true,t.good],[false,t.wrong]]){
    const b=document.createElement("button");b.type="button";b.className="tt-review-btn";b.textContent=label;
    b.addEventListener("click",()=>decide(ok,false));buttons.append(b);
   }
   box.append(buttons);
  }
  box.append(status);container.append(box);
 }
 window.TouwTaalOpenReview={show:reviewOpen};

})();
