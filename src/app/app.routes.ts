import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadComponent: () =>
      import('./pages/admin/admin.component').then(m => m.AdminComponent)
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'layout',
    loadComponent: () =>
      import('./pages/layout/layout.component').then(m => m.LayoutComponent)
  },
  {
    path: 'artikel',
    loadComponent: () =>
      import('./pages/artikel/artikel.component').then(m => m.ArtikelComponent),
    children: [
      {
        path: 'share',
        loadComponent: () =>
          import('./pages/artikel-share/artikel-share.component').then(m => m.ArtikelShareComponent),
        children: [
          {
            path: 'stack',
            loadComponent: () =>
              import('./pages/artikel-share/artikel-share.component').then(m => m.ArtikelShareComponent)
          }
        ]
      },
      {
        path: 'comments',
        loadComponent: () =>
          import('./pages/artikel-comments/artikel-comments.component').then(m => m.ArtikelCommentsComponent),
        children: [
          {
            path: 'baru',
            loadComponent: () =>
              import('./pages/artikel-comment-form/artikel-comment-form.component').then(m => m.ArtikelCommentFormComponent)
          }
        ]
      }
    ]
  },
  {
    path: 'menu',
    loadComponent: () =>
      import('./pages/menu/menu.component').then(m => m.MenuComponent)
  },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
