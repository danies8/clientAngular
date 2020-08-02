import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TeamMember, TeamMemberService } from 'src/app/shared/team-member.service';
import { Project, ProjectService } from 'src/app/shared/project.service';
import { StandupService, Standup } from 'src/app/shared/standup.service';
import { Router } from '@angular/router';
import { tap, catchError, map, filter } from 'rxjs/operators';
import { EMPTY, BehaviorSubject } from 'rxjs';

@Component({
  templateUrl: './add-standup.component.html',
  styleUrls: ['./add-standup.component.css']
})
export class AddStandupComponent {
  pageTitle = "Add New Standup";
  form: FormGroup;
  teamMembers: TeamMember[];
  projects: Project[];
  selectedTeamMember: TeamMember;
  selectedProject: Project;
  workYesterday: String;
  workToday: String;
  impediment: String;
  errorMessage = '';

  constructor(private formBuilder: FormBuilder,
    private teamMemberService: TeamMemberService,
    private projectService: ProjectService,
    private standupService: StandupService,
    private router: Router) {
    this.form = this.formBuilder.group({
      teamMembers: ['', Validators.required],
      projects: ['', Validators.required],
      workYesterday: ['', Validators.required],
      workToday: ['', Validators.required],
      impediment: ['', Validators.required],
    });

  }

  teamMembers$ = this.teamMemberService.getAllTeamMembers()
    .pipe(
      tap(data => console.log('teamMembers', JSON.stringify(data))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));

  projects$ = this.projectService.getAllProjects()
    .pipe(
      tap(data => console.log('teamMembers', JSON.stringify(data))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));


  onChangeSelectedTeamMember(selectedValue): void {
    let results = this.teamMembers$.pipe(map(teamMembers =>
      teamMembers.filter(tm => tm._id === selectedValue)[0]));
    results.subscribe(item => this.selectedTeamMember = item);
    }

  onChangeSelectedProject(selectedValue): void {
    let results = this.projects$.pipe(map(projects =>
      projects.filter(pr => pr._id == selectedValue)[0]));
    results.subscribe(item => this.selectedProject = item);
  }

  saveStandup(): void {

    let newStandup = {} as Standup;
    newStandup._teamMemberId = this.selectedTeamMember._id;
    newStandup.teamMember = this.selectedTeamMember.name;
    newStandup.project = this.selectedProject.name;
    newStandup.workYesterday = this.form.get('workYesterday').value;
    newStandup.workToday = this.form.get('workToday').value;
    newStandup.impediment = this.form.get('impediment').value;
    newStandup.createdOn = new Date();

    this.standupService.createStandup(newStandup).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSaveComplete(): void {
    this.router.navigate(['/standups']);
  }

  cancelStandup(): void {
    this.form.reset();
  }
}
