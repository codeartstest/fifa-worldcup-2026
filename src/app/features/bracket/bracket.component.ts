import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { BracketRound, Fixture } from '../../shared/models/interfaces';

@Component({
  selector: 'app-bracket',
  template: `
    <div class="bracket container">
      <h1 class="page-title">
        <span class="material-icons">account_tree</span>
        Knockout Bracket
      </h1>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="bracket-scroll" *ngIf="!loading && !error">
        <div class="bracket-rounds">
          <div class="bracket-round" *ngFor="let round of rounds">
            <h2 class="round-title">{{ round.round }}</h2>
            <div class="round-matches">
              <div class="bracket-match card" *ngFor="let match of round.matches">
                <div class="bracket-match__team" [class.winner]="isWinner(match, 'home')">
                  <img [src]="match.homeTeam.logo" [alt]="match.homeTeam.name" class="bracket-match__logo" onerror="this.src='assets/placeholder-team.png'">
                  <span class="bracket-match__name">{{ match.homeTeam.name }}</span>
                  <span class="bracket-match__score">{{ match.goalsHome ?? '-' }}</span>
                </div>
                <div class="bracket-match__team" [class.winner]="isWinner(match, 'away')">
                  <img [src]="match.awayTeam.logo" [alt]="match.awayTeam.name" class="bracket-match__logo" onerror="this.src='assets/placeholder-team.png'">
                  <span class="bracket-match__name">{{ match.awayTeam.name }}</span>
                  <span class="bracket-match__score">{{ match.goalsAway ?? '-' }}</span>
                </div>
                <div class="bracket-match__date" *ngIf="match.date">{{ match.date | date:'shortDate' }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="no-results" *ngIf="!loading && !error && rounds.length === 0">
        <p>Knockout stage bracket will be available once group stage concludes</p>
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
    .bracket-scroll { overflow-x: auto; padding-bottom: 16px; }
    .bracket-rounds { display: flex; gap: 24px; min-width: max-content; }
    .bracket-round { min-width: 260px; }
    .round-title { font-size: 16px; color: #D4AF37; margin-bottom: 12px; text-align: center; font-weight: 600; }
    .round-matches { display: flex; flex-direction: column; gap: 12px; }
    .bracket-match {
      padding: 12px;
      &__team {
        display: flex; align-items: center; gap: 8px; padding: 6px 0;
        font-size: 13px; color: #B0C4B1;
        &.winner { color: #D4AF37; font-weight: 600; }
      }
      &__logo { width: 22px; height: 22px; object-fit: contain; }
      &__name { flex: 1; }
      &__score { font-weight: 700; min-width: 20px; text-align: right; }
      &__date { font-size: 11px; color: #6B8A6E; margin-top: 4px; }
    }
    .no-results { text-align: center; padding: 60px 20px; color: #6B8A6E; }
  `]
})
export class BracketComponent implements OnInit {
  rounds: BracketRound[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<BracketRound[]>('/bracket').subscribe({
      next: (res) => { this.rounds = res.data ?? []; this.loading = false; },
      error: () => { this.error = 'Failed to load bracket'; this.loading = false; }
    });
  }

  isWinner(match: Fixture, side: 'home' | 'away'): boolean {
    if (match.goalsHome === null || match.goalsAway === null) return false;
    return side === 'home' ? match.goalsHome > match.goalsAway : match.goalsAway > match.goalsHome;
  }
}