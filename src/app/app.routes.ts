import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'movies',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'movies/details/:id',
    loadComponent: () =>
      import('./details/details.component').then((m) => m.DetailsComponent),
  },
  {
    path: '',
    redirectTo: 'movies',
    pathMatch: 'full',
  },
];
