import { Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './pages/layout/layout.component';

export const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},

  {path:'pages',
    component: LayoutComponent,
    loadChildren: () =>
      import('./pages/pages.routes').then((m) => m.pagesRoutes)
  }

];
