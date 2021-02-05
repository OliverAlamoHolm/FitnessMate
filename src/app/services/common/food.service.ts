import { Injectable } from '@angular/core';

export interface Food{
  cuantity: number;
  name: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number;
}

export interface Meal{
  name: string,
  meal: Food[],
  hour: string,
  calories: number,
  protein: number,
  carbs: number,
  fat: number;
}

export interface Day{
  name: string,
  number: number,
  totalCals: number,
  totalProts: number,
  totalFat: number,
  totalCarbs: number,
  plan: Meal[]
}

export interface Diet{
  diet: Day[]
}

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  private data = [
    {
      category: 'Fruta y Frutos Secos',
      expanded: false,
      products: [
        {  name: 'Almendras',  calories: 589, protein: 19.1, carbs: 15, fat: 54.6 },
        {  name: 'Anacardos',  calories: 553, protein: 18.2, carbs: 30.2, fat: 43.9 },
        {  name: 'Arándano',  calories: 71, protein: 0.9, carbs: 18, fat: 0.4 },
        {  name: 'Avellanas',  calories: 628, protein: 14, carbs: 16, fat: 60 },
        {  name: 'Cacahuetes',  calories: 563, protein: 25, carbs: 7.9, fat: 46 },
        {  name: 'Cereza',  calories: 62, protein: 0.4, carbs: 13, fat:  0.2},
        {  name: 'Ciruela',  calories: 54, protein: 0.8, carbs: 14, fat: 0.2 },
        {  name: 'Frambuesa',  calories: 38, protein: 1.2, carbs: 14, fat: 0.5 },
        {  name: 'Fresa',  calories: 35, protein: 0.8, carbs: 5.5, fat: 0.4 },
        {  name: 'Higo',  calories: 70, protein: 1.2, carbs: 18, fat: 0.4 },
        {  name: 'Kiwi',  calories: 46, protein: 0.8, carbs: 11, fat: 0.4 },
        {  name: 'Mandarina',  calories: 44, protein: 0.6, carbs: 9.2, fat: 0.2 },
        {  name: 'Manzana',  calories: 55, protein: 0.3, carbs: 11.5, fat: 0.3 },
        {  name: 'Melocotón',  calories: 52, protein: 1, carbs: 10.2, fat: 0.2},
        {  name: 'Melón',  calories: 25, protein: 0.8, carbs: 6, fat: 0.1 },
        {  name: 'Mora',  calories: 39, protein: 0.8, carbs: 5.1, fat: 0.2 },
        {  name: 'Naranja',  calories: 48, protein: 0.8, carbs: 9, fat: 0.2 },
        {  name: 'Nueces',  calories: 654, protein: 15, carbs: 14, fat: 65 },
        {  name: 'Pera',  calories: 54, protein: 0.4, carbs: 117, fat:  0.1},
        {  name: 'Piña',  calories: 50.7, protein: 0.4, carbs: 10.4, fat: 0.4 },
        {  name: 'Pipas de Girasol',  calories: 574, protein: 27, carbs: 22, fat: 43 },
        {  name: 'Platano',  calories: 91, protein: 1, carbs: 21, fat: 0.3 },
        {  name: 'Sandia',  calories: 44, protein: 0.9, carbs: 11.4, fat: 0.2},
        {  name: 'Uva',  calories: 69, protein: 0.7, carbs: 18, fat: 0.2 },      
        {  name: 'Uvas Pasas',  calories: 263, protein: 2.5, carbs: 66, fat: 38 },
      ]
    },

    {
      category: 'Lácteos y huevos',
      expanded: false,
      products: [
        {  name: 'Actimel',  calories: 33, protein: 3, carbs: 3.6, fat: 0.4 },
        {  name: 'Clara de Huevo',  calories: 52, protein: 11, carbs: 0.7, fat: 0.2 },
        {  name: 'Huevo Cocido',  calories: 85, protein: 6.9, carbs: 0.6, fat: 5.8 },
        {  name: 'Huevo Frito',  calories: 90, protein: 6.3, carbs: 0.4, fat: 7 },
        {  name: 'Leche Entera',  calories: 52, protein: 3.1, carbs: 4.8, fat: 1.8 },
        {  name: 'Leche Semidesnatada',  calories: 48, protein: 3.5, carbs: 4.8, fat: 1.6 },
        {  name: 'Leche Desnatada',  calories: 37.5, protein: 3.9, carbs: 4.9, fat: 0.2 },
        {  name: 'Yogur Griego Natural',  calories: 91, protein: 1, carbs: 21, fat: 0.3 },
        {  name: 'Mantequilla',  calories: 746, protein: 0.5, carbs: 1.5, fat: 82 },
        {  name: 'Nata Montada',  calories: 331, protein: 2.1, carbs: 10.1, fat: 31.4 },
        {  name: 'Queso Cabra',  calories: 259, protein: 19, carbs: 3, fat: 12 },
        {  name: 'Queso Cheddar',  calories: 403, protein: 25, carbs: 1.3, fat: 33 },
        {  name: 'Queso Feta',  calories: 264, protein: 14.2, carbs: 4.1, fat: 21.3 },
        {  name: 'Queso Fresco Batido',  calories: 56, protein: 8, carbs: 3.5, fat: 0.1 },
        {  name: 'Queso Filadelfia',  calories: 240, protein: 5, carbs: 3, fat: 23 },
        {  name: 'Queso Gouda',  calories: 342, protein: 24, carbs: 0, fat: 27 },
        {  name: 'Queso Parmesano',  calories: 392, protein: 35.8, carbs: 3.2, fat: 25.8 },
        {  name: 'Requesón',  calories: 103, protein: 22.4, carbs: 2.7, fat: 4.5 },
        {  name: 'Yogur 0%',  calories: 43, protein: 5.4, carbs: 5.2, fat: 0.1 },
        {  name: 'Yogur de Frutas',  calories: 186, protein: 6.6, carbs: 30.1, fat: 4 },
        {  name: 'Yogur Natural',  calories: 63, protein: 5.3, carbs: 7, fat: 3.3 },
      ]
    },
    {
      category: 'Verdura y tubérculos',
      expanded: false,
      products: [ 
        {  name: 'Aguacate',  calories: 160, protein: 2, carbs: 1.9, fat: 14.7 },
        {  name: 'Ajo',  calories: 149, protein: 6.4, carbs: 33.1, fat: 0.5 },
        {  name: 'Alcachofa',  calories: 22, protein: 2.4, carbs: 2.6, fat: 0.2 },
        {  name: 'Apio',  calories: 16, protein: 0.7, carbs: 3, fat: 0.2 },
        {  name: 'Batata',  calories: 115, protein: 1.6, carbs: 24, fat: 0.6 },
        {  name: 'Berenjena',  calories: 35, protein: 0.8, carbs: 8.7, fat: 0.2 },
        {  name: 'Brocoli',  calories: 35, protein: 3.5, carbs: 3.1, fat: 0.4 },
        {  name: 'Calabaza',  calories: 26, protein: 1, carbs: 6.5, fat: 0.1 },
        {  name: 'Cebolla',  calories: 40, protein: 1.1, carbs: 9.3, fat: 0.1 },
        {  name: 'Champiñon',  calories: 22, protein: 3.1, carbs: 3.3, fat: 0.3 },
        {  name: 'Col',  calories: 25, protein: 1.3, carbs: 5.8, fat: 0.1 },
        {  name: 'Coles de Bruselas',  calories: 43, protein: 3.4, carbs: 8.9, fat: 0.3 },
        {  name: 'Coliflor',  calories: 25, protein: 2, carbs: 5.3, fat: 0.1 },
        {  name: 'Esparrago',  calories: 20, protein: 1.9, carbs: 3.7, fat: 0.2 },
        {  name: 'Espinaca',  calories: 20, protein: 1.9, carbs: 3.7, fat: 0.2 },
        {  name: 'Guisante',  calories: 88, protein: 5.2, carbs: 13.6, fat: 0.4 },
        {  name: 'Habichuela',  calories: 31, protein: 1.8, carbs: 7.1, fat: 0.1 },
        {  name: 'Jengibre',  calories: 69, protein: 1.7, carbs: 15.1, fat: 0.7 },
        {  name: 'Judia',  calories: 31, protein: 1.9, carbs: 4.2, fat: 0.4 },
        {  name: 'Lechuga',  calories: 15, protein: 1.4, carbs: 2.8, fat: 0.1 },
        {  name: 'Maíz',  calories: 450, protein: 12, carbs: 72, fat: 5 },
        {  name: 'Nabo',  calories: 26, protein: 0.8, carbs: 5, fat: 0.3 },
        {  name: 'Patata',  calories: 79, protein: 2.1, carbs: 18.1, fat: 0.1 },
        {  name: 'Pepino',  calories: 12, protein: 0.7, carbs: 1.9, fat: 0.2 },
        {  name: 'Pimiento',  calories: 19, protein: 0.9, carbs: 3.7, fat: 0 },
        {  name: 'Rábano',  calories: 16, protein: 0.7, carbs: 3.4, fat: 0.1 },
        {  name: 'Remolacha',  calories: 46, protein: 1.6, carbs: 8.4, fat: 0.1 },
        {  name: 'Zanahoria',  calories: 41, protein: 0.9, carbs: 9.6, fat: 0.2 },
      ]
    },

    {
      category: 'Carne Roja',
      expanded: false,
      products: [
        {  name: 'Carne de Cabra',  calories: 109, protein: 20.6, carbs: 0, fat: 2.3 },
        {  name: 'Carne de conejo',  calories: 173, protein: 33, carbs: 0, fat: 3.5 },
        {  name: 'Carne Molida de Ternera',  calories: 211, protein: 28.2, carbs: 0, fat: 9.6 },
        {  name: 'Carne Molida de Cerdo',  calories: 187, protein: 18, carbs: 0, fat: 12 },
        {  name: 'Chorizo',  calories: 455, protein: 24.1, carbs: 1.9, fat: 38.3 },
        {  name: 'Chuleta de Cerdo',  calories: 231, protein: 24, carbs: 0, fat: 14 },
        {  name: 'Chuleta de Ternera',  calories: 110, protein: 20.2, carbs: 0, fat: 2.6 },
        {  name: 'Cordero',  calories: 294, protein: 25, carbs: 0, fat: 21 },
        {  name: 'Costillas de Ternera',  calories: 162, protein: 18.9, carbs: 0, fat: 9 },
        {  name: 'Costillas de Cerdo',  calories: 281, protein: 17, carbs: 0, fat: 23.6 },
        {  name: 'Entrecot',  calories: 208, protein: 28.9, carbs: 0, fat: 9 },
        {  name: 'Fiambre de Cerdo',  calories: 334, protein: 12.5, carbs: 2.1, fat: 30.3 },
        {  name: 'Hamburguesa de Ternera',  calories: 194, protein: 17, carbs: 0.4, fat: 14 },
        {  name: 'Lomo de Cerdo',  calories: 194, protein: 30, carbs: 0.3, fat: 14.7 },
        {  name: 'Lomo de Ternera',  calories: 175, protein: 26.3, carbs: 0, fat: 6.9 },
        {  name: 'Morcilla',  calories: 446, protein: 19.5, carbs: 1.3, fat: 39.5 },
        {  name: 'Mortadela',  calories: 311, protein: 16.4, carbs: 3, fat: 25.4 },
        {  name: 'Pata Asada',  calories: 217, protein: 30.6, carbs: 0.1, fat: 10.5 },
        {  name: 'Paté',  calories: 220, protein: 9, carbs: 0, fat: 20 },
        {  name: 'RoastBeef',  calories:130 , protein: 24, carbs: 1, fat: 3 },
        {  name: 'Salami',  calories: 445, protein: 15, carbs: 3, fat: 41 },
        {  name: 'Salchichón',  calories: 260, protein: 15.4, carbs: 1.6, fat: 20.9 },
        {  name: 'Solomillo de Cerdo',  calories: 131, protein: 21, carbs: 0, fat: 5.1 },
        {  name: 'Solomillo de Ternera',  calories: 108, protein: 20.2, carbs: 0, fat: 3.1 },
      ]
    },

    {
      category: 'Pescado y Marisco',
      expanded: false,
      products: [
        {  name: 'Almejas',  calories: 148, protein: 25.6, carbs: 5.1, fat: 1.9 },
        {  name: 'Arenque Ahumado',  calories: 177, protein: 16.4, carbs: 0, fat: 11.9 },
        {  name: 'Atún',  calories: 184, protein: 29.9, carbs: 0, fat: 6.3 },
        {  name: 'Atún en Conserva',  calories: 198, protein: 29.1, carbs: 0, fat: 8.2 },
        {  name: 'Bacalao',  calories: 250, protein: 17.2, carbs: 0, fat: 19.6 },
        {  name: 'Caballa en Conserva',  calories: 324, protein: 18.9, carbs: 0, fat: 28 },
        {  name: 'Caviar',  calories: 252, protein: 24.6, carbs: 4, fat: 17.9 },
        {  name: 'Croquetas de Pescado',  calories: 84, protein: 9.1, carbs: 7.4, fat: 1.7 },
        {  name: 'Calamares Fritos',  calories: 175, protein: 17.9, carbs: 7.8, fat: 7.5 },
        {  name: 'Camarones',  calories: 114, protein: 24.7, carbs: 0, fat: 1.7 },
        {  name: 'Cangrejo de Rio',  calories: 87, protein: 17.5, carbs: 0, fat: 1.3 },
        {  name: 'Gambas Fritas',  calories: 242, protein: 21.4, carbs: 11.5, fat: 12.3 },
        {  name: 'Langosta',  calories: 98, protein: 20.5, carbs: 1.3, fat: 0.6 },
        {  name: 'Lenguado',  calories: 117, protein: 24.2, carbs: 0, fat: 1.5 },
        {  name: 'Lubina',  calories: 124, protein: 23.6, carbs: 0, fat: 2.6 },
        {  name: 'Mejillones',  calories: 48, protein: 5.7, carbs: 1.3, fat: 2 },
        {  name: 'Ostras',  calories: 79, protein: 7, carbs: 7.3, fat: 2.1 },
        {  name: 'Palitos de Cangrejo',  calories: 101, protein: 8.3, carbs: 11.4, fat: 2.1 }, 
        {  name: 'Palitos de Pescado',  calories: 249, protein: 11, carbs: 22.1, fat: 13.3 },    
        {  name: 'Perca',  calories: 117, protein: 24.9, carbs: 0, fat: 1.2 },
        {  name: 'Rape',  calories: 97, protein: 18.6, carbs: 0, fat: 1.9 },
        {  name: 'Salmón',  calories: 206, protein: 22.1, carbs: 0, fat: 12.3 },
        {  name: 'Salmon Ahumado',  calories: 117, protein: 18.3, carbs: 0, fat: 4.3 },
        {  name: 'Sardina',  calories: 203, protein: 23, carbs: 0, fat: 11.6 },
        {  name: 'Sardina en Conserva',  calories: 208, protein: 24.6, carbs: 0, fat: 11.4 },
        {  name: 'Trucha',  calories: 133, protein: 21.5, carbs: 0, fat: 4.6 },
        {  name: 'Vieiras',  calories: 112, protein: 23.2, carbs: 0, fat: 1.4 },
      ]
    },
    {
      category: 'Pizza',
      expanded: false,
      products: [
        {  name: 'Pizza 4 Quesos',  calories: 303, protein: 12.8, carbs: 31.5, fat: 13.6 },
        {  name: 'Pizza 4 Estaciones',  calories: 239, protein: 9.8, carbs: 21.7, fat: 12.5 },
        {  name: 'Pizza Barbacoa',  calories: 259, protein: 10, carbs: 29, fat: 11 },
        {  name: 'Pizza Bombay',  calories: 308, protein: 15.3, carbs: 29.3, fat: 13.5 },
        {  name: 'Pizza Calzone',  calories: 253, protein: 10.1, carbs: 35.5, fat: 7.8 },
        {  name: 'Pizza Campesina',  calories: 317, protein: 11.4, carbs: 37, fat: 13.7 },
        {  name: 'Pizza de Atun',  calories: 262, protein: 11, carbs: 22, fat: 14 },
        {  name: 'Pizza de Jamon',  calories: 196, protein: 9, carbs: 21.2, fat: 8 },
        {  name: 'Pizza Hawai',  calories: 198, protein: 7.5, carbs: 26, fat: 6 }, 
        {  name: 'Pizza Jamon y queso',  calories: 224, protein: 14, carbs: 25.2, fat: 7.5 },
        {  name: 'Pizza Kebab',  calories: 210, protein: 8.2, carbs: 28, fat: 6.8 },
        {  name: 'Pizza Marinara',  calories: 270, protein: 7.5, carbs: 53.7, fat: 2.3 },
        {  name: 'Pizza Margarita',  calories: 220, protein: 6.7, carbs: 31.3, fat: 6.7 },
        {  name: 'Pizza Milano',  calories: 221, protein: 11.3, carbs: 22.2, fat: 9.1 },
        {  name: 'Pizza Napolitana',  calories: 216, protein: 11, carbs: 24, fat: 8 },
        {  name: 'Pizza Tex-Mex',  calories: 225, protein: 9.5, carbs: 27.5, fat: 8 },
        {  name: 'Pizza Toscana',  calories: 204, protein: 9.3, carbs: 22.3, fat: 8.2 },
        {  name: 'Pizza Vegetal',  calories: 144, protein: 5.7, carbs: 14.8, fat: 6.9 },
      ]
    },

    {
      category: 'Arroz, Pasta y Cereales',
      expanded: false,
      products: [
        {  name: 'Arroz Blanco',  calories: 349, protein: 6.9, carbs: 78.2, fat: 0.6 },
        {  name: 'Arroz integral',  calories: 124, protein: 4.9, carbs: 26.7, fat: 3.8 },
        {  name: 'Avena',  calories: 371, protein: 13, carbs: 58, fat: 7 },
        {  name: 'Bulgur',  calories: 353, protein: 12.3, carbs: 68.2, fat: 1.3 },
        {  name: 'Cebada',  calories: 354, protein: 12.5, carbs: 73.5, fat: 2.3 },
        {  name: 'Copos de amaranto',  calories: 353, protein: 15.5, carbs: 71.2, fat: 7 },
        {  name: 'Copos de maíz',  calories: 399, protein: 7.7, carbs: 88.8, fat: 0.3 },
        {  name: 'Cuscus',  calories: 112, protein: 3.8, carbs: 23.2, fat: 0.2 },
        {  name: 'Espaguetis',  calories: 343, protein: 13, carbs: 67, fat: 2.7 },
        {  name: 'Fideos de arroz',  calories: 109, protein: 0.9, carbs: 24.9, fat: 0.2 },
        {  name: 'Macarrones',  calories: 354, protein: 13, carbs: 71, fat: 1.5 },
        {  name: 'Muesli',  calories: 489, protein: 14.8, carbs: 53.3, fat: 24.1 },
        {  name: 'Pasta integral',  calories: 346, protein: 12, carbs: 66, fat: 2 },
        {  name: 'Quinoa',  calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
        {  name: 'Ravioli',  calories: 254, protein: 32.8, carbs: 29.5, fat: 5.5 },
        {  name: 'Soja texturizada',  calories: 311, protein: 50, carbs: 25, fat: 7 },
        {  name: 'Tortitas de arroz',  calories: 324, protein: 8.4, carbs: 77.5, fat: 3.4 },
        {  name: 'Tortelini de Carne',  calories: 387, protein: 12.5, carbs: 65, fat: 8 },
        {  name: 'Tortelini de Espinacas',  calories: 400, protein: 12.2, carbs: 62.9, fat: 10.2 },
      ]
    },

    {
      category: 'Bebidas',
      expanded: false,
      products: [
        {  name: 'Batido de sabores',  calories: 114, protein: 2.4, carbs: 20.3, fat: 2.6},
        {  name: 'Bebida energética',  calories: 45, protein: 0.3, carbs: 10.9, fat: 0.1},
        {  name: 'Cafe con leche',  calories: 30, protein: 2, carbs: 3, fat: 1},
        {  name: 'Cafe de filtro',  calories: 1, protein: 0.1, carbs: 0, fat: 0},
        {  name: 'Cafe expresso',  calories: 3, protein: 0.1, carbs: 0, fat: 0.2},
        {  name: 'Cappuccino',  calories: 25, protein: 2, carbs: 2.4, fat: 1},
        {  name: 'Cerveza',  calories: 47, protein: 0.5, carbs: 4.1, fat: 0},
        {  name: 'Cerveza light',  calories: 29, protein: 0.2, carbs: 1.6, fat: 0},
        {  name: 'Chocolate con leche',  calories: 96, protein: 3.6, carbs: 13.4, fat: 3.6},
        {  name: 'Coca Cola',  calories: 44, protein: 0, carbs: 11, fat: 0},
        {  name: 'Fanta Naranja',  calories: 49, protein: 1, carbs: 12.5, fat: 0},
        {  name: 'Infusiones',  calories: 2, protein: 0, carbs: 0.3, fat: 0},
        {  name: 'Limonada sin azucar',  calories: 3, protein: 0, carbs: 0.7, fat: 0},
        {  name: 'Refresco Light/Zero',  calories: 0, protein: 0, carbs: 0, fat: 0},
        {  name: 'Ron',  calories: 179, protein: 0, carbs: 8.8, fat: 0},
        {  name: 'Te',  calories: 2, protein: 0, carbs: 0.4, fat: 0},
        {  name: 'Vino blanco',  calories: 70, protein: 0, carbs: 0.7, fat: 0},
        {  name: 'Vino tinto',  calories: 80, protein: 0, carbs: 2, fat: 0},
        {  name: 'Vodka',  calories: 209, protein: 0, carbs: 8.8, fat: 0},
        {  name: 'Whisky',  calories: 207, protein: 0, carbs: 9.8, fat: 0},
        {  name: 'Zumo de naranja',  calories: 46, protein: 0.8, carbs: 10.6, fat: 0.3},
      ]
    },

    {
      category: 'Pan y pasteles',
      expanded: false,
      products: [
        {  name: 'Baguette',  calories: 235, protein: 7.3, carbs: 49.7, fat: 0.6 },
        {  name: 'Flan de Huevo',  calories: 144, protein: 4.9, carbs: 23.8, fat: 3.2 },
        {  name: 'Galletas digestivas',  calories: 431, protein: 6.9, carbs: 66.9, fat: 16.9 },
        {  name: 'Galletas Maria',  calories: 440, protein: 9.8, carbs: 74.2, fat: 11.9 },
        {  name: 'Magdalena',  calories: 443, protein: 6, carbs: 55.5, fat: 21.9 },
        {  name: 'Pan Bimbo Molde',  calories: 250, protein: 9.9, carbs: 36.7, fat: 2.7 },
        {  name: 'Pastel de arroz',  calories: 392, protein: 7.1, carbs: 81.1, fat: 4.3 },
        {  name: 'Pan de avena',  calories: 269, protein: 8.4, carbs: 48.5, fat: 4.4 },
        {  name: 'Pastel de frutas',  calories: 324, protein: 2.9, carbs: 61.9, fat: 9.1 },
        {  name: 'Pan de hamburguesa',  calories: 271, protein: 10, carbs: 45.3, fat: 4.5 },
        {  name: 'Pastel de manzana',  calories: 298, protein: 2.4, carbs: 34.5, fat: 16.8 },
        {  name: 'Pan de leche',  calories: 326, protein: 10.1, carbs: 51.5, fat: 8.6 },
        {  name: 'Pan de molde integral',  calories: 274, protein: 10.4, carbs: 50.2, fat: 3.6 },
        {  name: 'Pan de sesamo',  calories: 266, protein: 8.4, carbs: 58.9, fat: 2.5 },
        {  name: 'Pan de trigo',  calories: 266, protein: 10.9, carbs: 47.5, fat: 3.6 },
        {  name: 'Pan de pita',  calories: 275, protein: 9.1, carbs: 55.7, fat: 1.2 },
        {  name: 'Torrija',  calories: 213, protein: 7.4, carbs: 32.1, fat: 6.1 },
        {  name: 'Tortas de arroz',  calories: 387, protein: 8, carbs: 84, fat: 1.3 },
        {  name: 'Tortas de maiz',  calories: 391, protein: 7.7, carbs: 85.5, fat: 1.5 },  
      ]
    },

    {
      category: 'Preparados',
      expanded: false,
      products: [
        {  name: 'Leche',  calories: 55, protein: 0.3, carbs: 11.5, fat: 0.3 },
        {  name: 'Yogur Griego Natural',  calories: 91, protein: 1, carbs: 21, fat: 0.3 },
        
      ]
    }
  ]

  constructor() { }

  getFood() {
    return this.data;

  }
}
