import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

/** Componente per il rendirizzamento alla rotta principale del modulo utenti */
@Component({
  selector: 'app-utenti',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './utenti.component.html',
  styleUrls: ['./utenti.component.scss'],
})
export default class UtentiComponent {}
