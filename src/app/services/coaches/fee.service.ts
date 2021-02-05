import { Injectable } from '@angular/core';

export interface Member{
  uid: string;
  name: string;
  avatar: string;
}
export interface Fee{
  name: string;
  description: string;
  price: number;
  members: string[];
}

@Injectable({
  providedIn: 'root'
})
export class FeeService {

  constructor() { }
}
