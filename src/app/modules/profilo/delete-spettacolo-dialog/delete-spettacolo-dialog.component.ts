import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-spettacolo-dialog',
  templateUrl: './delete-spettacolo-dialog.component.html',
  styleUrls: ['./delete-spettacolo-dialog.component.scss'],
  standalone:true,
  imports:[
    MatDialogModule,
    MatButtonModule
  ]
})
export class DeleteSpettacoloDialogComponent {
    constructor(private router:Router ){

    }

    navigateTo(){
      this.router.navigate(['/gestionale/profilo/profilo'])
    }
}
