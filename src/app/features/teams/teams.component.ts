import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { TeamShort } from '../../shared/models/interfaces';

@Component({
  selector: 'app-teams',
  template: `
    <div class="teams container">
      <h1 class="page-title">
        <span class="material-icons">groups</span>
        Teams
      </h1>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="teams-grid" *ngIf="!loading && !error">
        <a [routerLink]="['/teams', team.id]" class="team-card card" *ngFor="let team of teams">
          <img [src]="team.logo" [alt]="team.name" class="team-card__logo" onerror="this.src='assets/placeholder-team.png'">
          <h3 class="team-card__name">{{ team.name }}</h3>
          <span class="team-card__code" *ngIf="team.code">{{ team.code }}</span>
        </a>
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
    .teams-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px;
    }
    .team-card {
      display: flex; flex-direction: column; align-items: center; gap: 12px;
      padding: 24px 16px; text-decoration: none; color: #B0C4B1;
      transition: all 0.2s ease;
      &:hover { border-color: #D4AF37; transform: translateY(-2px); }
      &__logo { width: 64px; height: 64px; object-fit: contain; }
      &__name { font-size: 14px; font-weight: 600; color: #FFFFFF; text-align: center; }
      &__code { font-size: 12px; color: #6B8A6E; }
    }
  `]
})
export class TeamsComponent implements OnInit {
  teams: TeamShort[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<TeamShort[]>('/teams').subscribe({
      next: (res) => { this.teams = res.data ?? []; this.loading = false; },
      error: () => { this.error = 'Failed to load teams'; this.loading = false; }
    });
  }
}