import { Component, OnInit } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from 'src/app/services';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import {MatButtonModule} from '@angular/material/button';
import { Router } from '@angular/router';
import { SlicePipe, UpperCasePipe, TitleCasePipe } from '@angular/common';
import { SessioneUtenteModel } from 'src/app/models';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-card-profilo',
  templateUrl: './card-profilo.component.html',
  styleUrls: ['./card-profilo.component.scss'],
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    SlicePipe,
    UpperCasePipe,
    TitleCasePipe,
    NgIf
  ]
})
export class CardProfiloComponent implements OnInit{
  user!: SessioneUtenteModel;
  anagrafica: any;

  constructor(
    private loginService: LoginService,
    private anagraficaService: AnagraficaService,
    private router: Router,
  ){}

  ngOnInit(): void {
    this.user=this.loginService.getUtenteSessione();
    this.anagrafica=this.anagraficaService.getAnagraficaSessione();
  }

  update(){
    this.router.navigate(['/gestionale/profilo/profilo-update'])
  }
}
