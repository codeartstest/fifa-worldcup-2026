import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TeamsComponent } from './teams.component';
import { TeamDetailComponent } from './team-detail.component';

const routes: Routes = [
  { path: '', component: TeamsComponent },
  { path: ':id', component: TeamDetailComponent }
];

@NgModule({
  declarations: [TeamsComponent, TeamDetailComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class TeamsModule {}