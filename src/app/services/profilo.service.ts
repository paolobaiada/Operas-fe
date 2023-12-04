import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfiloService {
  baseUrl= environment.apiUrl;

  constructor(private http: HttpClient) { }
  getUserProfileById(id : number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}user/readuser/${id}`);
  }
  findByUser(user: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}anagrafica/readanagrafica`);
  }
  
}
 