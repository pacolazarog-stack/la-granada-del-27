/* Cinco voces mesósticas rediseñadas para la capa pétrea.
   No modifica ningún verso de LA VEGA, BAJO LA CAL ni de los poemas visibles.
   Sustituye únicamente los mensajes que dejaron de ser extraíbles al renovar H14.
*/
(()=>{
  const base=window.GRANADA_MESOSTIC_VOICES;
  if(!base) throw new Error('MESÓSTICOS PIEDRA: faltan las voces heredadas');

  const voices=JSON.parse(JSON.stringify(base));

  voices[3].v='NOTA NACE DENTRO';
  voices[5].v='LA FORMA RESPIRA';
  voices[14].h='EL SILENCIO SUENA BAJO LA TIERRA';
  voices[19].v='AÚN NACE MEMORIA';
  voices[27].v='AGUA CRUZA SIGLO';

  window.GRANADA_STONE_MESOSTIC_VOICES=voices;
  window.GRANADA_STONE_MESOSTIC_REDESIGN={
    count:5,
    replacements:{
      P03:{before:base[3].v,after:voices[3].v,letters:14,reason:'la nueva H14 no contiene V en P03; la voz se desplaza de memoria declarada a nacimiento interior de la nota'},
      P05:{before:base[5].v,after:voices[5].v,letters:14,reason:'la nueva H14 no contiene M en P05; la nueva voz convierte materia y talla en respiración'},
      H14:{before:base[14].h,after:voices[14].h,letters:27,reason:'BAJO LA CAL exige una voz horizontal nacida de sus 27 versos; el silencio subterráneo se vuelve sonido bajo la tierra'},
      P19:{before:base[19].v,after:voices[19].v,letters:14,reason:'la nueva H14 no contiene G en P19; el presente fechado pasa a producir memoria'},
      P27:{before:base[27].v,after:voices[27].v,letters:14,reason:'la nueva H14 no contiene T en P27; el agua se convierte en continuidad que atraviesa el siglo'}
    },
    rule:'rediseñar el mensaje con letras disponibles; nunca alterar un buen verso para recuperar una letra antigua'
  };
})();
