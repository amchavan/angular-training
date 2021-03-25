import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecordsService {

  info1: string[] = ["Adam", 'E100', 'adam@hotmail.net']
  info2: string[] = ["Eve", 'E101', 'eve@hotmail.net']
  info3: string[] = ["Abel", 'E102', 'abel@hotmail.net']

  getinfo1(): string[] {
    return this.info1
  }

  getinfo2(): string[] {
    return this.info2
  }

  getinfo3(): string[] {
    return this.info3
  }

  constructor() { }
}
