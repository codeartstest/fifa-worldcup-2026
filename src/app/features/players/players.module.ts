import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { PlayersComponent } from './players.component';

const routes: Routes = [{ path: '', component: PlayersComponent }];

@NgModule({
  declarations: [PlayersComponent],
  imports: [CommonModule, FormsModule, RouterModule.forChild(routes)]
})
export class PlayersModule {}