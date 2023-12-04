import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { UtentiService } from 'src/app/services/utenti.service';
import { LoginService } from 'src/app/services';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ]
})

export class DeleteDialogComponent implements OnInit{
  user:any;
  
  constructor(
    private router: Router,
    private utentiService: UtentiService,
    private loginService: LoginService
  ){}

  ngOnInit(): void {
    this.user=this.loginService.getUtenteSessione();
    console.log("utente: "+this.user)
  }

  eliminaProfilo(id : number){
    this.utentiService.eliminaProfilo(id).subscribe(
      (res)=>{
        localStorage.clear;
        sessionStorage.clear;
        this.router.navigate(['/home'])
      },
      (error)=>{
        this.router.navigate(['/gestionale/profilo'])
      }
    );
    
  }
}
