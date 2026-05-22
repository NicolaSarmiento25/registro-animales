import { Routes } from '@angular/router';
import { Menu } from './menu/menu';
import { Registro } from './registro/registro';
import { Consulta } from './consulta/consulta';

export const routes: Routes = [
  { path: '', component: Menu },
  { path: 'registro', component: Registro },
  { path: 'consulta', component: Consulta },
];
