import { Routes } from '@angular/router';
import { EditarProductoPage } from './editar-producto/editar-producto.page';
import { EditarProvedorPage } from './editar-provedor/editar-provedor.page';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/main', // Redirige a la ruta 'main' por defecto
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadComponent: () => import('./main/main.page').then((m) => m.MainPage),
  },
  {
    path: 'productos',
    loadComponent: () =>
      import('./productos/productos.page').then((m) => m.ProductosPage),
  },
  {
    path: 'provedores',
    loadComponent: () =>
      import('./provedores/provedores.page').then((m) => m.ProvedoresPage),
  },
  {
    path: 'editar-producto/:id',
    component: EditarProductoPage,
  },
  {
    path: 'crear-producto',
    loadComponent: () =>
      import('./crear-producto/crear-producto.page').then(
        (m) => m.CrearProductoPage
      ),
  },
  {
    path: 'editar-provedor/:id',
    component: EditarProvedorPage,
  },
  {
    path: 'crear-provedor',
    loadComponent: () =>
      import('./crear-provedor/crear-provedor.page').then(
        (m) => m.CrearProvedorPage
      ),
  },
];
