import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { StandupsListComponent } from './standups-list/standups-list.component';
import { AddStandupComponent } from './add-standup/add-standup.component';
import { ProjectService } from '../shared/project.service';
import { TeamMemberService } from '../shared/team-member.service';
import { StandupService } from '../shared/standup.service';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
     { path: 'standups', component: StandupsListComponent },
     { path: 'standups/add', component: AddStandupComponent },
    ])
  ],
  declarations: [
    StandupsListComponent,
    AddStandupComponent,
   ],
  providers: [
    ProjectService,
    StandupService,
    TeamMemberService
  ]
})
export class StandupModule { }
