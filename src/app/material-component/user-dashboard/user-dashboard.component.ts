import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SemestralsService } from 'src/app/services/semestrals.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserSemestralsService } from 'src/app/services/user-semestrals.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  userWorks: any;
  onAssignProject = new EventEmitter();
  onCancelProject = new EventEmitter();
  displayedColumns: string[] = [
    'name',
    'description',
    'term',
    'subject',
    'createdBy',
    'fileName',
    'action'
  ];
  dataSource: any;
  responseMessage: any;
  currentUserId!: number;
  projectId: any;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private semestralsService: SemestralsService,
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

  tableData() {
    this.semestralsService
      .getSemesterProjectsForStudent(this.currentUserId)
      .subscribe((data) => {
        this.ngxService.stop();
        this.userWorks = data;
        this.dataSource = new MatTableDataSource();
        this.dataSource.paginator = this.paginator;

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

  getCurrentUser() {
    this.userSemestralsService.getCurrentUser().subscribe((response: any) => {
      this.currentUserId = response.message;
      console.log(this.currentUserId);
    });
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.semestralsService.uploadFile(formData).subscribe((response) => {
      console.log(response);
      // tu môžete spracovať odpoveď od serveru
    });
  }

}
