import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Fixture } from '../../shared/models/interfaces';

@Component({
  selector: 'app-home',
  template: `
    <div class="home container">
      <section class="hero">
        <h1 class="hero__title">FIFA World Cup 2026</h1>
        <p class="hero__subtitle">United States &bull; Mexico &bull; Canada</p>
        <p class="hero__dates">June 11 &ndash; July 19, 2026</p>
      </section>

      <section class="live-section" *ngIf="liveMatches.length > 0">
        <h2 class="section-title">
          <span class="material-icons">live_tv</span>
          Live Matches
        </h2>
        <div class="matches-grid">
          <div class="match-card card" *ngFor="let match of liveMatches">
            <div class="match-card__status match-card__status--live">LIVE</div>
            <div class="match-card__teams">
              <div class="match-card__team">
                <img [src]="match.homeTeam.logo" [alt]="match.homeTeam.name" class="match-card__logo" onerror="this.src='assets/placeholder-team.png'">
                <span>{{ match.homeTeam.name }}</span>
              </div>
              <div class="match-card__score">
                <span class="match-card__goals">{{ match.goalsHome ?? 0 }}</span>
                <span class="match-card__dash">&ndash;</span>
                <span class="match-card__goals">{{ match.goalsAway ?? 0 }}</span>
              </div>
              <div class="match-card__team">
                <img [src]="match.awayTeam.logo" [alt]="match.awayTeam.name" class="match-card__logo" onerror="this.src='assets/placeholder-team.png'">
                <span>{{ match.awayTeam.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="quick-links">
        <h2 class="section-title">Quick Access</h2>
        <div class="links-grid">
          <a routerLink="/fixtures" class="link-card card">
            <span class="material-icons">event</span>
            <span>Fixtures</span>
          </a>
          <a routerLink="/standings" class="link-card card">
            <span class="material-icons">leaderboard</span>
            <span>Standings</span>
          </a>
          <a routerLink="/bracket" class="link-card card">
            <span class="material-icons">account_tree</span>
            <span>Bracket</span>
          </a>
          <a routerLink="/players" class="link-card card">
            <span class="material-icons">person</span>
            <span>Players</span>
          </a>
          <a routerLink="/teams" class="link-card card">
            <span class="material-icons">groups</span>
            <span>Teams</span>
          </a>
          <a routerLink="/venues" class="link-card card">
            <span class="material-icons">stadium</span>
            <span>Venues</span>
          </a>
          <a routerLink="/news" class="link-card card">
            <span class="material-icons">article</span>
            <span>News</span>
          </a>
          <a routerLink="/live" class="link-card card">
            <span class="material-icons">live_tv</span>
            <span>Live</span>
          </a>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .hero {
      text-align: center;
      padding: 60px 0 40px;

      &__title {
        font-size: 48px;
        font-weight: 700;
        color: #D4AF37;
        margin-bottom: 8px;
      }

      &__subtitle {
        font-size: 20px;
        color: #B0C4B1;
        margin-bottom: 4px;
      }

      &__dates {
        font-size: 16px;
        color: #6B8A6E;
      }
    }

    .section-title {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 24px;
      font-weight: 600;
      color: #D4AF37;
      margin-bottom: 20px;

      .material-icons { font-size: 28px; }
    }

    .matches-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 16px;
      margin-bottom: 40px;
    }

    .match-card {
      &__status--live {
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        color: #E53935;
        margin-bottom: 12px;
        animation: pulse 1.5s infinite;
      }

      &__teams {
        display: flex;
        flex-direction: column;
        gap: 12px;
        align-items: center;
      }

      &__team {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 14px;
        color: #FFFFFF;
      }

      &__logo {
        width: 32px;
        height: 32px;
        object-fit: contain;
      }

      &__score {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 28px;
        font-weight: 700;
        color: #D4AF37;
      }

      &__dash { color: #6B8A6E; }
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
      gap: 12px;
    }

    .link-card {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      padding: 24px 16px;
      text-decoration: none;
      color: #B0C4B1;
      transition: all 0.2s ease;

      &:hover {
        border-color: #D4AF37;
        color: #D4AF37;
        transform: translateY(-2px);
      }

      .material-icons { font-size: 36px; }
      span:last-child { font-weight: 500; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.4; }
    }

    @media (max-width: 767px) {
      .hero__title { font-size: 32px; }
      .hero__subtitle { font-size: 16px; }
    }
  `]
})
export class HomeComponent implements OnInit {
  liveMatches: Fixture[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<Fixture[]>('/matches/live').subscribe({
      next: (res) => { this.liveMatches = res.data ?? []; },
      error: () => { this.liveMatches = []; }
    });
  }
}