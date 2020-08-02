import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TeamMemberService, TeamMember } from 'src/app/shared/team-member.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.css']
})
export class AddTeamMemberComponent {

  pageTitle = "Add Team Member";
  errorMessage = "";
  form: FormGroup;
  name: String;
  
  constructor(private formBuilder: FormBuilder,
    private teamMemberService: TeamMemberService,
    private router: Router) {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
   });
  }

  saveTeamMember(): void {

    let newTeamMember = {} as TeamMember;
    newTeamMember.name = this.form.get('name').value;
    this.teamMemberService.createTeamMember(newTeamMember).subscribe(
      () => this.onSaveComplete(),
      (error: any) => this.errorMessage = <any>error
    );
  }

  onSaveComplete(): void {
    this.router.navigate(['/standups']);
  }

  cancelTeamMember(): void {
    this.form.reset();
  }

}
