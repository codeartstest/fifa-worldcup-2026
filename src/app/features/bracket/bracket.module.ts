import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BracketComponent } from './bracket.component';

const routes: Routes = [{ path: '', component: BracketComponent }];

@NgModule({
  declarations: [BracketComponent],
  imports: [CommonModule, RouterModule.forChild(routes)]
})
export class BracketModule {}