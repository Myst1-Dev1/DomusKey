import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ImmobilesPageComponent } from './components/immobiles-page/immobiles-page.component';
import { ImmobileComponent } from './components/immobile/immobile.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "imoveis",
        component:ImmobilesPageComponent
    },
    {
        path:"imoveis/:id",
        component:ImmobileComponent
    }
];
