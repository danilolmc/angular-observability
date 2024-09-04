import { Routes } from '@angular/router';
import { HomeRoute } from './routes/home.route';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: HomeRoute
    },
    {
        path: 'post/:postId',
        loadComponent: () => import('./routes/post.route')
    }

];
