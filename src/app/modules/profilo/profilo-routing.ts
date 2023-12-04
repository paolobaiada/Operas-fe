import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { UtentiService } from 'src/app/services/utenti.service';

export const routes: Routes = [
  {
    path: '',
    title: 'Profilo',
    loadComponent: () => import('./profilo/profilo.component'), 
                                                              
    children: [
      {
        path: '',
        redirectTo: 'profilo',
        pathMatch: 'full',
      },
      {
        path: 'profilo',
        title: 'Visualizza profilo',
        loadComponent: () => import('./profilo-view/profilo-view.component')
      },
      {
        path: 'profilo-update',
        title: 'Aggiorna profilo',
        loadComponent: () => import('./profilo-update/profilo-update.component')
      },
      {
        path: 'profilo-admin-spettacoli',
        title: 'Tutti gli spettacoli',
        loadComponent:() => import ('./profilo-admin-spettacoli/profilo-admin-spettacoli.component')
      },
      {
        path: 'profilo-societa-update',
        title: 'Aggiorna società',
        loadComponent: () => import('./profilo-societa-update/profilo-societa-update.component')
      },
      {
        path: 'profilo-admin-spettacoli',
        title: 'Tutti gli spettacoli',
        loadComponent:() => import ('./profilo-admin-spettacoli/profilo-admin-spettacoli.component')
      },
      {
        path: 'aggiungi-spettacolo',
        title: 'Aggiungi spettacolo',
        loadComponent:() => import ('./aggiungi-spettacolo/aggiungi-spettacolo.component')
      },
     
      {
        path: 'update-spettacolo/:idSpettacolo',
        title: 'Aggiorna spettacolo',
        loadComponent:() => import ('./update-spettacolo/update-spettacolo.component')
      },
    ],
  },
];