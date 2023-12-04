import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorageSubject = new BehaviorSubject<string | null>(null);

  constructor() {
    // Inizializza il valore del Subject con il valore corrente nel localStorage
    this.localStorageSubject.next(localStorage.getItem('savedImage'));
  }

  getLocalStorageObservable(): Observable<string | null> {
    return this.localStorageSubject.asObservable();
  }

  setItem(key: string, value: string): void {
    localStorage.setItem(key, value);
    this.localStorageSubject.next(value);
  }

  getItem(key: string): string | null {
    return localStorage.getItem(key);
  }
}
