import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoaderSpinnerComponent } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [RouterModule, LoaderSpinnerComponent],
})
export class AppComponent {}
