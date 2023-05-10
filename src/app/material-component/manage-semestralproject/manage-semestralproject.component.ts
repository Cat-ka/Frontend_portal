import { Component, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SemesterprojectService } from 'src/app/services/semesterproject.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';
import { SubjectService } from 'src/app/services/subject.service';
import { AuthService } from 'src/app/services/auth.service';
import jwtDecode from 'jwt-decode';
import { UserSemestralsService } from 'src/app/services/user-semestrals.service';
import { UserSemestralsComponent } from '../user-semestrals/user-semestrals.component';


@Component({
  selector: 'app-manage-semestralproject',
  templateUrl: './manage-semestralproject.component.html',
  styleUrls: ['./manage-semestralproject.component.scss']
})
export class ManageSemestralprojectComponent implements OnInit {

  onAddSemesterProject = new EventEmitter();
  semestralProjectform: any = FormGroup;
  responseMessage: any;
  subjectList: any = [];
  ToggleChange: boolean = true;
  status: any = "true";
  currentUserId!: number;
  filterValue: number | null = null;

  constructor(
    private semestralProjectService: SemesterprojectService,
    private router: Router,
    private snackbarService: SnackbarService,
    private formBuilder: FormBuilder,
    private subjectService: SubjectService,
    private authService: AuthService,
    private userSemestralService: UserSemestralsService,
  ) { }

  ngOnInit(): void {


    if (this.authService.getUserRole() == "teacher") {
      this.userSemestralService.getCurrentUser().subscribe((response: any) => {
        this.filterValue = response.message;
        //console.log(this.filterValue);
        this.getSubjects();
      });
    } else {
      this.getSubjects();
    }


    this.semestralProjectform = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      description: [null, [Validators.required]],
      term: [null, [Validators.required]],
      subjectId: [null, [Validators.required]],
      status: [null, [Validators.required]]
    });

  }

  getSubjects() {
    this.subjectService.getSubject(this.filterValue).subscribe((data: any) => {
      this.subjectList = data;
    });
  }

  handleAddAction() {
    var formData = this.semestralProjectform.value;
    var date = new Date(formData.term);
    var day = date.getDate().toString().padStart(2, '0');
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var convertedDate = date.getFullYear() + "-" + month + "-" + day;
    var data = {
      name: formData.name,
      description: formData.description,
      term: convertedDate,
      subjectId: formData.subjectId,
      status: this.status
    }
    console.log(this.status);
    this.semestralProjectService.addSemesterProject(data).subscribe((response: any) => {
      this.onAddSemesterProject.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
      this.semestralProjectform.reset();
      this.router.navigate(['/portal/semestrals']);
    }, (error) => {
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

  toggleChange(event: any) {
    this.ToggleChange = event.checked;
    if (this.ToggleChange == true) {
      this.status = "true";
    } else {
      this.status = "false";
    }
    console.log(this.status);
  }


}

