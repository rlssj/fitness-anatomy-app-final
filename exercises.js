// ============================================================
// FitBody - Exercise & Routine Data
// ============================================================

const MUSCLES = {
  chest: {
    id: 'chest',
    name: 'Pecho',
    nameEN: 'Chest',
    icon: '💪',
    description: 'El pectoral mayor es el músculo más grande del pecho. Responsable de los movimientos de empuje, aducción y rotación del hombro. Clave para el desarrollo del torso superior.',
    exercises: [
      {
        id: 'bench-press',
        name: 'Press de Banca',
        description: 'Tumbado en un banco, baja la barra hasta el pecho y empuja hacia arriba. Mantén los pies en el suelo y la espalda ligeramente arqueada.',
        level: 'intermedio',
        type: 'fuerza',
        sets: '4x6-8',
        rest: '3 min',
        muscles: ['chest', 'triceps', 'shoulders'],
        equipment: 'barra'
      },
      {
        id: 'pushups',
        name: 'Flexiones',
        description: 'Posición de plancha, baja el pecho hasta casi tocar el suelo y empuja. Cuerpo recto como tabla. Ideal para principiantes y calentamiento.',
        level: 'principiante',
        type: 'resistencia',
        sets: '3x15-20',
        rest: '60 seg',
        muscles: ['chest', 'triceps'],
        equipment: 'sin equipo'
      },
      {
        id: 'incline-press',
        name: 'Press Inclinado',
        description: 'Similar al press de banca pero con el banco a 30-45°. Enfoca el trabajo en la parte superior del pecho y aporta mayor definición.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x10-12',
        rest: '90 seg',
        muscles: ['chest', 'shoulders'],
        equipment: 'mancuernas'
      },
      {
        id: 'dumbbell-flyes',
        name: 'Aperturas con Mancuernas',
        description: 'En banco plano, con brazos ligeramente doblados, baja las mancuernas en arco y súbelas. Maximiza el estiramiento del pectoral.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x12-15',
        rest: '60 seg',
        muscles: ['chest'],
        equipment: 'mancuernas'
      },
      {
        id: 'cable-crossover',
        name: 'Cruces en Polea',
        description: 'Con poleas altas, lleva las manos hacia el centro en un movimiento de abrazo. Excelente para aislar y definir el pectoral.',
        level: 'avanzado',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['chest'],
        equipment: 'polea'
      },
      {
        id: 'dips',
        name: 'Fondos en Paralelas',
        description: 'Apóyate en las barras paralelas, baja el cuerpo inclinando el torso hacia adelante y sube. Excelente para la parte inferior del pecho.',
        level: 'avanzado',
        type: 'fuerza',
        sets: '4x8-12',
        rest: '2 min',
        muscles: ['chest', 'triceps'],
        equipment: 'paralelas'
      }
    ]
  },
  back: {
    id: 'back',
    name: 'Espalda',
    nameEN: 'Back',
    icon: '🏋️',
    description: 'La espalda es el grupo muscular más complejo: dorsal ancho, trapecios, romboides y erectores. Fundamental para la postura y movimientos de tracción.',
    exercises: [
      {
        id: 'pullups',
        name: 'Dominadas',
        description: 'Agárrate a una barra con palmas hacia fuera y sube hasta que la barbilla supere la barra. El rey de los ejercicios de espalda.',
        level: 'avanzado',
        type: 'fuerza',
        sets: '4x6-10',
        rest: '2 min',
        muscles: ['back', 'biceps'],
        equipment: 'barra dominadas'
      },
      {
        id: 'barbell-row',
        name: 'Remo con Barra',
        description: 'Inclinado hacia adelante, lleva la barra hasta el abdomen. Mantén la espalda recta. Construye grosor y densidad muscular.',
        level: 'intermedio',
        type: 'fuerza',
        sets: '4x8-10',
        rest: '2 min',
        muscles: ['back', 'biceps'],
        equipment: 'barra'
      },
      {
        id: 'lat-pulldown',
        name: 'Jalón al Pecho',
        description: 'En la máquina de poleas, lleva la barra hasta el pecho. Perfecto para desarrollar el dorsal y ganar amplitud en la espalda.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12-15',
        rest: '90 seg',
        muscles: ['back', 'biceps'],
        equipment: 'polea'
      },
      {
        id: 'seated-row',
        name: 'Remo en Polea Baja',
        description: 'Sentado, tira del cable hacia tu abdomen. Mantén el torso estable. Excelente para desarrollar la densidad de la espalda media.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '90 seg',
        muscles: ['back'],
        equipment: 'polea'
      },
      {
        id: 'deadlift',
        name: 'Peso Muerto',
        description: 'El ejercicio compuesto por excelencia. Levanta la barra del suelo manteniendo la espalda recta. Activa toda la cadena posterior.',
        level: 'avanzado',
        type: 'fuerza',
        sets: '4x5',
        rest: '4 min',
        muscles: ['back', 'legs', 'glutes'],
        equipment: 'barra'
      },
      {
        id: 'hyperextensions',
        name: 'Hiperextensiones',
        description: 'En el banco romano, baja el torso y sube manteniendo la espalda recta. Fortalece los erectores espinales y previene lesiones.',
        level: 'principiante',
        type: 'resistencia',
        sets: '3x15',
        rest: '60 seg',
        muscles: ['back', 'glutes'],
        equipment: 'banco romano'
      }
    ]
  },
  biceps: {
    id: 'biceps',
    name: 'Bíceps',
    nameEN: 'Biceps',
    icon: '💪',
    description: 'El bíceps braquial controla la flexión del codo y la supinación del antebrazo. Uno de los músculos más visibles y populares en el entrenamiento.',
    exercises: [
      {
        id: 'barbell-curl',
        name: 'Curl con Barra',
        description: 'Sujetando la barra con agarre supino, flexiona los codos llevando la barra hacia el pecho. El ejercicio de bíceps más clásico.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x10-12',
        rest: '90 seg',
        muscles: ['biceps'],
        equipment: 'barra'
      },
      {
        id: 'dumbbell-curl',
        name: 'Curl con Mancuernas',
        description: 'Alterna o realiza los dos brazos simultáneamente. Permite mayor rango de movimiento y corrección de desequilibrios musculares.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12-15',
        rest: '60 seg',
        muscles: ['biceps'],
        equipment: 'mancuernas'
      },
      {
        id: 'hammer-curl',
        name: 'Curl Martillo',
        description: 'Con agarre neutro (como un martillo), trabaja el braquial y el braquiorradial además del bíceps. Añade tamaño al brazo.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '60 seg',
        muscles: ['biceps'],
        equipment: 'mancuernas'
      },
      {
        id: 'preacher-curl',
        name: 'Curl Predicador',
        description: 'Apoyando el brazo en el banco predicador, elimina la inercia y enfoca el trabajo directamente en el bíceps.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '90 seg',
        muscles: ['biceps'],
        equipment: 'banco predicador'
      },
      {
        id: 'concentration-curl',
        name: 'Curl Concentrado',
        description: 'Sentado, apoya el codo en el muslo y realiza el curl. Máximo aislamiento del bíceps y excelente para el pico muscular.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x15',
        rest: '60 seg',
        muscles: ['biceps'],
        equipment: 'mancuerna'
      }
    ]
  },
  triceps: {
    id: 'triceps',
    name: 'Tríceps',
    nameEN: 'Triceps',
    icon: '💪',
    description: 'El tríceps ocupa 2/3 del volumen del brazo. Compuesto por tres cabezas, es responsable de la extensión del codo. Clave para brazos grandes.',
    exercises: [
      {
        id: 'tricep-pushdown',
        name: 'Extensión en Polea Alta',
        description: 'Con la barra en V o cuerda, empuja hacia abajo manteniendo los codos fijos. El ejercicio de tríceps más popular y efectivo.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x12-15',
        rest: '60 seg',
        muscles: ['triceps'],
        equipment: 'polea'
      },
      {
        id: 'skull-crushers',
        name: 'Rompecráneos',
        description: 'Tumbado, baja la barra hacia la frente doblando los codos y sube. Excelente para el volumen y la cabeza larga del tríceps.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '4x10-12',
        rest: '90 seg',
        muscles: ['triceps'],
        equipment: 'barra'
      },
      {
        id: 'tricep-dips',
        name: 'Fondos en Banco',
        description: 'Con las manos en un banco y pies al frente, baja el cuerpo y sube. Versión de peso corporal para el tríceps.',
        level: 'principiante',
        type: 'resistencia',
        sets: '3x15',
        rest: '60 seg',
        muscles: ['triceps'],
        equipment: 'banco'
      },
      {
        id: 'overhead-extension',
        name: 'Extensión por Encima de la Cabeza',
        description: 'De pie o sentado, sostén una mancuerna con ambas manos y baja detrás de la cabeza. Maximiza el estiramiento del tríceps.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '90 seg',
        muscles: ['triceps'],
        equipment: 'mancuerna'
      },
      {
        id: 'close-grip-bench',
        name: 'Press Agarre Cerrado',
        description: 'Press de banca con agarre estrecho. Compuesto que trabaja tríceps y pecho simultáneamente con mayor carga.',
        level: 'avanzado',
        type: 'fuerza',
        sets: '4x8',
        rest: '2 min',
        muscles: ['triceps', 'chest'],
        equipment: 'barra'
      }
    ]
  },
  shoulders: {
    id: 'shoulders',
    name: 'Hombros',
    nameEN: 'Shoulders',
    icon: '🏋️',
    description: 'El deltoides tiene tres cabezas: anterior, lateral y posterior. Responsable de todos los movimientos del hombro. Define la amplitud del torso.',
    exercises: [
      {
        id: 'overhead-press',
        name: 'Press Militar',
        description: 'De pie, empuja la barra desde los hombros hasta arriba de la cabeza. Ejercicio compuesto que construye tamaño y fuerza.',
        level: 'intermedio',
        type: 'fuerza',
        sets: '4x6-8',
        rest: '2 min',
        muscles: ['shoulders', 'triceps'],
        equipment: 'barra'
      },
      {
        id: 'lateral-raises',
        name: 'Elevaciones Laterales',
        description: 'Con mancuernas, sube los brazos lateralmente hasta la altura del hombro. Aísla el deltoides lateral y da amplitud al hombro.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['shoulders'],
        equipment: 'mancuernas'
      },
      {
        id: 'front-raises',
        name: 'Elevaciones Frontales',
        description: 'Sube las mancuernas hacia adelante alternando brazos. Trabaja el deltoides anterior y mejora la proyección del hombro.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '60 seg',
        muscles: ['shoulders'],
        equipment: 'mancuernas'
      },
      {
        id: 'rear-delt-fly',
        name: 'Pájaros Posteriores',
        description: 'Inclinado hacia adelante, abre los brazos. Trabaja el deltoides posterior, fundamental para el equilibrio y la postura.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['shoulders', 'back'],
        equipment: 'mancuernas'
      },
      {
        id: 'upright-row',
        name: 'Remo al Mentón',
        description: 'Tira de la barra hacia arriba por delante del cuerpo hasta el mentón. Trabaja hombros y trapecios.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '3x12',
        rest: '90 seg',
        muscles: ['shoulders', 'back'],
        equipment: 'barra'
      }
    ]
  },
  abs: {
    id: 'abs',
    name: 'Abdomen',
    nameEN: 'Abs',
    icon: '⚡',
    description: 'El core incluye el recto abdominal, oblicuos y transverso. Estabiliza la columna, conecta tren superior e inferior. Base de todo movimiento atlético.',
    exercises: [
      {
        id: 'crunches',
        name: 'Crunches',
        description: 'Tumbado, con las manos detrás de la cabeza, contrae el abdomen subiendo el torso ligeramente. La base del trabajo abdominal.',
        level: 'principiante',
        type: 'resistencia',
        sets: '3x20',
        rest: '45 seg',
        muscles: ['abs'],
        equipment: 'sin equipo'
      },
      {
        id: 'plank',
        name: 'Plancha',
        description: 'Mantén la posición de plancha con el cuerpo recto. Trabaja el core completo, incluido el transverso abdominal.',
        level: 'principiante',
        type: 'resistencia',
        sets: '3x60 seg',
        rest: '45 seg',
        muscles: ['abs'],
        equipment: 'sin equipo'
      },
      {
        id: 'leg-raises',
        name: 'Elevaciones de Piernas',
        description: 'Tumbado, sube las piernas rectas hasta 90°. Trabaja intensamente el recto abdominal inferior.',
        level: 'intermedio',
        type: 'resistencia',
        sets: '3x15',
        rest: '60 seg',
        muscles: ['abs'],
        equipment: 'sin equipo'
      },
      {
        id: 'russian-twist',
        name: 'Giro Ruso',
        description: 'Sentado con piernas elevadas, gira el torso de lado a lado. Excelente para los oblicuos y la estabilidad del core.',
        level: 'intermedio',
        type: 'resistencia',
        sets: '3x30',
        rest: '60 seg',
        muscles: ['abs'],
        equipment: 'sin equipo'
      },
      {
        id: 'cable-crunch',
        name: 'Crunch en Polea',
        description: 'De rodillas, tira de la polea hacia abajo contrayendo el abdomen. Añade resistencia progresiva al trabajo abdominal.',
        level: 'avanzado',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['abs'],
        equipment: 'polea'
      }
    ]
  },
  legs: {
    id: 'legs',
    name: 'Piernas',
    nameEN: 'Legs',
    icon: '🦵',
    description: 'Cuádriceps, isquiotibiales y gemelos forman el tren inferior. El grupo muscular más grande del cuerpo, esencial para la fuerza total y el metabolismo.',
    exercises: [
      {
        id: 'squat',
        name: 'Sentadilla',
        description: 'La reina de los ejercicios. Con la barra en los hombros, baja hasta que los muslos estén paralelos al suelo y sube.',
        level: 'intermedio',
        type: 'fuerza',
        sets: '5x5',
        rest: '3 min',
        muscles: ['legs', 'glutes'],
        equipment: 'barra'
      },
      {
        id: 'leg-press',
        name: 'Prensa de Piernas',
        description: 'En la máquina, empuja la plataforma con los pies. Permite mayor carga que la sentadilla y menor demanda técnica.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x12',
        rest: '2 min',
        muscles: ['legs', 'glutes'],
        equipment: 'máquina'
      },
      {
        id: 'lunges',
        name: 'Zancadas',
        description: 'Da un paso adelante y baja la rodilla trasera al suelo. Trabaja cuádriceps, isquiotibiales y glúteos unilateralmente.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x12 cada pierna',
        rest: '90 seg',
        muscles: ['legs', 'glutes'],
        equipment: 'mancuernas'
      },
      {
        id: 'leg-extension',
        name: 'Extensión de Cuádriceps',
        description: 'En la máquina, extiende las piernas. Aísla perfectamente el cuádriceps y es ideal para la definición de la parte frontal del muslo.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['legs'],
        equipment: 'máquina'
      },
      {
        id: 'leg-curl',
        name: 'Curl Femoral',
        description: 'Tumbado en la máquina, dobla las rodillas llevando los talones hacia los glúteos. Trabaja los isquiotibiales directamente.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x15',
        rest: '60 seg',
        muscles: ['legs'],
        equipment: 'máquina'
      },
      {
        id: 'calf-raises',
        name: 'Elevaciones de Talón',
        description: 'De pie, eleva los talones hasta la punta de los pies. Trabaja los gemelos y sóleos. Imprescindible para piernas completas.',
        level: 'principiante',
        type: 'resistencia',
        sets: '4x20',
        rest: '45 seg',
        muscles: ['legs'],
        equipment: 'sin equipo'
      }
    ]
  },
  glutes: {
    id: 'glutes',
    name: 'Glúteos',
    nameEN: 'Glutes',
    icon: '🍑',
    description: 'El glúteo mayor es el músculo más grande del cuerpo humano. Fundamental para la extensión de cadera, la postura y la generación de potencia.',
    exercises: [
      {
        id: 'hip-thrust',
        name: 'Hip Thrust',
        description: 'Apoya los hombros en un banco, coloca la barra en las caderas y empuja hacia arriba. El mejor ejercicio para los glúteos.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '4x12',
        rest: '90 seg',
        muscles: ['glutes'],
        equipment: 'barra'
      },
      {
        id: 'sumo-deadlift',
        name: 'Peso Muerto Sumo',
        description: 'Variante del peso muerto con pies más separados. Mayor activación del glúteo y aductor. Excelente para el tren inferior.',
        level: 'avanzado',
        type: 'fuerza',
        sets: '4x6',
        rest: '3 min',
        muscles: ['glutes', 'legs', 'back'],
        equipment: 'barra'
      },
      {
        id: 'glute-kickback',
        name: 'Patada Trasera',
        description: 'A cuatro patas, lleva una pierna hacia atrás y arriba contrayendo el glúteo. Gran aislamiento y definición del glúteo mayor.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '3x20 cada pierna',
        rest: '60 seg',
        muscles: ['glutes'],
        equipment: 'sin equipo'
      },
      {
        id: 'romanian-deadlift',
        name: 'Peso Muerto Rumano',
        description: 'Con las rodillas ligeramente dobladas, inclínate hacia adelante bajando la barra por las piernas. Máximo estiramiento del glúteo.',
        level: 'intermedio',
        type: 'hipertrofia',
        sets: '4x10',
        rest: '2 min',
        muscles: ['glutes', 'legs'],
        equipment: 'barra'
      },
      {
        id: 'abduction-machine',
        name: 'Abducción de Cadera',
        description: 'En la máquina, empuja las almohadillas hacia afuera. Trabaja el glúteo medio para dar forma y redondez a la zona.',
        level: 'principiante',
        type: 'hipertrofia',
        sets: '4x20',
        rest: '60 seg',
        muscles: ['glutes'],
        equipment: 'máquina'
      }
    ]
  }
};

