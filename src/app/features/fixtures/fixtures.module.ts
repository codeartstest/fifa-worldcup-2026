import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { FixturesComponent } from './fixtures.component';

const routes: Routes = [
  { path: '', component: FixturesComponent }
];

@NgModule({
  declarations: [FixturesComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class FixturesModule {}