(()=>{
  if(document.body?.dataset?.bookId!=='miramar')return;
  if(window.MIRAMAR_ACTIVE_CANON!=='musical')return;
  if(!window.WORK_DATA||!Array.isArray(window.WORK_DATA.pages))return;

  const extra=[
`12 · DERECHO

mmm tum ta ya ah

mmm tum ta ya ah

Mi derecho. Tu derecho. Su derecho. Nuestro derecho.

Qué palabra tan cómoda: cabe perfectamente en la boca.

Lo difícil es meter cuatro derechos juntos en una terraza.

Mi intimidad. Tu uso. Nuestra convivencia. Su costumbre.

Derecho. Derecho. Cada uno llega vestido de absoluto.

mmm tum ta ya ah

Yo digo: no me invadas. Tú dices: no me impidas.

Yo digo: antes no estaba. Tú dices: ahora se puede.

Derecho. Derecho.

Dos verdades pueden chocar sin que ninguna sea mentira.

Y entonces aparece el problema: si todos tenemos razón, ¿quién se mueve primero?

Una linde mide centímetros. Una incomodidad no.

La lavadora no sabe nada. Centrifuga democráticamente.

Mi derecho. Tu derecho. Nuestro derecho.

Lo difícil no es proclamarlos. Es sentarlos juntos sin que uno ocupe la silla del otro.

tum pa ra pa ta ta tum

tum pa ra pa ta ta tum`,
`13 · BANDERA

tum tik ta tum tik ta ah

tum tik ta tum tik ta ah

Toda bandera empezó siendo un trapo.

Un trapo al que alguien decidió no renunciar.

Y toda guerra empieza cuando otro dice: pero si es solamente un trapo.

Blanco arriba. Blanco al viento. Blanco que ya no seca: representa.

tik ta tum tik ta tum

Bandera. Bandera.

Lo que antes tapaba el mar ahora reclama horizonte.

Una sábana matrimonial, la OTAN del tendedero.

Dos cuarenta de neutralidad y un blanco muy altanero.

Bandera. Bandera.

El símbolo no pregunta si nació en una lavadora.

Yo la miro y ya no veo algodón.

Veo frontera. Veo prueba. Veo país.

Qué fácil es fundar una nación cuando la tela ya viene con cuerda.

tum ka ta ka tum ah

tum ka ta ka tum ah`,
`14 · PROCLAMO

ka ta ka tum ta ah

ka ta ka tum ta ah

Yo, por la gracia del mar, la cuota de participación, la propiedad horizontal, el cansancio acumulado, la costumbre discutida, la linde trazada, la pinza medida, el acta rectificada, la sábana elevada y el derecho inalienable a desayunar sin comparecer,

proclamo.

Proclamo. Que conste. Proclamo. Que conste.

Que toda tela será considerada en su dimensión material, visual, territorial, simbólica, meteorológica y, si hiciera falta, constitucional.

Que ningún centímetro será pequeño si existe la posibilidad de medirlo.

Que ninguna mirada será inocente si puede convertirse en informe.

Que ningún informe será bastante si puede redactarse otro.

Que la intimidad será protegida por todos los medios necesarios, incluso aquellos que terminen ocupándola entera.

Que la bandera ondeará mientras exista viento, y si no existe viento, se hará constar la ausencia de viento.

Yo soy la linde. Yo soy el acta. Yo soy el uso. Yo soy la objeción. Yo soy el precedente. Yo soy la respuesta.

Proclamo.

Y debajo de todo, blanca, húmeda, absurdamente pequeña, una sábana.

tum ka ta ka pa ra pa tum

tum ka ta ka pa ra pa tum

Una corona no demuestra que seas reina.

Demuestra que ya no has encontrado otra manera de conseguir que te miren.

Mírenme. Mírenme. Yo, que pedía no ser mirada.

Qué ironía tan bien vestida.

Mírenme. Mírenme. La altura tapa el temblor. El brillo ordena la sala.

Yo quería intimidad. He construido una aparición.

Quería pasar inadvertida. He levantado arquitectura sobre la cabeza.

La corona pesa menos que la necesidad que la sostiene.

No soy menos cierta por ser enorme. Pero tampoco soy más cierta porque todos me vean.

Mírenme. Mírenme. Ahora sí: corona.

Ahora sí: Estado.

ka ta ka tum ta ah

ka ta ka tum ta ah`
  ];

  if(window.WORK_DATA.pages.length===11)window.WORK_DATA.pages.push(...extra);
  else if(window.WORK_DATA.pages.length<14){
    const have=window.WORK_DATA.pages.length-11;
    window.WORK_DATA.pages.push(...extra.slice(Math.max(0,have)));
  }

  window.WORK_DATA.subtitle='Tragicomedia multimedia · Canon musical · escenas 01–14';
  window.MIRAMAR_SCENE_TITLES={
    ...(window.MIRAMAR_SCENE_TITLES||{}),
    12:'DERECHO',
    13:'BANDERA',
    14:'PROCLAMO'
  };
  window.MIRAMAR_CANON={version:'musical-2026-09-16-01-14',pages:14,validated:true};
})();