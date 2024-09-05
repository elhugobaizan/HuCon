import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'bancos',
        loadComponent: () =>
          import('../bancos/bancos.page').then((m) => m.BancosPage),
      },
      {
        path: 'gastos',
        loadComponent: () =>
          import('../gastos/gastos.page').then((m) => m.GastosPage),
      },
      {
        path: 'wallets',
        loadComponent: () =>
          import('../wallets/wallets.page').then((m) => m.WalletsPage),
      },
      {
        path: 'fijos',
        loadComponent: () =>
          import('../fijos/fijos.page').then((m) => m.FijosPage),
      },
      {
        path: 'home',
        loadComponent: () =>
          import('../home/home.page').then((m) => m.HomePage),
      },
      {
        path: 'config',
        loadComponent: () => import('../config/config.page').then((m) => m.ConfigPage),
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];
