import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { StandingsComponent } from './standings.component';

const routes: Routes = [{ path: '', component: StandingsComponent }];

@NgModule({
  declarations: [StandingsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class StandingsModule {}