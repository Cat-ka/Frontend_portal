import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { MenuItems } from 'src/app/shared/menu-items';
import { SubjectComponent } from '../dialog/subject/subject.component';
import { Teacher } from 'src/app/model/teacher';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { UserSemestralsService } from 'src/app/services/user-semestrals.service';

@Component({
  selector: 'app-manage-subject',
  templateUrl: './manage-subject.component.html',
  styleUrls: ['./manage-subject.component.scss'],
})
export class ManageSubjectComponent implements OnInit {
  displayedColumns: string[] = ['subjectNames', 'teacherNames', 'edit'];
  dataSource: any;
  responseMessage: any;
  role: any;
  token: any = localStorage.getItem('token');
  currentUser: {
    id: number;
    name: string;
    role: string;
  } = {
    id: 0,
    name: '',
    role: '',
  };

  constructor(
    private subjectService: SubjectService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.getCurrentUserInfo();
    this.tableData();
  }

  getCurrentUserInfo() {
    this.userService.getCurrentUserInfo().subscribe(
      (response: any) => {
        this.currentUser.id = response.id;
        this.currentUser.name = response.name;
        this.currentUser.role = response.role;
        console.log(this.currentUser);
      },
      (error: any) => {
        console.error(
          'Údaje o prihlásenom používateľovi nie sú dostupné.',
          error
        );
      }
    );
  }

  tableData() {
    this.subjectService.getSubject().subscribe(
      (response: any) => {
        this.ngxService.stop();
        let subjects = response;

        if (this.currentUser.role === 'teacher') {
          subjects = subjects.filter((subject: any) =>
            subject.teacherNames.includes(this.currentUser.name)
          );
        }

        subjects = subjects.map((subject: any) => {
          const teachers =
            subject.teacherNames instanceof Array
              ? subject.teacherNames.join(', ')
              : subject.teacherNames;
          const teacherNamesArray = teachers
            .split(',')
            .map((name: string) => name.trim());
          return {
            id: subject.id,
            subjectNames: subject.subjectNames,
            teacherNames: teacherNamesArray,
          };
        });
        this.dataSource = new MatTableDataSource(subjects);
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Pridať',
    };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(SubjectComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddSubject.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      action: 'Edit',
      data: values,
    };
    console.log(dialogConfig.data);
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(SubjectComponent, dialogConfig);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
    const sub = dialogRef.componentInstance.onAddSubject.subscribe(
      (response) => {
        this.tableData();
      }
    );
  }

  handleDeleteAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message:
        'chcete vymazať predmet s názvom: ' + element.subjectNames + ' ?',
      confirmation: true,
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (response) => {
        this.ngxService.start();
        this.deleteSubject(element.id);
        dialogRef.close();
      }
    );
  }

  deleteSubject(id: any) {
    this.subjectService.delete(id).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.tableData();
        this.responseMessage = response?.message;
        this.snackbarService.openSnackBar(this.responseMessage, 'success');
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error.error?.message);
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }
}
