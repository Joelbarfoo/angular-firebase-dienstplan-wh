import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login').then(m => m.Login),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/regsister/register').then(m => m.Register),
  },
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home/home').then(m => m.Home),
  },
];
