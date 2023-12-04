import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon'

@Component({
  selector: 'app-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatIconModule
  ]
})
export class UpdateDialogComponent {

}
