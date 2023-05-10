import { AfterViewInit, Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { SemestralsService } from 'src/app/services/semestrals.service';
import { UserSemestralsService } from 'src/app/services/user-semestrals.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ProjectDetailsComponent } from '../dialog/project-details/project-details.component';
import { SemestralprojectComponent } from '../dialog/semestralproject/semestralproject.component';

@Component({
  selector: 'app-user-semestrals',
  templateUrl: './user-semestrals.component.html',
  styleUrls: ['./user-semestrals.component.scss']
})
export class UserSemestralsComponent implements OnInit, AfterViewInit {

  onAssignProject = new EventEmitter();
  onCancelProject = new EventEmitter();
  displayedColumns: string[] = ['name', 'description', 'term', 'subject', 'createdBy', 'available', 'user', 'assign'];
  dataSource: any;
  responseMessage: any;
  currentUserId!: number;
  projectId: any;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private userSemestralsService: UserSemestralsService,
    private matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
    this.getCurrentUser();
    this.dataSource = new MatTableDataSource();
    this.tableData();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  tableData() {
    this.userSemestralsService.getPublishedProjects().subscribe((response: any) => {
      this.ngxService.stop();
      //console.log(response);
      response.forEach((element: any) => {
        element.isCurrentUser = element?.userId && (element?.userId.toString() === this.currentUserId.toString());
      });
      this.dataSource = new MatTableDataSource(response);
      console.log(this.dataSource.data.map((element: { userId: any; }) => element.userId));
      this.dataSource.paginator = this.paginator;
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error.error?.message);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  assign(data: any) {
    this.ngxService.stop();
    const requestData = {
      id: data
    };
    this.userSemestralsService.assignProject(requestData).subscribe(
      (response) => {
        this.ngxService.stop();
        console.log(response);
        this.onAssignProject.emit();
        this.responseMessage = (response as any).message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
        //this.semestralProjectform.reset();
        //this.router.navigate(['/']);
        this.tableData();
      }, (error) => {
        console.log(error);
        if (error.error?.message) {
          this.ngxService.stop();
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
  };

  getCurrentUser() {
    this.userSemestralsService.getCurrentUser().subscribe((response: any) => {
      this.currentUserId = response.message;
      console.log(this.currentUserId);
    });
  }

  handleCancelAction(data: any): void {
    this.currentUserId = data.userId;
    this.projectId = data.id;
    this.userSemestralsService.cancelProject(this.projectId).subscribe(
      (response) => {
        this.ngxService.stop();
        this.onCancelProject.emit();
        console.log(response);
        this.responseMessage = (response as any).message;
        this.snackbarService.openSnackBar(this.responseMessage, "success");
        this.tableData();
      }, (error) => {
        console.log(error);
        if (error.error?.message) {
          this.ngxService.stop();
          this.responseMessage = error.error?.message;
        }
        else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      })
  }

 
  openProjectDetails(element: any) {
    this.userSemestralsService.getPublishedProjectById(element.id).subscribe(
      (result: any) => {
        const dialogRef = this.dialog.open(SemestralprojectComponent, {
          panelClass: 'dialog-content',
          width:'700px',
          data: {
            semesterProject: result
          }
        });
      },
      (error: any) => {
        console.log(error);
        this.snackbarService.openSnackBar('Chyba pri načítaní semestrálnej práce', 'error');
      }
    );
  }


}
