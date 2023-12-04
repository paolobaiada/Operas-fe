import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

/** Service per il modulo degli utenti, conterrà al suo interno tutte le funzionalità collegate agli utenti  */
@Injectable({ providedIn: 'root' })
export class UtentiService {

  baseUrl= environment.apiUrl;

  /**
   * Il costruttore della classe
   * @param {HttpClient} http Il metodo HTTP utilizzato per la richiesta (GET, POST, PUT, PATCH, DELETE).
   */
  constructor(private http: HttpClient) {}

  /**
   * Il resolver viene utilizzato per effettuare una chiamata prima dell'inizializzazione del costruttore di una componente
   * Questa chiamata parte quindi al cambio della rotta, mantenendo i dati al suo interno
   * @returns {Observable<any>}
   */
  resolveListaUtenti(): Observable<any> | undefined {
    return this.getListaUtenti(25, 0).pipe(
      catchError((error) => {
        return of('No data');
      })
    );
  }

  /**
   * Esegue la get paginata della lista utenti
   * @param {number} pageSize La linghezza della lista che ci verrà tornata
   * @param {number} pageNumber Il numero della pagina che vogliamo visualizzare
   * @param {any} args Un parametro non obbligatorio che ci servirà nel caso in cui dovesse avvenire un filtraggio all'interno della lista
   * @returns {Observable<any>}
   */
  getListaUtenti(
    pageSize: number,
    pageNumber: number,
    ...args: any
  ): Observable<any> {
    let url = `${this.baseUrl}user/getAllPaginata?pageSize=${pageSize}&pageNumber=${pageNumber}`;
    // Si esegue un forEach degli argomenti ricevuti e ottenendo la chiave valore dell'argomento ricevuto viene inserito all'interno dell'url
    args.forEach((x: any) => {
      if (x) {
        for (const [key, value] of Object.entries(x)) {
          url = url + `&${key}=${value}`;
        }
      }
    });
    return this.http.get<any>(url);
  }

  eliminaProfilo(id: number) : Observable<any>{
    return this.http.delete<any>(`${this.baseUrl}user/delete/${id}`).pipe(
      catchError(error =>{
        console.error('Si è verificato un errore', error);
        return throwError(error)
      })
    )
  }

  updateUser(payload: any, id : number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}user/updateuser/${id}`, payload);
  }
}
