import { AfterViewInit, Component, ElementRef, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { MatPaginator } from '@angular/material/paginator';
import { SemestralsService } from 'src/app/services/semestrals.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';

@Component({
  selector: 'app-manage-semestrals',
  templateUrl: './manage-semestrals.component.html',
  styleUrls: ['./manage-semestrals.component.scss']
})
export class ManageSemestralsComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'description', 'term', 'status', 'createdBy', 'subject', 'user', 'delete'];
  dataSource: any;
  responseMessage: any;
  
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router,
    private semestralsService: SemestralsService
  ) { }

  ngOnInit(): void {
    this.ngxService.start();
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
    this.semestralsService.getAllSemesterProjects().subscribe((response: any) => {
      this.ngxService.stop();
      //console.log(response);
      this.dataSource = new MatTableDataSource(response);
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


  handleDeleteAction(element: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'chcete vymazať semestrálnu prácu s názvom: ' + element.name,
      confirmation: true
    }
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    const sub = dialogRef.componentInstance.onEmitStatusChange.subscribe((response) => {
      this.ngxService.start();
      this.deleteSemesterProject(element.id);
      dialogRef.close();
    })
  }

  deleteSemesterProject(id: any) {
    this.semestralsService.delete(id).subscribe((response: any) => {
      this.ngxService.stop();
      this.tableData();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
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

  onChangeStatus(status: any, id: any) {
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id: id
    }
    console.log(status);
    this.semestralsService.updateStatus(data).subscribe((response: any) => {
      this.ngxService.stop;
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      this.tableData();
    }, (error: any) => {
      this.ngxService.stop();
      console.log(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  
}

