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
        path: 'tab3',
        loadComponent: () =>
          import('../tab3/tab3.page').then((m) => m.Tab3Page),
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
