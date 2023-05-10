import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  onEditSubject = new EventEmitter();
  subjectForm:any=FormGroup;
  dialogAction:any = "Pridať";
  action:any="Pridať";
  responseMessage:any;


  constructor(@Inject(MAT_DIALOG_DATA) public dialogData:any,
  private formBuilder:FormBuilder,
  private userService: UserService,
  public dialogRef:MatDialogRef<UserComponent>,
  private snackbarService: SnackbarService
  ) { }

  ngOnInit(): void {}

}
