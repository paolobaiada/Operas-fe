import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, of } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import {
  PrenotaModelRequest,
  PrenotaModelResponse
} from '../models';
import { PanelService } from '.';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PrenotazioneService {
  baseUrl= environment.apiUrl;

  constructor(
    private panelService: PanelService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
  ) {}

    prenota(payload: PrenotaModelRequest): Observable<PrenotaModelResponse> {
            return this.http.post<PrenotaModelResponse>(this.baseUrl+'prenotazione/prenota', payload);
    }
    getPrenotazione(): any {
      if (localStorage.getItem('prenotazione')) {
        return JSON.parse(localStorage?.getItem('prenotazione') ?? '{}');
      }
    }

    getStorico(idAnagrafica: number): Observable<PrenotaModelResponse[]> {
      return this.http.get<PrenotaModelResponse[]>(`${this.baseUrl}prenotazione/storico/${idAnagrafica}`);
    }

    getDettaglio(idPrenotazione: number): Observable<PrenotaModelResponse> {
      return this.http.get<PrenotaModelResponse>(`${this.baseUrl}prenotazione/dettaglio/${idPrenotazione}`);
    }
}