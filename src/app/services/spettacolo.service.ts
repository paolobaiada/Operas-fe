import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  SpettacoloModelRequest,
  SpettacoloModelResponse,
  SessioneTipoUtenteModel
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

/** Service per il login e l'autenticazione */
@Injectable({
  providedIn: 'root',
})
export class SpettacoloService {
  baseUrl= environment.apiUrl;
  /** Subject per l'update della vista come profilo */
  updateGotoProfilo: Subject<void> = new Subject<void>();

  constructor(
    private panelService: PanelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) {}

  getSpettacoli(): Observable<SpettacoloModelResponse[]> {
    return this.http.get<SpettacoloModelResponse[]>(this.baseUrl+'spettacolo/getSpettacoli');
  }

  getDettaglio(idSpettacolo: number): Observable<SpettacoloModelRequest>{
    return this.http.get<SpettacoloModelRequest>(`${this.baseUrl}spettacolo/getDettaglio/${idSpettacolo}`);
  }

  
  findBySocieta(): Observable<SpettacoloModelResponse[]> {
    let c =localStorage.getItem('societa')
    let societa;
    if(c){
      societa=JSON.parse(c)
    }
    return this.http.get<SpettacoloModelResponse[]>(`${this.baseUrl}spettacolo/readspettacoli/${societa.idSocieta}`)
  }

  deleteSpettacolo(id: number):Observable<any>{
    
   return this.http.delete<any>(`${this.baseUrl}spettacolo/deletespettacolo?idSpettacolo=${id}`)
  }

  insertSpettacolo(payload: SpettacoloModelRequest): Observable<SpettacoloModelResponse> {
   console.log(payload);
    return this.http.post<SpettacoloModelResponse>(this.baseUrl+'spettacolo/insertspettacolo', payload);
  }
  updateSpettacolo(id: number,payload: SpettacoloModelRequest): Observable<SpettacoloModelResponse>{
    return this.http.patch<SpettacoloModelRequest>(`${this.baseUrl}spettacolo/updatespettacolo/${id}`, payload)
  }

  getStats(id:number):Observable<Map<any,any>>{
    return this.http.get<Map<any,any>>(`${this.baseUrl}spettacolo/getData?id=${id}`)
  }

}