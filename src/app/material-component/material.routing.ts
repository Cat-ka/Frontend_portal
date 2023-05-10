import { Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { ManageSubjectComponent } from './manage-subject/manage-subject.component';
import { RouteGuardService } from '../services/route-guard.service';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { ManageSemestralprojectComponent } from './manage-semestralproject/manage-semestralproject.component';
import { ManageSemestralsComponent } from './manage-semestrals/manage-semestrals.component';
import { UserSemestralsComponent } from './user-semestrals/user-semestrals.component';


export const MaterialRoutes: Routes = [
    {
        path: 'subject',
        component: ManageSubjectComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'teacher']
        }
    },
    {
        path: 'user',
        component: ManageUserComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin']
        }
    },
    {
        path: 'semesterproject',
        component: ManageSemestralprojectComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'teacher']
        }
    },
    {
        path: 'semestrals',
        component: ManageSemestralsComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['admin', 'teacher']
        }
    },
    {
        path: 'usersemestrals',
        component: UserSemestralsComponent,
        canActivate: [RouteGuardService],
        data: {
            expectedRole: ['user', 'admin']
        }
    }

];
