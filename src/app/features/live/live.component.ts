import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../core/services/api.service';
import { Fixture, MatchEvent } from '../../shared/models/interfaces';
import { Subscription, interval } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-live',
  template: `
    <div class="live container">
      <h1 class="page-title">
        <span class="material-icons">live_tv</span>
        Live Scores
      </h1>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="matches-grid" *ngIf="!loading && !error">
        <div class="match-card card" *ngFor="let match of liveMatches">
          <div class="match-card__live-indicator">
            <span class="pulse"></span> LIVE
          </div>
          <div class="match-card__content">
            <div class="match-card__team-row">
              <img [src]="match.homeTeam.logo" [alt]="match.homeTeam.name" class="match-card__logo" onerror="this.src='assets/placeholder-team.png'">
              <span class="match-card__name">{{ match.homeTeam.name }}</span>
              <span class="match-card__goals">{{ match.goalsHome ?? 0 }}</span>
            </div>
            <div class="match-card__team-row">
              <img [src]="match.awayTeam.logo" [alt]="match.awayTeam.name" class="match-card__logo" onerror="this.src='assets/placeholder-team.png'">
              <span class="match-card__name">{{ match.awayTeam.name }}</span>
              <span class="match-card__goals">{{ match.goalsAway ?? 0 }}</span>
            </div>
          </div>
          <div class="match-card__status">{{ match.status }}</div>
          <a [routerLink]="['/live', match.id]" class="match-card__detail-link">Match Details</a>
        </div>
      </div>

      <div class="no-results" *ngIf="!loading && !error && liveMatches.length === 0">
        <span class="material-icons" style="font-size:48px;color:#6B8A6E">sports_soccer</span>
        <p>No live matches at the moment</p>
        <p class="hint">Check back during match hours</p>
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
    .matches-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;
    }
    .match-card {
      &__live-indicator {
        display: flex; align-items: center; gap: 6px;
        font-size: 12px; font-weight: 700; color: #E53935;
        margin-bottom: 12px;
        .pulse {
          width: 8px; height: 8px; background: #E53935; border-radius: 50%;
          animation: pulse 1.5s infinite;
        }
      }
      &__content { display: flex; flex-direction: column; gap: 8px; }
      &__team-row {
        display: flex; align-items: center; gap: 8px; font-size: 14px; color: #FFFFFF;
      }
      &__logo { width: 28px; height: 28px; object-fit: contain; }
      &__name { flex: 1; }
      &__goals { font-size: 20px; font-weight: 700; color: #D4AF37; }
      &__status { font-size: 12px; color: #6B8A6E; margin-top: 8px; }
      &__detail-link { font-size: 13px; color: #D4AF37; margin-top: 4px; }
    }
    .no-results {
      text-align: center; padding: 60px 20px; color: #6B8A6E;
      p { margin-top: 12px; font-size: 18px; }
      .hint { font-size: 14px; color: #4A6A4D; }
    }
    @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }
  `]
})
export class LiveComponent implements OnInit, OnDestroy {
  liveMatches: Fixture[] = [];
  loading = true;
  error = '';
  private pollSub?: Subscription;

  constructor(private api: ApiService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadLive();
    this.pollSub = interval(30000).pipe(
      switchMap(() => this.api.get<Fixture[]>('/matches/live'))
    ).subscribe({
      next: (res) => { this.liveMatches = res.data ?? []; },
      error: () => {}
    });
  }

  ngOnDestroy(): void {
    this.pollSub?.unsubscribe();
  }

  loadLive(): void {
    this.loading = true;
    this.api.get<Fixture[]>('/matches/live').subscribe({
      next: (res) => { this.liveMatches = res.data ?? []; this.loading = false; },
      error: () => { this.error = 'Failed to load live matches'; this.loading = false; }
    });
  }
}