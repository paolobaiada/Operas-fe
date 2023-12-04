import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  LoginModelRequest,
  LoginModelResponse,
  SessioneUtenteModel
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

/** Service per il login e l'autenticazione */
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl= environment.apiUrl;
  /** Ruolo dell'utente */
  userRole!: string;
  /** Subject per l'update del nome utente */
  updateNominativoUtente: Subject<SessioneUtenteModel> =
    new Subject<SessioneUtenteModel>();
  /** Subject per l'update della vista come profilo */
  updateGotoProfilo: Subject<void> = new Subject<void>();

  /**
   * Il costruttore del service
   * @param {PanelService} panelService L'injectable del service PanelService
   * @param {ActivatedRoute} activatedRoute Fornisce accesso alle informazioni sulla rotta attuale
   * @param {MatDialog} dialog L'injectable del service per aprire la modale
   * @param {HttpClient} http L'injectable del service HttpClient
   * @param {Router} router L'injectable del service router per la navigazione tra viste e url
   */
  constructor(
    private panelService: PanelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) {}

  /**
   * Effettua l'accesso all'applicazione
   *
   * @param {LoginModelRequest} payload body inviato nella richiesta con email, password e remember me
   * @returns {Observable<LoginModelResponse>}
   */
  login(payload: LoginModelRequest): Observable<LoginModelResponse> {
    this.clearStorage();
    return this.http.post<LoginModelResponse>(this.baseUrl+'user/login', payload);
  }

  /** Effettua il logout dall'applicazione */
  logout(): void {
      this.clearStorage();
      this.goToLogin();
  }

  /**
   * Salva l'utente loggato  nel sessionStoage o nel localStorage
   *
   * @param {string} nome il nome dell'utente loggato da salvare nel localStorage
   * @param {string} cognome il cognome dell'utente loggato da salvare nel localStorage
   * @param {string} usertype il tipo dell'utente loggato da salvare nel localStorage
   */
  setUtenteSession(id: any, email: string, password: string, usertype: string): void {
    const userSession = { id, email, password, usertype };
    localStorage.setItem(
      'userSession',
      JSON.stringify(userSession)
    );
    this.updateNominativoUtente.next(userSession);
    localStorage.setItem('loggato', 'true');
    sessionStorage.setItem('id', id);
  }

  /**
   * Ritorna un observable all'update nominativo utente
   *
   * @returns {Observable<LoginModelResponse>}
   */
  updateNominativoUtenteListener(): Observable<SessioneUtenteModel> {
    return this.updateNominativoUtente.pipe();
  }

  /** Richiede l'utente loggato nel localStorage o nel sessionStoage */
  getUtenteSessione(): any {
    if (localStorage.getItem('userSession')) {
      return JSON.parse(localStorage?.getItem('userSession') ?? '{}');
    }
  }

  /** Esegue il clear del localStorage e del sessionStorage */
  clearStorage(): void {
    localStorage.clear();
    sessionStorage.clear();
  }

  /** Naviga all'url del login */
  goToLogin(): void {
    this.dialog.closeAll();
    if (this.panelService.componentRef) {
      this.panelService.close();
    }
    if (this.panelService.parentComponentRef) {
      this.panelService.parentComponentRef.instance.closeDialog();
    }
    this.router.navigateByUrl('/login/login');
  }

  /**
   * Ritorna se l'utente connesso è ADMIN
   * @returns {boolean} Se è ADMIN
   */
  isAdmin(): boolean {
    if (localStorage.getItem('userSession')) {
      let utenteSession : SessioneUtenteModel = JSON.parse(localStorage?.getItem('userSession') ?? '{}');
      return utenteSession.usertype === "ADMIN";
    }
    return false;
  }

}
