import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-user',
  templateUrl: './manage-user.component.html',
  styleUrls: ['./manage-user.component.scss']
})
export class ManageUserComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['name', 'email', 'status', 'role', 'edit'];
  dataSource: any;
  responseMessage: any;

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;

  constructor(private ngxService: NgxUiLoaderService,
    private userService: UserService,
    private snackbarService: SnackbarService
  ) { }
  
  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
    }
  }

  tableData() {
    this.userService.getAll().subscribe((response: any) => {
      this.ngxService.stop();
      this.dataSource = new MatTableDataSource(response);
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onChangeStatus(status: any, id: any) {
    this.ngxService.start();
    var data = {
      status: status.toString(),
      id: id
    }
    this.userService.updateStatus(data).subscribe((response: any) => {
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

  onChangeRole(role: any, id: any) {
    this.ngxService.start();
    var data = {
      role: role.toString(),
      id: id
    }
    this.userService.updateRole(data).subscribe((response: any) => {
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
