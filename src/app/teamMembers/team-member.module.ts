import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AddTeamMemberComponent } from './add-team-member/add-team-member.component';
import { TeamMemberService } from '../shared/team-member.service';



@NgModule({
   imports: [
    SharedModule,
    RouterModule.forChild([
     { path: 'addTeamMember', component: AddTeamMemberComponent },
    ])
  ],
  declarations: [
    AddTeamMemberComponent,
   ],
  providers: [
    TeamMemberService
  ]

})
export class TeamMemberModule { }
