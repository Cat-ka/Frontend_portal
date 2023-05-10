import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { UserSemestralsService } from 'src/app/services/user-semestrals.service';

@Component({
  selector: 'app-semestralproject',
  templateUrl: './semestralproject.component.html',
  styleUrls: ['./semestralproject.component.scss']
})
export class SemestralprojectComponent implements OnInit {

  subjectForm!: FormGroup;
  semesterProject: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    //public dialogRef: MatDialogRef<SemestralprojectComponent>,
    private snackbarService: SnackbarService,
    private userSemestralsService: UserSemestralsService
  ) {
    this.semesterProject = dialogData.semesterProject;
  }

  ngOnInit(): void {
    this.subjectForm = this.formBuilder.group({
      name: [this.semesterProject.name, [Validators.required]],
      description: [this.semesterProject.description, [Validators.required]], 
      term: [this.semesterProject.term, [Validators.required]], 
      createdBy: [this.semesterProject.createdBy, [Validators.required]], 
      subjectName: [this.semesterProject.subjectName, [Validators.required]], 
      userFirstName: [this.semesterProject.userFirstName, [Validators.required]], 
      userLastName: [this.semesterProject.userLastName, [Validators.required]], 
      file: [this.semesterProject.file, [Validators.required]], 
    }, (error: any) => {
          console.log(error);
          this.snackbarService.openSnackBar('Chyba pri vypísaní semestrálnej práce', 'error');
        }
    );
    
   
  }

  
}
