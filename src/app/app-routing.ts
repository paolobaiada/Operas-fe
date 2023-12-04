import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    // canActivateChild: [AuthGuard],
    children: [
      /*{
        path: '',
        redirectTo: 'login',  // Modifica qui: da 'gestionale' a 'login'
        pathMatch: 'full',
      },*/
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'gestionale',
        loadChildren: () =>
          import('./modules/app-layout/app-layout-routing').then(
            (m) => m.routes
          ),
      },
      {
        path: 'login',
        loadChildren: () =>
          import('./modules/login/login-routing').then((m) => m.routes),
      },
      {
        path: 'register',
        loadChildren: () =>
          import('./modules/register/register-routing').then((m) => m.routes),
      },
      {
        path: 'home',
        loadChildren: () =>
          import('./modules/home/home-routing').then((m) => m.routes),
      },
      {
        path: 'dettaglio-spettacolo/:idSpettacolo',
        loadChildren: () =>
          import('./modules/dettaglio-spettacolo/dettaglio-spettacolo-routing').then((m) => m.routes),
      },
      {
        path: 'prenotazione',
        loadChildren: () =>
          import('./modules/prenotazione/prenotazione-routing').then((m) => m.routes),
      },
    ],
  },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];
