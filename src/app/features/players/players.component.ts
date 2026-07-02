import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { PlayerStat } from '../../shared/models/interfaces';

@Component({
  selector: 'app-players',
  template: `
    <div class="players container">
      <h1 class="page-title">
        <span class="material-icons">person</span>
        Player Statistics
      </h1>

      <div class="filters">
        <select [(ngModel)]="sortBy" (change)="sortPlayers()" class="filter-input">
          <option value="goals">Goals</option>
          <option value="assists">Assists</option>
          <option value="appearances">Appearances</option>
          <option value="yellowCards">Yellow Cards</option>
          <option value="redCards">Red Cards</option>
        </select>
      </div>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="table-wrapper" *ngIf="!loading && !error">
        <table class="players-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Position</th>
              <th>Team</th>
              <th>Apps</th>
              <th>Goals</th>
              <th>Assists</th>
              <th>Yellow</th>
              <th>Red</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let ps of sortedPlayers; let i = index">
              <td>{{ i + 1 }}</td>
              <td class="player-cell">
                <img [src]="ps.player.photo" [alt]="ps.player.name" class="player-photo" onerror="this.src='assets/placeholder-player.png'">
                {{ ps.player.name }}
              </td>
              <td>{{ ps.player.position }}</td>
              <td>{{ ps.player.nationality }}</td>
              <td>{{ ps.games.appearences }}</td>
              <td class="stat-highlight">{{ ps.goals.total }}</td>
              <td>{{ ps.goals.assists }}</td>
              <td class="yellow">{{ ps.cards.yellow }}</td>
              <td class="red">{{ ps.cards.red }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      display: flex; align-items: center; gap: 8px;
      font-size: 28px; font-weight: 600; color: #D4AF37;
      margin: 24px 0 20px;
      .material-icons { font-size: 32px; }
    }
    .filters { margin-bottom: 16px; }
    .filter-input {
      padding: 8px 12px; background: #1A2E1D; border: 1px solid #2D4A30;
      border-radius: 4px; color: #FFFFFF; font-size: 14px;
    }
    .table-wrapper { overflow-x: auto; }
    .players-table {
      width: 100%; border-collapse: collapse; font-size: 13px;
      th, td { padding: 10px 8px; text-align: center; border-bottom: 1px solid #2D4A30; color: #B0C4B1; }
      th { color: #6B8A6E; font-weight: 600; font-size: 11px; text-transform: uppercase; cursor: pointer; }
      .player-cell { display: flex; align-items: center; gap: 8px; text-align: left; white-space: nowrap; }
      .player-photo { width: 28px; height: 28px; border-radius: 50%; object-fit: cover; }
      .stat-highlight { font-weight: 700; color: #D4AF37; }
      .yellow { color: #FB8C00; }
      .red { color: #E53935; }
    }
  `]
})
export class PlayersComponent implements OnInit {
  playerStats: PlayerStat[] = [];
  sortedPlayers: PlayerStat[] = [];
  loading = true;
  error = '';
  sortBy = 'goals';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<PlayerStat[]>('/players').subscribe({
      next: (res) => {
        this.playerStats = res.data ?? [];
        this.sortPlayers();
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load player stats'; this.loading = false; }
    });
  }

  sortPlayers(): void {
    const sorted = [...this.playerStats];
    switch (this.sortBy) {
      case 'goals': sorted.sort((a, b) => b.goals.total - a.goals.total); break;
      case 'assists': sorted.sort((a, b) => b.goals.assists - a.goals.assists); break;
      case 'appearances': sorted.sort((a, b) => b.games.appearences - a.games.appearences); break;
      case 'yellowCards': sorted.sort((a, b) => b.cards.yellow - a.cards.yellow); break;
      case 'redCards': sorted.sort((a, b) => b.cards.red - a.cards.red); break;
    }
    this.sortedPlayers = sorted;
  }
}