(function(){"use strict";
const explanation={"a1/grammatica":["You use pronouns such as ik, jij, hij and wij with a verb in the present tense. For example: ik woon, hij woont, wij wonen.","Usas pronombres como ik, jij, hij y wij con un verbo en presente. Por ejemplo: ik woon, hij woont, wij wonen."],"a1/meervoud":["Make nouns plural. Many nouns end in -en or -s in the plural. Sometimes the spelling changes.","Forma el plural de los sustantivos. Muchos terminan en -en o -s. A veces cambia la escritura."],"a1/bijvoeglijk-naamwoord":["An adjective describes something: een mooie jas, een groot huis. Often you add -e before a noun, but not always.","Un adjetivo describe algo: een mooie jas, een groot huis. A menudo se añade -e delante del sustantivo, pero no siempre."],"a1/modale-werkwoorden":["Use kunnen (can), mogen (be allowed to), moeten (must) and willen (want to). The other verb normally goes at the end in its infinitive form.","Usa kunnen (poder), mogen (tener permiso), moeten (tener que) y willen (querer). El otro verbo suele ir al final en infinitivo."],"a1/niet-geen":["Use geen to say you do not have or want a noun without a definite article: geen fiets. Use niet to negate a verb or description: ik fiets niet.","Usa geen para negar un sustantivo sin artículo definido: geen fiets. Usa niet para negar un verbo o una descripción: ik fiets niet."],"a1/vergelijken":["Compare people and things: groot (big), groter (bigger), het grootst (biggest). Use dan when comparing two things.","Compara personas y cosas: groot (grande), groter (más grande), het grootst (el más grande). Usa dan para comparar dos cosas."],"a1/voegwoorden":["Join two main clauses using en (and), maar (but), want (because), of (or) or dus (so). The word order in each main clause stays the same.","Une dos oraciones principales con en (y), maar (pero), want (porque), of (o) o dus (así que). Se mantiene el orden habitual en las dos oraciones."],"a2/perfectum":["Use the present perfect to talk about what has happened. It consists of hebben or zijn and a past participle: ik heb gewerkt, ik ben gegaan.","Usa el perfecto para hablar de lo que ha ocurrido. Se forma con hebben o zijn y un participio: ik heb gewerkt, ik ben gegaan."],"a2/iets-niets":["Iets means 'something' and niets means 'nothing'. Before an adjective, you usually add -s: iets lekkers, niets bijzonders.","Iets significa «algo» y niets significa «nada». Delante de un adjetivo normalmente se añade -s: iets lekkers, niets bijzonders."],"a2/verleden-tijd":["Use the simple past to describe what happened or what you regularly did in the past. Compare it with the present perfect. 'Yesterday' by itself does not determine which tense is correct.","Usa el pasado simple neerlandés para contar lo que pasó o lo que hacías habitualmente. Compáralo con el perfecto. «Ayer» por sí solo no determina qué tiempo debes usar."],"a2/wederkerende-werkwoorden":["Some Dutch verbs use a reflexive pronoun: ik voel me goed, jij voelt je goed, hij voelt zich goed, wij voelen ons goed.","Algunos verbos neerlandeses llevan un pronombre reflexivo: ik voel me goed, jij voelt je goed, hij voelt zich goed, wij voelen ons goed."],"a2/scheidbare-werkwoorden":["Some Dutch verbs have a separable part: ik sta op. With an infinitive, it stays together: ik wil opstaan. In the perfect: ik ben opgestaan.","Algunos verbos neerlandeses tienen una partícula separable: ik sta op. En infinitivo se mantiene unida: ik wil opstaan. En perfecto: ik ben opgestaan."],"a2/gebiedende-wijs":["Use the imperative to give short instructions: Wacht even! Open de deur! For a polite instruction, you can also use u.","Usa el imperativo para dar instrucciones breves: Wacht even! Open de deur! Para dar una instrucción formal y cortés también puedes usar u."]};
const path=location.pathname.match(/\/(a[12])\/([^/]+)\//);
if(!path)return;const key=path[1]+"/"+path[2],record=explanation[key];if(!record)return;
const intro=document.querySelector(".module-card")||document.querySelector(".practice-card");if(!intro)return;
const p=intro.querySelector("p"),heading=intro.querySelector("h2"),h3=intro.querySelector("h3");if(!p)return;
const initial=p.innerHTML,h2=heading?.textContent,h3text=h3?.textContent;
const box=document.createElement("div");box.className="grammar-translation";box.setAttribute("role","group");box.setAttribute("aria-label","Taal van grammaticale uitleg");
const label=document.createElement("span");label.textContent="Uitleg / Explanation / Explicación:";
box.append(label);
const langs=[["nl","Nederlands"],["en","English"],["es","Español"]];
const buttons={};

const ruleTranslations={"a1/grammatica":[null,"Use the verb stem with ik: ik werk. With jij/je, hij/zij and u, you usually add -t: jij werkt. With wij, jullie and plural zij, use the full infinitive: wij werken. When jij/je comes directly after the verb, drop the -t: Werk jij? Zijn and hebben have irregular forms.","Con ik se usa la raíz: ik werk. Con jij/je, hij/zij y u normalmente se añade -t: jij werkt. Con wij, jullie y zij en plural, se usa el infinitivo: wij werken. Si jij/je va justo después del verbo, se elimina la -t: Werk jij? Zijn y hebben tienen formas irregulares."],"a1/meervoud":[null,"Many Dutch nouns form their plural with -en or -s: boek → boeken; tafel → tafels. Sometimes the spelling changes to keep the same vowel sound: raam → ramen; man → mannen. Some plurals are irregular and need to be learned separately.","Muchos sustantivos forman el plural con -en o -s: boek → boeken; tafel → tafels. A veces cambia la escritura para conservar el sonido de la vocal: raam → ramen; man → mannen. Algunos plurales son irregulares y se aprenden por separado."],"a1/bijvoeglijk-naamwoord":[null,"An adjective usually takes -e before a noun: de mooie jas, het mooie huis. But with a singular het-word after een or geen, there is no -e: een mooi huis, geen mooi huis. After the noun, the adjective does not take -e: Het huis is mooi.","Un adjetivo normalmente lleva -e delante de un sustantivo: de mooie jas, het mooie huis. Pero con un sustantivo het singular después de een o geen, no se añade -e: een mooi huis, geen mooi huis. Después del sustantivo tampoco lleva -e: Het huis is mooi."],"a1/modale-werkwoorden":[null,"Modal verbs express ability, permission, obligation or wishes: kunnen, mogen, moeten, willen. The other verb usually goes at the end as an infinitive: Ik wil koffie bestellen. Hoeven is commonly used with niet or geen: Je hoeft niet te wachten.","Los verbos modales expresan capacidad, permiso, obligación o deseo: kunnen, mogen, moeten, willen. El otro verbo suele ir al final en infinitivo: Ik wil koffie bestellen. Hoeven suele usarse con niet o geen: Je hoeft niet te wachten."],"a1/niet-geen":[null,"Use geen before a noun when you mean 'no' or 'not any': Ik heb geen fiets. Use niet to negate a verb, description or specific noun: Ik fiets niet. De soep is niet lekker. Dit is niet de fiets.","Usa geen delante de un sustantivo cuando quieres decir que no tienes o no hay algo: Ik heb geen fiets. Usa niet para negar un verbo, una descripción o un sustantivo concreto: Ik fiets niet. De soep is niet lekker. Dit is niet de fiets."],"a1/vergelijken":[null,"To compare two things, usually add -er and use dan: kleiner dan. For 'the most', usually use -st: het kleinst. Some common words are irregular: goed → beter → best; graag → liever → liefst; veel → meer → meest.","Para comparar dos cosas, normalmente se añade -er y se usa dan: kleiner dan. Para el grado máximo, normalmente se usa -st: het kleinst. Algunas palabras frecuentes son irregulares: goed → beter → best; graag → liever → liefst; veel → meer → meest."],"a1/voegwoorden":[null,"Join two main clauses with en (and), maar (but), want (because), of (or) or dus (so). The normal word order stays the same: Ik blijf thuis, want ik ben ziek. Compare this with omdat, which moves the verb to the end in a subordinate clause.","Une dos oraciones principales con en (y), maar (pero), want (porque), of (o) o dus (así que). Se mantiene el orden normal: Ik blijf thuis, want ik ben ziek. Compáralo con omdat, que lleva el verbo al final de la oración subordinada."],"a2/perfectum":[null,"The perfect tense uses hebben or zijn plus a past participle: ik heb gewerkt, ik ben gegaan. Regular participles often take ge-...-d or ge-...-t, depending on the verb stem: gemaakt, gewerkt. Irregular forms such as gezien and gegaan need to be learned. Not all verbs use hebben.","El perfecto se forma con hebben o zijn más un participio: ik heb gewerkt, ik ben gegaan. Los participios regulares suelen llevar ge-...-d o ge-...-t según la raíz: gemaakt, gewerkt. Hay que aprender formas irregulares como gezien y gegaan. No todos los verbos usan hebben."],"a2/iets-niets":["Iets betekent 'iets / something'. Niets betekent 'helemaal niets / nothing'. Na iets en niets krijgt een bijvoeglijk naamwoord vaak een -s: iets lekkers, niets bijzonders.","Iets means 'something'; niets means 'nothing'. When an adjective follows, it usually ends in -s: iets lekkers ('something tasty'), niets bijzonders ('nothing special').","Iets significa «algo» y niets significa «nada». Si después aparece un adjetivo, normalmente termina en -s: iets lekkers («algo rico»), niets bijzonders («nada especial»)."],"a2/verleden-tijd":[null,"The simple past (imperfectum) often describes past habits or background: Vroeger fietste ik elke dag. Regular verbs take -te/-ten or -de/-den. Irregular verbs have special forms: ik ging, wij gingen. The perfect also describes the past, often a completed event: Ik heb gisteren gefietst. Gisteren alone does not decide which tense to use.","El imperfecto neerlandés (imperfectum) suele expresar hábitos o circunstancias del pasado: Vroeger fietste ik elke dag. Los verbos regulares llevan -te/-ten o -de/-den. Los irregulares tienen formas especiales: ik ging, wij gingen. El perfecto también habla del pasado, a menudo de hechos terminados: Ik heb gisteren gefietst. Gisteren por sí solo no determina el tiempo verbal."],"a2/wederkerende-werkwoorden":["Sommige werkwoorden hebben een wederkerend woord: ik voel me goed, jij voelt je goed, hij voelt zich goed, wij voelen ons goed. Kies het woord dat bij de persoon past.","Some verbs need a reflexive pronoun. It changes with the subject: ik voel me goed, jij voelt je goed, hij voelt zich goed, wij voelen ons goed. Match the pronoun to the person.","Algunos verbos necesitan un pronombre reflexivo. Cambia según el sujeto: ik voel me goed, jij voelt je goed, hij voelt zich goed, wij voelen ons goed. Elige el pronombre que corresponde a la persona."],"a2/scheidbare-werkwoorden":["Bij sommige werkwoorden gaat een deel naar achteren: ik sta om zeven uur op. Met een ander werkwoord blijft alles samen: ik wil vroeg opstaan. In het perfectum komt ge- vaak ertussen: ik ben opgestaan.","Some Dutch verbs have a separable prefix. In a main clause it goes to the end: ik sta om zeven uur op. With another verb, the infinitive stays together: ik wil vroeg opstaan. In the perfect tense, ge- often goes between prefix and verb: ik ben opgestaan.","Algunos verbos neerlandeses tienen un prefijo separable. En la oración principal va al final: ik sta om zeven uur op. Con otro verbo, el infinitivo permanece unido: ik wil vroeg opstaan. En el perfecto, ge- suele ir entre el prefijo y el verbo: ik ben opgestaan."],"a2/gebiedende-wijs":["Je gebruikt de gebiedende wijs om een instructie te geven. Meestal gebruik je de stam: Wacht even! Open de deur! Voor een beleefde opdracht kun je ook u gebruiken: Volgt u de borden.","Use the imperative to give instructions. Usually use the verb stem: Wacht even! Open de deur! You can use u for a polite instruction: Volgt u de borden.","Usa el imperativo para dar instrucciones. Normalmente se usa la raíz verbal: Wacht even! Open de deur! También puedes usar u para una instrucción cortés: Volgt u de borden."]};
const moduleCards=[...document.querySelectorAll("main .module-card, main .practice-card")];
const printCard=moduleCards.find(el=>el.classList.contains("print-only"));
const printPosition=moduleCards.indexOf(printCard);
const nativeRules=printPosition<0?[]:moduleCards.slice(printPosition+1).filter(el=>el.querySelector("h2"));
const ruleCard=document.createElement("section");
ruleCard.className=intro.classList.contains("module-card")?"module-card":"practice-card";
ruleCard.setAttribute("aria-label","Handige regel");
const ruleTitle=document.createElement("h2");
ruleTitle.textContent="Handige regel";
const quickStyle=document.createElement("style");
quickStyle.textContent="\n.tt-quick-list{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,230px),1fr));gap:.7rem;margin:.75rem 0 1rem}\n.tt-quick-line{display:block;background:#fff;border:1px solid var(--line);border-left:4px solid var(--lavender);border-radius:12px;padding:.8rem 1rem;line-height:1.5;overflow-wrap:anywhere}\n.tt-quick-line strong,.tt-quick-line b{color:var(--deep);font-weight:800}\n.tt-quick-key{display:block;color:var(--deep);font-weight:800;margin-bottom:.2rem}\n.tt-quick-model{display:block;font-weight:700;margin-top:.25rem}\n.tt-quick-index{display:inline-block;font-weight:800;color:var(--deep);margin-right:.45rem}\n.tt-quick-list[hidden]{display:none!important}\n@media(max-width:540px){.tt-quick-list{grid-template-columns:1fr}}\n";
document.head.append(quickStyle);
const ruleGrid=document.createElement("div");
ruleGrid.className="tt-quick-list";
ruleCard.append(ruleTitle,ruleGrid);
if(nativeRules.length){
 nativeRules[0].insertAdjacentElement("afterend",ruleCard);
}else if(printCard){printCard.insertAdjacentElement("afterend",ruleCard);}
const ruleRecord=ruleTranslations[key];
// As in the A1 source lesson: subject → verb form → short example.
const presentTense={
nl:[["ik","stam","ik werk"],["jij/je · hij/zij · u","stam + t","jij werkt"],["wij · jullie · zij","hele werkwoord","wij werken"],["werkwoord + jij/je?","geen -t","Werk jij?"]],
en:[["ik","verb stem","ik werk"],["jij/je · hij/zij · u","stem + t","jij werkt"],["wij · jullie · zij","infinitive","wij werken"],["verb + jij/je?","no -t","Werk jij?"]],
es:[["ik","raíz verbal","ik werk"],["jij/je · hij/zij · u","raíz + t","jij werkt"],["wij · jullie · zij","infinitivo","wij werken"],["verbo + jij/je?","sin -t","Werk jij?"]]
};
function ruleLine(number,content){
 const line=document.createElement("div");line.className="tt-quick-line";
 const num=document.createElement("span");num.className="tt-quick-index";num.textContent=String(number)+".";
 line.append(num,content);ruleGrid.append(line);
}
function showRule(lang){
 if(!ruleRecord)return;
 nativeRules.forEach(el=>el.hidden=true);
 ruleCard.hidden=false;
 ruleGrid.replaceChildren();
 ruleTitle.textContent=lang==="en"?"Useful rule":lang==="es"?"Regla útil":"Handige regel";
 if(key==="a1/grammatica"){
  presentTense[lang].forEach(([who,formula,model],i)=>{
   const inner=document.createElement("div");
   const whoLabel=document.createElement("strong");whoLabel.className="tt-quick-key";whoLabel.textContent=who;
   const line=document.createElement("span");line.textContent=formula;
   const example=document.createElement("span");example.className="tt-quick-model";example.textContent="→ "+model;
   inner.append(whoLabel,line,example);ruleLine(i+1,inner);
  });
  const note=document.createElement("div");note.className="tt-quick-line";
  note.textContent=lang==="en"?"Remember: zijn and hebben have irregular forms (ik ben, ik heb).":lang==="es"?"Atención: zijn y hebben tienen formas irregulares (ik ben, ik heb).":"Let op: zijn en hebben zijn onregelmatig (ik ben, ik heb).";
  ruleGrid.append(note);
  return;
 }
 if(lang==="nl"&&nativeRules.length){
  let rows=nativeRules.flatMap(el=>[...el.querySelectorAll("p, li")]);
  if(!rows.length)rows=nativeRules.filter(el=>el.textContent.trim());
  rows.forEach((p,i)=>{
   const content=document.createElement("span");
   if(p.tagName==="P"||p.tagName==="LI")content.innerHTML=p.innerHTML;
   else content.textContent=p.textContent.trim();
   ruleLine(i+1,content);
  });
 }else{
  const raw=(lang==="es"?ruleRecord[2]:lang==="en"?ruleRecord[1]:ruleRecord[0])||"";
  const rows=raw.split(/(?<=[.!?])\s+(?=[A-ZÁÉÍÓÚÜ])/u).filter(Boolean);
  rows.forEach((part,i)=>{const span=document.createElement("span");span.textContent=part;ruleLine(i+1,span)});
 }
}

function change(lang){langs.forEach(([k])=>buttons[k].setAttribute("aria-pressed",String(k===lang)));
if(lang==="nl"){p.innerHTML=initial;if(heading)heading.textContent=h2;if(h3)h3.textContent=h3text}
else{p.textContent=record[lang==="en"?0:1];if(heading)heading.textContent=lang==="en"?"What will you practise?":"¿Qué vas a practicar?";if(h3)h3.textContent=lang==="en"?"Choose a level":"Elige un nivel"}
showRule(lang);
const url=new URL(location.href);url.searchParams.set("taal",lang);history.replaceState(null,"",url.pathname+url.search);}
langs.forEach(([k,name])=>{const button=document.createElement("button");button.type="button";button.textContent=name;button.setAttribute("aria-pressed","false");button.onclick=()=>change(k);buttons[k]=button;box.append(button)});
p.insertAdjacentElement("beforebegin",box);
const requested=new URLSearchParams(location.search).get("taal");change(["en","es"].includes(requested)?requested:"nl");
const print=document.getElementById("print");
if(print){print.addEventListener("click",ev=>{ev.stopImmediatePropagation();ev.preventDefault();const level=document.querySelector("[data-level][aria-pressed='true']")?.getAttribute("data-level")||"basis";
location.href="../../werkblad.html?oefening="+encodeURIComponent(key.replace("/","-"))+"&niveau="+encodeURIComponent(level)+"&taal="+encodeURIComponent(Object.entries(buttons).find(([,b])=>b.getAttribute("aria-pressed")==="true")?.[0]||"nl");
},true)}
})();