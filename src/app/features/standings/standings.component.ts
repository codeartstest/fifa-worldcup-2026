import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { GroupStanding } from '../../shared/models/interfaces';

@Component({
  selector: 'app-standings',
  template: `
    <div class="standings container">
      <h1 class="page-title">
        <span class="material-icons">leaderboard</span>
        Group Standings
      </h1>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="groups" *ngIf="!loading && !error">
        <div class="group card" *ngFor="let group of groups">
          <h2 class="group__name">Group {{ group.name }}</h2>
          <div class="table-wrapper">
            <table class="standings-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Team</th>
                  <th>P</th>
                  <th>W</th>
                  <th>D</th>
                  <th>L</th>
                  <th>GF</th>
                  <th>GA</th>
                  <th>GD</th>
                  <th>Pts</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of group.standings" [class.advancing]="s.rank <= 2">
                  <td>{{ s.rank }}</td>
                  <td class="team-cell">
                    <img [src]="s.team.logo" [alt]="s.team.name" class="team-logo" onerror="this.src='assets/placeholder-team.png'">
                    {{ s.team.name }}
                  </td>
                  <td>{{ s.played }}</td>
                  <td>{{ s.won }}</td>
                  <td>{{ s.draw }}</td>
                  <td>{{ s.lost }}</td>
                  <td>{{ s.goalsFor }}</td>
                  <td>{{ s.goalsAgainst }}</td>
                  <td [class]="s.goalDiff > 0 ? 'pos' : s.goalDiff < 0 ? 'neg' : ''">{{ s.goalDiff > 0 ? '+' : '' }}{{ s.goalDiff }}</td>
                  <td class="pts">{{ s.points }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="group__legend">
            <span class="advancing-indicator"></span> Top 2 advance to Knockout Stage
          </div>
        </div>
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
    .groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(500px, 1fr)); gap: 20px; }
    .group {
      &__name { font-size: 18px; color: #D4AF37; margin-bottom: 12px; }
      &__legend { font-size: 12px; color: #6B8A6E; margin-top: 8px; display: flex; align-items: center; gap: 6px; }
    }
    .advancing-indicator { width: 12px; height: 3px; background: #43A047; border-radius: 2px; }
    .table-wrapper { overflow-x: auto; }
    .standings-table {
      width: 100%; border-collapse: collapse; font-size: 13px;
      th, td { padding: 8px 6px; text-align: center; border-bottom: 1px solid #2D4A30; color: #B0C4B1; }
      th { color: #6B8A6E; font-weight: 600; font-size: 11px; text-transform: uppercase; }
      td:first-child, th:first-child { text-align: left; }
      .team-cell { text-align: left; display: flex; align-items: center; gap: 6px; white-space: nowrap; }
      .team-logo { width: 20px; height: 20px; object-fit: contain; }
      .pos { color: #43A047; }
      .neg { color: #E53935; }
      .pts { font-weight: 700; color: #D4AF37; }
      tr.advancing { border-left: 3px solid #43A047; }
    }
    @media (max-width: 767px) {
      .groups { grid-template-columns: 1fr; }
      .standings-table { font-size: 11px; }
    }
  `]
})
export class StandingsComponent implements OnInit {
  groups: { name: string; standings: GroupStanding[] }[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<GroupStanding[]>('/standings').subscribe({
      next: (res) => {
        const data = res.data ?? [];
        const groupMap = new Map<string, GroupStanding[]>();
        data.forEach(s => {
          if (!groupMap.has(s.group)) groupMap.set(s.group, []);
          groupMap.get(s.group)!.push(s);
        });
        this.groups = Array.from(groupMap.entries())
          .map(([name, standings]) => ({ name, standings: standings.sort((a, b) => a.rank - b.rank) }))
          .sort((a, b) => a.name.localeCompare(b.name));
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load standings'; this.loading = false; }
    });
  }
}