// ============================================================
// Weekly Routines
// ============================================================

const ROUTINES = {
  gainMuscle: {
    principiante: {
      name: 'Ganar Músculo · Principiante',
      description: 'Rutina de 3 días con énfasis en movimientos compuestos básicos.',
      schedule: [
        { day: 'Lunes', focus: 'Pecho + Tríceps', muscles: ['chest', 'triceps'], emoji: '🏋️' },
        { day: 'Martes', focus: 'Descanso activo / Cardio suave', muscles: [], emoji: '🚶' },
        { day: 'Miércoles', focus: 'Espalda + Bíceps', muscles: ['back', 'biceps'], emoji: '💪' },
        { day: 'Jueves', focus: 'Descanso', muscles: [], emoji: '😴' },
        { day: 'Viernes', focus: 'Piernas + Abdomen', muscles: ['legs', 'abs'], emoji: '🦵' },
        { day: 'Sábado', focus: 'Hombros + Glúteos', muscles: ['shoulders', 'glutes'], emoji: '⚡' },
        { day: 'Domingo', focus: 'Descanso total', muscles: [], emoji: '🔋' }
      ]
    },
    intermedio: {
      name: 'Ganar Músculo · Intermedio',
      description: 'Rutina Push/Pull/Legs de 4 días con mayor volumen.',
      schedule: [
        { day: 'Lunes', focus: 'Push (Pecho + Hombros + Tríceps)', muscles: ['chest', 'shoulders', 'triceps'], emoji: '🏋️' },
        { day: 'Martes', focus: 'Pull (Espalda + Bíceps)', muscles: ['back', 'biceps'], emoji: '💪' },
        { day: 'Miércoles', focus: 'Piernas + Glúteos', muscles: ['legs', 'glutes'], emoji: '🦵' },
        { day: 'Jueves', focus: 'Descanso / Cardio', muscles: [], emoji: '🚶' },
        { day: 'Viernes', focus: 'Push (Fuerza)', muscles: ['chest', 'shoulders', 'triceps'], emoji: '🔥' },
        { day: 'Sábado', focus: 'Pull + Core', muscles: ['back', 'biceps', 'abs'], emoji: '⚡' },
        { day: 'Domingo', focus: 'Descanso total', muscles: [], emoji: '🔋' }
      ]
    },
    avanzado: {
      name: 'Ganar Músculo · Avanzado',
      description: 'Rutina de 6 días con doble frecuencia por grupo muscular.',
      schedule: [
        { day: 'Lunes', focus: 'Pecho + Bíceps (Volumen)', muscles: ['chest', 'biceps'], emoji: '🔥' },
        { day: 'Martes', focus: 'Espalda + Tríceps (Volumen)', muscles: ['back', 'triceps'], emoji: '🏋️' },
        { day: 'Miércoles', focus: 'Piernas + Hombros', muscles: ['legs', 'shoulders'], emoji: '🦵' },
        { day: 'Jueves', focus: 'Pecho + Bíceps (Fuerza)', muscles: ['chest', 'biceps'], emoji: '💪' },
        { day: 'Viernes', focus: 'Espalda + Tríceps (Fuerza)', muscles: ['back', 'triceps'], emoji: '⚡' },
        { day: 'Sábado', focus: 'Glúteos + Abdomen', muscles: ['glutes', 'abs'], emoji: '🍑' },
        { day: 'Domingo', focus: 'Descanso', muscles: [], emoji: '🔋' }
      ]
    }
  },
  loseFat: {
    principiante: {
      name: 'Quemar Grasa · Principiante',
      description: 'Combina circuitos de fuerza con cardio para maximizar el gasto calórico.',
      schedule: [
        { day: 'Lunes', focus: 'Circuito Cuerpo Completo', muscles: ['chest', 'back', 'legs'], emoji: '🔥' },
        { day: 'Martes', focus: 'Cardio 30 min + Core', muscles: ['abs'], emoji: '🏃' },
        { day: 'Miércoles', focus: 'Circuito Tren Superior', muscles: ['chest', 'shoulders', 'biceps', 'triceps'], emoji: '💪' },
        { day: 'Jueves', focus: 'Cardio HIIT 20 min', muscles: [], emoji: '⚡' },
        { day: 'Viernes', focus: 'Circuito Tren Inferior', muscles: ['legs', 'glutes', 'abs'], emoji: '🦵' },
        { day: 'Sábado', focus: 'Cardio largo 45 min', muscles: [], emoji: '🚴' },
        { day: 'Domingo', focus: 'Descanso activo', muscles: [], emoji: '🧘' }
      ]
    },
    intermedio: {
      name: 'Quemar Grasa · Intermedio',
      description: 'Entrenamiento con superse­ries y cardio HIIT para acelerar el metabolismo.',
      schedule: [
        { day: 'Lunes', focus: 'Pecho/Espalda (Superseries)', muscles: ['chest', 'back'], emoji: '🔥' },
        { day: 'Martes', focus: 'HIIT 25 min + Abdomen', muscles: ['abs'], emoji: '⚡' },
        { day: 'Miércoles', focus: 'Piernas/Glúteos (Circuito)', muscles: ['legs', 'glutes'], emoji: '🦵' },
        { day: 'Jueves', focus: 'Cardio moderado 40 min', muscles: [], emoji: '🏃' },
        { day: 'Viernes', focus: 'Hombros/Brazos (Superseries)', muscles: ['shoulders', 'biceps', 'triceps'], emoji: '💪' },
        { day: 'Sábado', focus: 'HIIT 30 min + Core', muscles: ['abs'], emoji: '🔥' },
        { day: 'Domingo', focus: 'Descanso', muscles: [], emoji: '🔋' }
      ]
    },
    avanzado: {
      name: 'Quemar Grasa · Avanzado',
      description: 'Protocolo de alta intensidad con entrenamiento en ayunas y cardio doble.',
      schedule: [
        { day: 'Lunes', focus: 'Fuerza + HIIT (Cuerpo completo)', muscles: ['chest', 'back', 'legs'], emoji: '🔥' },
        { day: 'Martes', focus: 'Cardio en ayunas + Core intenso', muscles: ['abs'], emoji: '⚡' },
        { day: 'Miércoles', focus: 'Push pesado + Cardio moderado', muscles: ['chest', 'shoulders', 'triceps'], emoji: '💪' },
        { day: 'Jueves', focus: 'Pull pesado + HIIT', muscles: ['back', 'biceps'], emoji: '🏋️' },
        { day: 'Viernes', focus: 'Piernas/Glúteos + Cardio', muscles: ['legs', 'glutes'], emoji: '🦵' },
        { day: 'Sábado', focus: 'Circuito total + Cardio 30 min', muscles: ['chest', 'back', 'abs'], emoji: '🔥' },
        { day: 'Domingo', focus: 'Descanso activo', muscles: [], emoji: '🧘' }
      ]
    }
  },
  strength: {
    principiante: {
      name: 'Fuerza · Principiante',
      description: 'Programa basado en los grandes levantamientos: sentadilla, peso muerto y press.',
      schedule: [
        { day: 'Lunes', focus: 'Sentadilla + Press Militar', muscles: ['legs', 'shoulders'], emoji: '🏋️' },
        { day: 'Martes', focus: 'Descanso', muscles: [], emoji: '😴' },
        { day: 'Miércoles', focus: 'Peso Muerto + Dominadas', muscles: ['back', 'legs'], emoji: '💪' },
        { day: 'Jueves', focus: 'Descanso', muscles: [], emoji: '😴' },
        { day: 'Viernes', focus: 'Press Banca + Remo', muscles: ['chest', 'back'], emoji: '🔥' },
        { day: 'Sábado', focus: 'Core + Movilidad', muscles: ['abs'], emoji: '🧘' },
        { day: 'Domingo', focus: 'Descanso total', muscles: [], emoji: '🔋' }
      ]
    },
    intermedio: {
      name: 'Fuerza · Intermedio',
      description: 'Programa 5/3/1 adaptado con trabajo accesorio para fuerza máxima.',
      schedule: [
        { day: 'Lunes', focus: 'Press Banca 5/3/1 + Accesorios Pecho', muscles: ['chest', 'triceps'], emoji: '🏋️' },
        { day: 'Martes', focus: 'Sentadilla 5/3/1 + Accesorios Pierna', muscles: ['legs', 'glutes'], emoji: '🦵' },
        { day: 'Miércoles', focus: 'Descanso / Movilidad', muscles: [], emoji: '🧘' },
        { day: 'Jueves', focus: 'Press Militar 5/3/1 + Hombros', muscles: ['shoulders', 'triceps'], emoji: '⚡' },
        { day: 'Viernes', focus: 'Peso Muerto 5/3/1 + Espalda', muscles: ['back', 'legs'], emoji: '🔥' },
        { day: 'Sábado', focus: 'Accesorios + Core', muscles: ['biceps', 'abs'], emoji: '💪' },
        { day: 'Domingo', focus: 'Descanso total', muscles: [], emoji: '🔋' }
      ]
    },
    avanzado: {
      name: 'Fuerza · Avanzado',
      description: 'Periodización ondulante para powerlifters con alta frecuencia de los grandes levantamientos.',
      schedule: [
        { day: 'Lunes', focus: 'Sentadilla pesada + Press Banca (fuerza)', muscles: ['legs', 'chest'], emoji: '🔥' },
        { day: 'Martes', focus: 'Peso Muerto + Press Militar', muscles: ['back', 'shoulders', 'legs'], emoji: '🏋️' },
        { day: 'Miércoles', focus: 'Sentadilla ligera + Accesorios', muscles: ['legs', 'abs'], emoji: '💪' },
        { day: 'Jueves', focus: 'Press Banca (volumen) + Tríceps', muscles: ['chest', 'triceps'], emoji: '⚡' },
        { day: 'Viernes', focus: 'Peso Muerto variante + Espalda', muscles: ['back', 'biceps'], emoji: '🔥' },
        { day: 'Sábado', focus: 'Hombros + Core intensivo', muscles: ['shoulders', 'abs'], emoji: '🦵' },
        { day: 'Domingo', focus: 'Descanso total', muscles: [], emoji: '🔋' }
      ]
    }
  }
};
