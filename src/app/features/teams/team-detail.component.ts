import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { TeamDetail } from '../../shared/models/interfaces';

@Component({
  selector: 'app-team-detail',
  template: `
    <div class="team-detail container">
      <a routerLink="/teams" class="back-link">
        <span class="material-icons">arrow_back</span> All Teams
      </a>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="team-header card" *ngIf="team && !loading">
        <img [src]="team.logo" [alt]="team.name" class="team-header__logo" onerror="this.src='assets/placeholder-team.png'">
        <div class="team-header__info">
          <h1>{{ team.name }}</h1>
          <p class="team-header__meta">
            <span *ngIf="team.code">{{ team.code }}</span>
            <span *ngIf="team.country">{{ team.country }}</span>
            <span *ngIf="team.founded">Est. {{ team.founded }}</span>
          </p>
          <p class="team-header__venue" *ngIf="team.venue">
            <span class="material-icons">stadium</span> {{ team.venue }}
          </p>
        </div>
      </div>

      <div class="squad card" *ngIf="team?.squad && !loading">
        <h2>Squad</h2>
        <div class="squad-grid">
          <div class="player-card" *ngFor="let player of team.squad">
            <img [src]="player.photo" [alt]="player.name" class="player-card__photo" onerror="this.src='assets/placeholder-player.png'">
            <div class="player-card__info">
              <span class="player-card__name">{{ player.name }}</span>
              <span class="player-card__position">{{ player.position }}</span>
              <span class="player-card__number" *ngIf="player.number">#{{ player.number }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .back-link {
      display: inline-flex; align-items: center; gap: 4px;
      color: #D4AF37; font-size: 14px; margin: 20px 0 16px;
    }
    .team-header {
      display: flex; align-items: center; gap: 24px; padding: 24px;
      &__logo { width: 96px; height: 96px; object-fit: contain; }
      &__info h1 { font-size: 28px; color: #D4AF37; margin-bottom: 8px; }
      &__meta { display: flex; gap: 12px; font-size: 14px; color: #B0C4B1; margin-bottom: 4px; }
      &__venue { display: flex; align-items: center; gap: 6px; font-size: 14px; color: #6B8A6E; .material-icons { font-size: 18px; } }
    }
    .squad { margin-top: 20px;
      h2 { font-size: 20px; color: #D4AF37; margin-bottom: 16px; }
    }
    .squad-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 12px;
    }
    .player-card {
      display: flex; align-items: center; gap: 10px; padding: 10px;
      background: #0D1B0F; border-radius: 6px;
      &__photo { width: 40px; height: 40px; border-radius: 50%; object-fit: cover; }
      &__info { display: flex; flex-direction: column; }
      &__name { font-size: 13px; color: #FFFFFF; font-weight: 500; }
      &__position { font-size: 11px; color: #6B8A6E; }
      &__number { font-size: 11px; color: #D4AF37; }
    }
    @media (max-width: 767px) {
      .team-header { flex-direction: column; text-align: center; }
    }
  `]
})
export class TeamDetailComponent implements OnInit {
  team!: TeamDetail;
  loading = true;
  error = '';

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.api.get<TeamDetail>(`/teams/${id}`).subscribe({
        next: (res) => { this.team = res.data; this.loading = false; },
        error: () => { this.error = 'Failed to load team details'; this.loading = false; }
      });
    }
  }
}