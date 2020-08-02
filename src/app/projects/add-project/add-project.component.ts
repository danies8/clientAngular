import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProjectService, Project } from 'src/app/shared/project.service';

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.css']
})
export class AddProjectComponent {

  pageTitle = "Add Project";
  errorMessage = "";
  form: FormGroup;
  name: String;
  
  constructor(private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
   });
  }

  saveProject(): void {

    let newProject = {} as Project;
    newProject.name = this.form.get('name').value;
    this.projectService.createProject(newProject).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSaveComplete(): void {
    this.router.navigate(['/standups']);
  }

  cancelProject(): void {
    this.form.reset();
  }

}