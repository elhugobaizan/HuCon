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
        path: '',
        redirectTo: '/bancos',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/bancos',
    pathMatch: 'full',
  },
];
