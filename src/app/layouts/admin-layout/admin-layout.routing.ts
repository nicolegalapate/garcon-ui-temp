import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { RecommendedComponent } from 'app/recommended/recommended.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'recommended',    component: RecommendedComponent},
    { path: 'table-list',     component: TableListComponent }
];
