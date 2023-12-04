import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/app-layout/app-layout.component'),
    children: [
      {
        path: '',
        redirectTo: 'profilo',
        pathMatch: 'full',
      },
      {
        path: 'profilo',
        loadChildren: () =>
          import('../profilo/profilo-routing').then((m) => m.routes),
      },

      { path: '**', redirectTo: 'home', pathMatch: 'full' },
    ],
  },
];
