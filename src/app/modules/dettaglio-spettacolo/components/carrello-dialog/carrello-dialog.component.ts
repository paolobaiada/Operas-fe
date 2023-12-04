import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrello-dialog',
  templateUrl: './carrello-dialog.component.html',
  styleUrls: ['./carrello-dialog.component.scss'],
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogModule
  ]
})
export class CarrelloDialogComponent {

  constructor(
    private router: Router
  ){}

  navigateTo(){
    this.router.navigate(['/home'])
  }
}
