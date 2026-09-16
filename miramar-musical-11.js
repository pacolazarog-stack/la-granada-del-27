(()=>{
  if(document.body?.dataset?.bookId!=='miramar'||window.MIRAMAR_ACTIVE_CANON!=='musical'||!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;
  const page=`11 · SIEMPRE SE HA HECHO

ta ka tum ta ka tum ah

ta ka tum ta ka tum ah

Primero sucede. Luego vuelve a suceder. Después alguien dice: siempre se ha hecho.

Siempre se ha hecho. Siempre se ha hecho.

Tres palabras con más antigüedad que el edificio entero.

¿Siempre desde cuándo? Desde siempre.

¿Quién lo decidió? Nadie.

¿Dónde consta? En que se hacía.

Primero uso. Después costumbre. Luego precedente.

ta ka tum ta ka tum ah

Siempre se ha hecho. Siempre se ha hecho.

Si se repite bastante, parece que nació con las llaves.

Yo pregunto dónde empieza. Me responden que ya estaba.

Pregunto quién autorizó. Me responden que nadie protestó.

Y ahí está el milagro: lo que nadie decidió acaba pareciendo obligatorio.

Cuando esa frase entra por la puerta, el abogado ya está subiendo la escalera.

tum ta tum ta ah

tum ta tum ta ah

Dejó de ser una sábana. Pasó a ser un uso.

Uso.

Qué palabra tan limpia. No huele a detergente. No gotea. No se arruga.

No es sábana. Es uso.

No es ropa. Es uso.

No es martes. Es uso.

Que conste en acta. Que conste en acta.

Lo que se nombra empieza a mandar.

Una cosa pequeña ha aprendido un nombre grande.

Y ya no sé qué detergente compra una para lavar una categoría.

mmm tum ta ya ah

mmm tum ta ya ah`;
  window.WORK_DATA.pages.push(page);
  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–11';
  window.MIRAMAR_SCENE_TITLES=Object.assign({},window.MIRAMAR_SCENE_TITLES,{11:'SIEMPRE SE HA HECHO'});
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-11',pages:11,validated:true};
})();