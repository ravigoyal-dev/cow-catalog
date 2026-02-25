import { Injectable } from '@angular/core';
import { Cow } from './cow.model';

@Injectable({ providedIn: 'root' })
export class CowService {
  private cows: Cow[] = [];

  constructor() {
    this.loadFromStorage();
  }

  getCows(): Cow[] {
  return [...this.cows];
}

  addCow(cow: Cow) {
    this.cows.push(cow);
    this.saveToStorage();
  }

  findCow(tag: string): Cow | undefined {
    return this.cows.find(c => c.tag === tag);
  }

  private saveToStorage() {
    localStorage.setItem('cows', JSON.stringify(this.cows));
  }

private loadFromStorage() {
  const data = localStorage.getItem('cows');
  if (data) {
    this.cows = JSON.parse(data).map((c: any) => ({
      ...c,
      lastEventDate: new Date(c.lastEventDate),
      events: c.events?.map((e: any) => ({
        ...e,
        date: new Date(e.date)
      }))
    }));
  }
}
}