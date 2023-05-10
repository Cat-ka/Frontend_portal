import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';
import { ManageSubjectComponent } from './manage-subject/manage-subject.component';
import { SubjectComponent } from './dialog/subject/subject.component';
import { ManageUserComponent } from './manage-user/manage-user.component';
import { UserComponent } from './dialog/user/user.component';
import { ManageSemestralprojectComponent } from './manage-semestralproject/manage-semestralproject.component';
import { SemestralprojectComponent } from './dialog/semestralproject/semestralproject.component';
import { ManageSemestralsComponent } from './manage-semestrals/manage-semestrals.component';
import { UserSemestralsComponent } from './user-semestrals/user-semestrals.component';
import { ProjectDetailsComponent } from './dialog/project-details/project-details.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ConfirmationComponent,
    ChangePasswordComponent,
    ManageSubjectComponent,
    SubjectComponent,
    ManageUserComponent,
    UserComponent,
    ManageSemestralprojectComponent,
    SemestralprojectComponent,
    ManageSemestralsComponent,
    UserSemestralsComponent,
    ProjectDetailsComponent,
    UserDashboardComponent
  ]
})
export class MaterialComponentsModule {}
