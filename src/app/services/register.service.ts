import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  RegisterModelRequest,
  RegisterModelResponse,
  SessioneTipoUtenteModel
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

/** Service per il login e l'autenticazione */
@Injectable({
  providedIn: 'root',
})
export class RegisterService {
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

  registerUser(payload: RegisterModelRequest): Observable<RegisterModelResponse> {
    return this.http.post<RegisterModelResponse>(this.baseUrl+'user/registeruser', payload);
  }
}