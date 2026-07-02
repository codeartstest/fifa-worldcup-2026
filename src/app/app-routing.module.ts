import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'fixtures',
    loadChildren: () => import('./features/fixtures/fixtures.module').then(m => m.FixturesModule)
  },
  {
    path: 'live',
    loadChildren: () => import('./features/live/live.module').then(m => m.LiveModule)
  },
  {
    path: 'standings',
    loadChildren: () => import('./features/standings/standings.module').then(m => m.StandingsModule)
  },
  {
    path: 'bracket',
    loadChildren: () => import('./features/bracket/bracket.module').then(m => m.BracketModule)
  },
  {
    path: 'players',
    loadChildren: () => import('./features/players/players.module').then(m => m.PlayersModule)
  },
  {
    path: 'teams',
    loadChildren: () => import('./features/teams/teams.module').then(m => m.TeamsModule)
  },
  {
    path: 'venues',
    loadChildren: () => import('./features/venues/venues.module').then(m => m.VenuesModule)
  },
  {
    path: 'news',
    loadChildren: () => import('./features/news/news.module').then(m => m.NewsModule)
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}