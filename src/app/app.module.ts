import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { PageNotFoundComponent } from './home/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Feature Modules */
import { SelectiveStrategy } from './selective-strategy.service';
import { TeamMemberModule } from './teamMembers/team-member.module';
import { ProjectModule } from './projects/project.module';
import { StandupModule } from './standups/standup.module';



@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    PageNotFoundComponent,
    ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
     RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
       /*  {
        path: 'standups',
        data: { preload: true },
        loadChildren: './standups/standup.module#StandupModule'
      },  */
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      { path: '**', component: PageNotFoundComponent }
       ]/* ,{ enableTracing: false, preloadingStrategy: SelectiveStrategy } */ ),
       TeamMemberModule,
       ProjectModule,
       StandupModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
