import { Injectable } from '@angular/core';

export interface Exercise{
  name: string;
  series: number;
  reps: number;
  notes: string,
}

export interface Day2{
  name: string;
  number: number;
  muscles: string;
  plan: Exercise[];
}

export interface Routine{
  week: Day2[];
}

@Injectable({
  providedIn: 'root'
})

export class ExerciseService {
  
  private data = [
    {
      category: 'Antebrazo',
      expanded: false,
      exercises: [
        {name:'Curl con agarre supino', picture:'./assets/exercises/Antebrazos/Curl con agarre supino.gif'},
        {name:'Flexiones de muñeca palma arriba', picture:'./assets/exercises/Antebrazos/Flexiones de muñeca palma arriba.gif'},
        {name:'Flexiones de muñeca palma abajo', picture:'./assets/exercises/Antebrazos/Flexiones de muñeca palma abajo.gif'},
        ]
    },

    {
      category: 'Biceps',
      expanded: false,
      exercises: [
        {  name: 'Curl barra en banco Scott',   picture: './assets/exercises/Biceps/Curl barra en banco Scott.gif'},
        {  name: 'Curl barra z o recta',   picture: './assets/exercises/Biceps/Curl barra z o recta.gif'},
        {  name: 'Curl biceps en polea',   picture: './assets/exercises/Biceps/Curl biceps alterno en polea.gif'},
        {  name: 'Curl concentrado con mancuernas',   picture: './assets/exercises/Biceps/Curl concentrado con mancuernas.gif'},
        {  name: 'Curl de biceps barra apoyado en banco inclinado',   picture: './assets/exercises/Biceps/Curl de biceps barra apoyado en banco inclinado.gif'},
        {  name: 'Curl de biceps mancuernas alterno',   picture: './assets/exercises/Biceps/Curl de biceps mancuernas alterno.gif'},
        {  name: 'Curl de biceps sentado alterno con mancuernas',   picture: './assets/exercises/Biceps/Curl de biceps sentado alterno con mancuernas.gif'},
        {  name: 'Curl mancuernas en banco Scott a una mano',   picture: './assets/exercises/Biceps/Curl mancuernas en banco Scott a una mano.gif'},
        {  name: 'Dominadas agarre neutro',   picture: './assets/exercises/Biceps/Dominadas agarre neutro.gif'},
        {  name: 'Martillo con mancuernas',   picture: './assets/exercises/Biceps/Martillo con mancuernas.gif'}
      ]
    },

    {
      category: 'Cuadriceps',
      expanded: false,
      exercises: [
        {name:'Extensión de piernas', picture:'./assets/exercises/Cuadriceps/Extensión de piernas.gif'},
        {name:'Salto a caja', picture:'./assets/exercises/Cuadriceps/Salto a caja.gif'},
        {name:'Sentadillas', picture:'./assets/exercises/Cuadriceps/Sentadillas.gif'},
        {name:'Sentadilla Frontal', picture:'./assets/exercises/Cuadriceps/Sentadilla Frontal.gif'},
        {name:'Sentadilla Isométrica', picture:'./assets/exercises/Cuadriceps/Sentadilla Isométrica.gif'},
        {name:'Press de pierna', picture:'./assets/exercises/Cuadriceps/Press de pierna.gif'},
        {name:'Zancadas', picture:'./assets/exercises/Cuadriceps/Zancadas.gif'},
        ] 
    },

    {
      category: 'Espalda',
      expanded: false,
      exercises: [
        {  name: 'Dominadas', picture: './assets/exercises/Espalda/Dominadas.gif'},
        {  name: 'Hiperextension',   picture: './assets/exercises/Espalda/Hiperextension.gif'},
        {  name: 'Jalones al pecho',  picture: './assets/exercises/Espalda/Jalon al pecho.gif'},
        {  name: 'Jalones al pecho con agarre supino',  picture: './assets/exercises/Espalda/Jalon al pecho agarre supino.gif'},
        {  name: 'Jalon tras nuca',   picture: './assets/exercises/Espalda/Jalon trasnuca.gif'},
        {  name: 'Jalon con agarre cerrado',   picture: './assets/exercises/Espalda/Jalon con agarre cerrado.gif'},
        {  name: 'Pullover', picture: './assets/exercises/Espalda/Pullover.gif'},
        {  name: 'Pullover en polea alta',   picture: './assets/exercises/Espalda/Pullover en polea alta.gif'},
        {  name: 'Remo a una mano',   picture: './assets/exercises/Espalda/Remo a una mano.gif'},
        {  name: 'Remo a una mano en polea alta',   picture: './assets/exercises/Espalda/Remo a una mano en polea.gif'},
        {  name: 'Remo con agarre supino',   picture: './assets/exercises/Espalda/Remo con agarre supino.gif'},
        {  name: 'Remo con barra',   picture: './assets/exercises/Espalda/Remo con barra.gif'},
        {  name: 'Remo en barra T',   picture: './assets/exercises/Espalda/Remo con barra en t.gif'},
        {  name: 'Remo en maquina',   picture: './assets/exercises/Espalda/Remo en maquina.gif'},
        {  name: 'Remo en polea baja',   picture: './assets/exercises/Espalda/Remo en polea baja.gif'},
        {  name: 'Remo invertido',   picture: './assets/exercises/Espalda/Remo invertido.gif'},
        {  name: 'Superman',   picture: './assets/exercises/Espalda/Superman.gif'},
        
      ]
    },

    {
      category: 'Femoral',
      expanded: false,
      exercises: [
        {name:'Curl femoral a una pierna', picture:'./assets/exercises/Femoral/Curl femoral a una pierna.gif'},
        {name:'Curl femoral tumbado', picture:'./assets/exercises/Femoral/Curl femoral tumbado.gif'},
        {name:'Donkey Kicks', picture:'./assets/exercises/Femoral/Donkey Kicks.gif'},
        {name:'Hip Thrust', picture:'./assets/exercises/Femoral/Hip Thrust.gif'},
        {name:'Peso muerto rumano', picture:'./assets/exercises/Femoral/Peso muerto rumano.gif'},
        {name:'Smith buenos dias', picture:'./assets/exercises/Femoral/Smith buenos dias .gif'},
        ]
    },

    {
      category: 'Gemelos',
      expanded: false,
      exercises: [
        {name:'Elevación de talón', picture:''},
        {name:'Elevación de talones', picture:''},
        {name:'Elevacion de talones burro', picture:''},
        {name:'Elevación de talones sentado', picture:''},
        {name:'Prensa de gemelos', picture:''},
        ]
    },

    {
      category: 'Hombros',
      expanded: false,
      exercises: [
        {  name: 'Elevaciones de deltoide posterior',   picture: './assets/exercises/Hombros/Elevaciones deltoide posterior.gif'},
        {  name: 'Elevaciones frontales con mancuernas',   picture: './assets/exercises/Hombros/Elevaciones frontales con mancuernas.gif'},
        {  name: 'Elevaciones laterales con mancuerna', picture:'./assets/exercises/Hombros/Elevaciones laterales con mancuernas.gif'},
        {  name: 'Elevaciones laterales en polea',   picture: './assets/exercises/Hombros/Elevaciones laterales en polea.gif'},
        {  name: 'Espantapájaros con mancuernas',   picture: './assets/exercises/Hombros/Espantapajaros.gif'},
        {  name: 'Press Arnold',   picture: './assets/exercises/Hombros/Press arnold.gif'},
        {  name: 'Press militar con barra', picture:'./assets/exercises/Hombros/Press militar con barra.gif'},
        {  name: 'Press militar con mancuernas', picture:'./assets/exercises/Hombros/Press militar con mancuernas.gif'},
        {  name: 'Remo vertical',   picture: './assets/exercises/Hombros/Remada vertical.gif'},
        {  name: 'Rotacion interna con polea',   picture: './assets/exercises/Hombros/Rotacion interna.gif'},
        ]
    },

    {
      category: 'Lumbares',
      expanded: false,
      exercises: [
        {name:'Hiperxetensiones', picture:'./assets/exercises/Lumbares/Hiperextenstiones.gif'},
        {name:'Hip Thrust', picture:'./assets/exercises/Lumbares/Hip Thrust.gif'},
        {name:'Peso muerto', picture:'./assets/exercises/Lumbares/Peso Muerto.gif'},
        
        ]
    },
    {
      category: 'Pecho',
      expanded: false,
      exercises: [
        {  name: 'Aperturas en banco plano', picture: './assets/exercises/Pecho/Aperturas en banco plano con mancuernas.gif'},
        {  name: 'Aperturas en banco inclinado', picture: './assets/exercises/Pecho/Aperturas en banco inclinado.gif'},
        {  name: 'Aperturas en banco declinado', picture: './assets/exercises/Pecho/Aperturas en banco declinado.gif'},
        {  name: 'Cruce de poleas', picture: './assets/exercises/Pecho/Cruce de poleas hacia abajo.gif'},
        {  name: 'Flexiones en suelo', picture: './assets/exercises/Pecho/Flexiones en suelo.gif'},
        {  name: 'Fondos', picture: './assets/exercises/Pecho/Fondos.gif'},
        {  name: 'Press de banca con mancuernas', picture: './assets/exercises/Pecho/Press de banca con mancuernas.gif'},
        {  name: 'Press de banca declinado', picture: './assets/exercises/Pecho/Press de banca declinado.gif'},
        {  name: 'Press de banca declinado con mancuernas', picture: './assets/exercises/Pecho/Press de banca declinado.gif'},
        {  name: 'Press de banca', picture: './assets/exercises/Pecho/Press de banca.gif'},
        {  name: 'Press inclinado barra', picture: './assets/exercises/Pecho/Press inclinado barra.gif'},
        {  name: 'Press inclinado mancuernas', picture: './assets/exercises/Pecho/Press inclinado mancuernas.gif'},
        {  name: 'Pullover con barra', picture: './assets/exercises/Pecho/Pullover barra .gif'},
        {  name: 'Pullover', picture: './assets/exercises/Pecho/Pullover en polea.gif'},
      ]
    },
    {
      category: 'Triceps',
      expanded: false,
      exercises: [
        {name:'Extension de triceps con mancuerna', picture:'./assets/exercises/Triceps/Extension de triceps con mancuerna.gif'},
        {name:'Extension de triceps con mancuerna a una mano', picture:'./assets/exercises/Triceps/extension.gif'},
        {name:'Extension de triceps con polea a una mano', picture:'./assets/exercises/Triceps/Extension de triceps con polea a una mano.gif'},
        {name:'Extensión de codos', picture:'./assets/exercises/Triceps/Extension de codos.gif'},
        {name:'Flexiones con manos juntas', picture:''},
        {name:'Fondos agarre estrecho', picture:''},
        {name:'KickBacks', picture:'./assets/exercises/Triceps/Kickbacks.gif'},
        {name:'Press frances', picture:'./assets/exercises/Triceps/Press frances.gif'},
        {name:'Press frances agarre martillo', picture:''},
        {name:'Press de triceps', picture:''},
        {name:'Triceps en polea superior a una mano', picture:''},
        {name:'Triceps en polea superior con barra', picture:''},
        {name:'Triceps en polea superior con barra supina', picture:''},
        {name:'Triceps en polea superior con cuerda', picture:''},
       ]
    },
    
    {
      category: 'Cardio Estático',
      expanded: false,
      exercises: [
        {name:'Correr en cinta', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Bici estática', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Elíptica', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Remo estático', picture:'https://reygif.com/media/press-banca-15806.gif'},
        
        ]
    },
    {
      category: 'Cardio',
      expanded: false,
      exercises: [
        {name:'Caminar', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Correr', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Sprint', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Ciclismo', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Natación', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Senderismo', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Escalada', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Aquarobic', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Boxeo', picture:'https://reygif.com/media/press-banca-15806.gif'},
        
        ]
    },
    {
      category: 'Multimusculares',
      expanded: false,
      exercises: [
        {name:'Burpees', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Salto a caja', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Sentadillas barra sobre cabeza', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Sentadillas a una pierna', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Muscle Ups', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Cluster', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Fondos en anilla', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Cargada', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Snatch', picture:'https://reygif.com/media/press-banca-15806.gif'},
        {name:'Escalada en cuerda', picture:'https://reygif.com/media/press-banca-15806.gif'},
        ]
    },

    {
      category: 'Descanzo',
      expanded: false,
      exercises: [
        {  name: 'Descanzo',   picture: 'https://reygif.com/media/press-banca-15806.gif'},
      ]
    },
  ]

  constructor() { }

  getExercises() {
    return this.data;
  }
}
