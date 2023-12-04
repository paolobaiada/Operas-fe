import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import { LoginService } from 'src/app/services';
import { AnagraficaService } from 'src/app/services/anagrafica.service';
import { SocietaService } from 'src/app/services/societa.service';
import { NgIf } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-profilo-view',
  templateUrl: './profilo-view.component.html',
  styleUrls: ['./profilo-view.component.scss'],
  standalone: true,
  imports: [
    RouterModule,
    MatCardModule,
    NgIf,
    MatButtonModule
  ]
})
export default class ProfiloViewComponent implements OnInit{
  user: any;
  anagrafica: any;
  societa: any;
  
  constructor(
    private loginService: LoginService,
    private anagraficaService: AnagraficaService,
    private societaService: SocietaService,
    private router: Router,
  ){}
  ngOnInit(): void {
    setTimeout(()=>{
      this.user=this.loginService.getUtenteSessione();
      this.anagrafica=this.anagraficaService.getAnagraficaSessione();
      this.societa=this.societaService.getSocietaSessione();
    },200
    )

  }
  updateUser(){
    return this.router.navigate(['/gestionale/profilo/profilo-update'])
  }

  updateSocieta(){
    return this.router.navigate(['/gestionale/profilo/profilo-societa-update'])
  }
}