import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { GlobalConstants } from '../shared/global-constants';
import jwt_decode from 'jwt-decode';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SemestralsService } from '../services/semestrals.service';
import { UserSemestralsService } from '../services/user-semestrals.service';
import { MatTableDataSource } from '@angular/material/table';
import { SemesterProject } from '../model/semester-project';
import { SemesterFile } from '../model/semester-file';
import { SemestralprojectComponent } from '../material-component/dialog/semestralproject/semestralproject.component';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { FileService } from '../services/file.service';
//import { saveAs } from 'file-saver';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  responseMessage: any;
  data: any;
  token: any = localStorage.getItem('token');
  currentUser: any;
  tokenPayload: any;
  role: any;
  dataSource: any;
  currentUserId!: number;
  displayedColumns: string[] | undefined;
  selectedFile: File | undefined;
  projectId!: number;
  projects: SemesterProject[] = [];
  filesArray: SemesterFile[] = [];
  filesMap = new Map<number, SemesterFile[]>();

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private semestralsService: SemestralsService,
    private userSemestralsService: UserSemestralsService,
    private dialog: MatDialog,
    private fileService: FileService,    

  ) {
    this.ngxService.start();
    //this.dashboardData();
  }

  ngOnInit(): void {
    this.getCurrentUser();
    this.role = this.getRoleCurrentUser();
    if (this.role === 'admin') {
      this.dashboardData();
    } else if (this.role === 'teacher') {
      this.dashboardDataTeacher();
    } else if (this.role === 'user') {
      this.dashboardDataUser();
    }

    if (this.role === 'user') {
      this.displayedColumns = [
        'name',
        'description',
        'term',
        'subject',
        'createdBy',
        'fileName',
        'action',
      ];
    } else {
      this.displayedColumns = [
        'name',
        'description',
        'term',
        'subject',
        'user',
        'fileData',
      ];
    }
    this.dataSource = new MatTableDataSource();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    this.currentUser = this.authService.getUserRole();
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.data = response;
      },
      (error: any) => {
        this.ngxService.stop();
        console.log(error);
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

  dashboardDataUser() {
    this.semestralsService
      .getSemesterProjectsForStudent(this.currentUserId)
      .subscribe(
        (response: any) => {
          this.ngxService.stop();
          //console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
        },
        (error: any) => {
          this.ngxService.stop();
          console.log(error);
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

  dashboardDataTeacher() {
    this.semestralsService
      .getSemestersByCurrentUser(this.currentUserId)
      .subscribe(
        (response: any) => {
          this.ngxService.stop();
          //console.log(response);
          this.dataSource = new MatTableDataSource(response);
          this.dataSource.paginator = this.paginator;
          
        },
        (error: any) => {
          this.ngxService.stop();
          console.log(error);
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

  getRoleCurrentUser(): string {
    this.tokenPayload = jwt_decode(this.token);
    return this.tokenPayload.role;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCurrentUser() {
    this.userSemestralsService.getCurrentUser().subscribe((response: any) => {
      this.currentUserId = response.message;
      console.log(this.currentUserId);
    });
  }

  onFileSelected(id: number, event: any): void {
    const fileData: File = event.target.files[0];
    const formData: FormData = new FormData();
    //formData.append()

    formData.append('id', id.toString());
    formData.append('fileData', fileData);

    this.semestralsService.uploadFile(formData).subscribe((response) => {
      //console.log(response);
      // tu môžete spracovať odpoveď od serveru
    });
  }

 /*  onFileSelected(event:any) {
    this.selectedFile = <File>event.target.files[0];
  }

  onSubmit() {
    const formData = new FormData();
    formData.append('file', this.selectedFile, this.selectedFile.name);
    formData.append('semester_project_id', String(this.projectId));
    this.fileService.uploadFile(formData).subscribe(response => {
      console.log(response);
    });
  } */

  openProjectDetails(element: any) {
    this.userSemestralsService.getPublishedProjectById(element.id).subscribe(
      (result: any) => {
        const dialogRef = this.dialog.open(SemestralprojectComponent, {
          panelClass: 'dialog-content',
          width: '700px',
          data: {
            semesterProject: result,
          },
        });
      },
      (error: any) => {
        console.log(error);
        this.snackbarService.openSnackBar(
          'Chyba pri načítaní semestrálnej práce',
          'error'
        );
      }
    );
  }

  // downloadFile(fileId: number) {
  //   this.fileService.downloadFile(fileId).subscribe((file: Blob) => {
  //     var fileUrl = URL.createObjectURL(file);
  //     saveAs(fileUrl, 'fileName.extension'); // Replace 'fileName.extension' with the actual file name and extension
  //   });
  // }

  getFilesForProject(projectId: number): void {
    this.fileService.getFileList(projectId).subscribe(
      files => {
        const project = this.dataSource.data.find((item: any) => item.id === projectId);
        if(project) {
          project.files = files;
        }
      },
      error => {
        console.error('There was an error!', error);
      }
    );
  }
  
  }






