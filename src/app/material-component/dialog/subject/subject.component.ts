import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { Teacher } from 'src/app/model/teacher';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { SubjectService } from 'src/app/services/subject.service';
import { UserService } from 'src/app/services/user.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})


export class SubjectComponent implements OnInit {

  onAddSubject = new EventEmitter();
  onEditSubject = new EventEmitter();
  onDeleteSubject = new EventEmitter();
  subjectForm: any = FormGroup;
  dialogAction: any = "Add";
  action: any = "Add";
  responseMessage: any;
  teachers: Teacher[] = [];
  @Input() data: any;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    public dialogRef: MatDialogRef<SubjectComponent>,
    private snackbarService: SnackbarService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllTeachers();
    this.subjectForm = this.formBuilder.group({
      subjectName: [null, [Validators.required]],
      teachers: [[], [Validators.required]]
      //tieto názvy by mali byť vo formControlName v .html
    });
    
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = "Edit";
      this.action = "Update";
      this.subjectForm = this.formBuilder.group({
        id: [null, [Validators.required]],
        subjectName: [null, [Validators.required]],
        teachers: [null, [Validators.required]],        
      })
      const { id, subjectNames, teacherNames } = this.dialogData.data;
      this.subjectForm.patchValue({ id, subjectName:subjectNames, teachers: teacherNames });
    }
  }

  handleSubmit() {
    if (this.dialogAction === "Edit") {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    var formData = this.subjectForm.value;
    var data = {
      subjectName: formData.subjectName,
      teachers: formData.teachers.map((teacher: any) => teacher.id).join(',')
    }
    this.subjectService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddSubject.emit();
      //emit refreshne po pridani
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  edit() {
    var formData = this.subjectForm.value;
    var data = {
      id: formData.id,
      subjectName: formData.subjectName,
      teachers: formData.teachers.map((teacher: any) => teacher.id).join(',')
    }
    console.log(data)
    this.subjectService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddSubject.emit();
      //emit refreshne po pridani
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error) => {
      this.dialogRef.close();
      console.error(error);
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  getAllTeachers(): void{
    this.userService.getAllTeachersWrap().subscribe((response: Object) => {
      this.teachers = response as Teacher[];
      const selectedTeachers = this.dialogData.action === 'Edit' ? this.dialogData.data.teacherNames.map((teacher: any) => teacher.id) : [];
      this.subjectForm.controls['teachers'].setValue(selectedTeachers);
    }, (error: any) => {
      console.error(error);
    });
  }


}
