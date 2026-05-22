import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'registro', pathMatch: 'full' },
  {
    path: 'registro',
    // Ajusta la ruta según el nombre real de tu archivo:
    // Si se llama registro.ts        -> './registro'
    // Si se llama registro.component.ts -> './registro.component'
    loadComponent: () => import('./registro/registro').then(m => m.Registro)
  },
  {
    path: 'consulta',
    loadComponent: () => import('./consulta/consulta').then(m => m.Consulta)
  },
  {
    path: 'reportes',
    loadComponent: () => import('./reportes/reportes').then(m => m.ReportesComponent)
  }
];
