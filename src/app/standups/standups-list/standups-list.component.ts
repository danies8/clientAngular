import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { TeamMember, TeamMemberService } from '../../shared/team-member.service';
import { StandupService, Standup } from '../../shared/standup.service';
import { catchError, map, tap } from 'rxjs/operators';
import { EMPTY, BehaviorSubject, combineLatest } from 'rxjs';

@Component({
  templateUrl: './standups-list.component.html',
  styleUrls: ['./standups-list.component.css']
})
export class StandupsListComponent {
  pageTitle = "Standups List";
  form: FormGroup;
  teamMembers: TeamMember[];
  standUps: Standup[];
  All: string;
  errorMessage = '';

  private teamMemberSelectedSubject = new BehaviorSubject<string>(this.All);
  teamMemberSelectedAction$ = this.teamMemberSelectedSubject.asObservable();

  teamMembers$ = this.teamMemberService.getAllTeamMembers()
    .pipe(
      tap(data => console.log('teamMembers', JSON.stringify(data))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      }));
       
  standups$ = combineLatest([
    this.standupService.standupWithAdd$,
    this.teamMemberSelectedAction$
  ])
    .pipe(
      map(([standups, teamMemberSelectedId]) =>
        standups.filter(standup => teamMemberSelectedId ? standup._teamMemberId === teamMemberSelectedId:true)
      ),
      tap(data => console.log(JSON.stringify(data))),
      catchError(err => {
        this.errorMessage = err;
        return EMPTY;
      })
    );

  constructor(private formBuilder: FormBuilder,
    private teamMemberService: TeamMemberService,
    private standupService: StandupService) {
    this.form = this.formBuilder.group({
      teamMembers: [''],
      standups: ['']
    });

  }

  onChangeSelectedTeamMember(selectedValue: string): void {
    this.teamMemberSelectedSubject.next(selectedValue);
  }
}

