import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  AnagraficaModelRequest,
  AnagraficaModelResponse,
  LoginModelResponse,
  RegisterModelRequest,
  RegisterModelResponse,
  SessioneTipoUtenteModel,
  SessioneUtenteModel
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

/** Service per il login e l'autenticazione */
@Injectable({
  providedIn: 'root',
})
export class AnagraficaService {
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

  registerAnagrafica(payload: RegisterModelRequest): Observable<RegisterModelResponse> {
    return this.http.post<RegisterModelResponse>(this.baseUrl+'anagrafica/registeranagrafica', payload);
  }

  getAnagrafica(id: number): Observable<AnagraficaModelRequest>{
    return this.http.get<AnagraficaModelRequest>(`${this.baseUrl}anagrafica/readAnagrafica/${id}`);
  }

  getAnagraficaSessione(): any {
    if (localStorage.getItem('anagrafica')) {
      return JSON.parse(localStorage?.getItem('anagrafica') ?? '{}');
    }
  }

  updateAnagrafica(payload: any, idAnagrafica : number): Observable<any> {
    return this.http.patch<any>(`${this.baseUrl}anagrafica/updateanagrafica/${idAnagrafica}`, payload);
  }
}