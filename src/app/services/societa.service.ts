import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  RegisterModelRequest,
  RegisterModelResponse,
  SessioneTipoUtenteModel,
  SocietaModelRequest
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

/** Service per il login e l'autenticazione */
@Injectable({
  providedIn: 'root',
})
export class SocietaService {
  baseUrl= environment.apiUrl;
  /** Ruolo dell'utente */
  userRole!: string;
  /** Subject per l'update della vista come profilo */
  updateGotoProfilo: Subject<void> = new Subject<void>();

  constructor(
    private panelService: PanelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) {}

  registerSocieta(payload: RegisterModelRequest): Observable<RegisterModelResponse> {
    return this.http.post<RegisterModelResponse>(this.baseUrl+'societa/registersocieta', payload);
  }

  getSocieta(idAnagrafica: number): Observable<SocietaModelRequest>{
    return this.http.get<SocietaModelRequest>(`${this.baseUrl}societa/readSocieta/${idAnagrafica}`);
  }

  getSocietaSessione(): any {
    if (localStorage.getItem('societa')) {
      return JSON.parse(localStorage?.getItem('societa') ?? '{}');
    }
  }

  updateSocieta(payload: any): Observable<any> {
 let c= localStorage.getItem('societa')
 let societa;
 if(c){
  societa=JSON.parse(c)
 }
 
    return this.http.patch<any>(`${this.baseUrl}societa/updatesocieta?id=${societa.idSocieta}`, payload);
  }
}