import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { AddProjectComponent } from './add-project/add-project.component';
import { ProjectService } from '../shared/project.service';
import { RouterModule } from '@angular/router';



@NgModule({
  imports: [
   SharedModule,
   RouterModule.forChild([
    { path: 'addProject', component: AddProjectComponent },
   ])
 ],
 declarations: [
  AddProjectComponent,
  ],
 providers: [
   ProjectService
 ]
})
export class ProjectModule { }
