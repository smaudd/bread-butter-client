import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { Error404Component } from './core/error-components/error404.component';
import { LoginGuard } from './core/guards/login.guard';

const routes: Routes = [

  { path: '', redirectTo: '/', pathMatch: 'full' },
  {
    path: 'land',
    loadChildren: './core/home/home.module#HomeModule',

  },
  { path: '',
    loadChildren: './core/layout/layout.module#LayoutModule',
    canActivate: [LoginGuard],

  },
  { path: '404', component: Error404Component,
},

  { path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
