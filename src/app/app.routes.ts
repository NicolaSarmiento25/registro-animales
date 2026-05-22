import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro').then(m => m.Registro)
  },
  {
    path: 'consulta',
    loadComponent: () => import('./consulta/consulta').then(m => m.Consulta)
  },
];
