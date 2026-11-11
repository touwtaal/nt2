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
 function play(text,opts){
  opts=opts||{};
  const status=opts.statusElement||null;
  text=String(text||"").replace(/_{2,}/g," ").replace(/\s+/g," ").trim();
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
})();
