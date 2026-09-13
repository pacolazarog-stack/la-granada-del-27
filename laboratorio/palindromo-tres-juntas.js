/* GRANADA SUCEDE — SUCEDE GRANADA · tres juntas de superficie
   Colocación final de trabajo del estribillo palindrómico/sintáctico.
   No altera los poemas 09 ni 18. La tercera aparición ya está absorbida
   como verso 27 de UN SIGLO DESPUÉS.
*/
(()=>{
  const text='Granada sucede — sucede Granada.';

  window.GRANADA_LAB_PALINDROMO={
    text,
    count:3,
    rule:'tres apariciones exactas; no añadir una cuarta entre las Loas ni en la revelación final',
    placements:[
      {
        order:1,
        afterPoem:9,
        poemTitle:'ANTES DE SABERLO',
        mode:'junta exterior',
        block:'01–09',
        preservesPoemEnding:'El día continúa.',
        function:'cierra el primer tercio sin sustituir el cierre del poema; la frase aparece por primera vez como signo de que la ciudad sigue sucediendo antes de saber qué será historia'
      },
      {
        order:2,
        afterPoem:18,
        beforePoem:19,
        poemTitle:'CIEN AÑOS',
        nextPoemTitle:'GRANADA, 2027',
        mode:'gozne temporal',
        block:'10–18 / 19–27',
        preservesPoemEnding:'de pasar de una boca a otra.',
        function:'puerta principal 1927↔2027; el giro Granada/sucede se lee en ambas direcciones justo antes de entrar en la Granada fechada en 2027'
      },
      {
        order:3,
        poem:27,
        poemTitle:'UN SIGLO DESPUÉS',
        verse:27,
        mode:'coda absorbida',
        block:'19–27',
        previousVerse:'Bajo la avenida sigue pasando el agua.',
        function:'el estribillo deja de estar fuera del poema y entra en él como cierre; devuelve el final al comienzo sin repetir después la frase'
      }
    ],
    progression:'exterior → gozne → interior',
    thirds:['01–09','10–18','19–27'],
    door1927_2027:{
      primaryPlacement:2,
      before:'CIEN AÑOS',
      after:'GRANADA, 2027',
      reading:'Granada sucede / sucede Granada',
      function:'la misma frase admite ida y vuelta sin convertir 1927 y 2027 en equivalentes; solo afirma continuidad y transformación'
    },
    relationToLoas:{
      revealAfterThird:true,
      layout:'Loa I y Loa II enfrentadas, sin repetir el estribillo entre ambas',
      loaI:'expansión hacia fuera: mesa, música, juventud, voces, manos, canto, respuesta',
      loaII:'expansión hacia dentro: falta, cal, ausencias, sangre, memoria, agua que sube y rompe',
      palindromeFunction:'fórmula mínima común: la superficie dice que Granada sucede; las Loas muestran dos direcciones de ese suceder',
      noFourthOccurrence:true
    },
    typography:{
      isolated:true,
      sameInk:true,
      emphasis:'espacio y posición, no color, negrita ni ornamento',
      note:'las dos primeras apariciones funcionan como juntas tipográficas; la tercera conserva la tipografía del poema 27'
    }
  };
})();
