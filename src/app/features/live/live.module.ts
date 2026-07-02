import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LiveComponent } from './live.component';

const routes: Routes = [
  { path: '', component: LiveComponent },
  { path: ':id', component: LiveComponent }
];

@NgModule({
  declarations: [LiveComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class LiveModule {}