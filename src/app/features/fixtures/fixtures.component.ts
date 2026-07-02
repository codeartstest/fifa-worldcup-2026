import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Fixture } from '../../shared/models/interfaces';

@Component({
  selector: 'app-fixtures',
  template: `
    <div class="fixtures container">
      <h1 class="page-title">
        <span class="material-icons">event</span>
        Match Fixtures
      </h1>

      <div class="filters">
        <input type="date" [(ngModel)]="dateFilter" (change)="loadFixtures()" class="filter-input" placeholder="Filter by date">
        <select [(ngModel)]="roundFilter" (change)="loadFixtures()" class="filter-input">
          <option value="">All Rounds</option>
          <option *ngFor="let r of rounds" [value]="r">{{ r }}</option>
        </select>
      </div>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="fixtures-list" *ngIf="!loading && !error">
        <div class="fixture-card card" *ngFor="let fixture of filteredFixtures">
          <div class="fixture-card__round">{{ fixture.round }}</div>
          <div class="fixture-card__date">{{ fixture.date | date:'medium' }}</div>
          <div class="fixture-card__teams">
            <div class="fixture-card__team">
              <img [src]="fixture.homeTeam.logo" [alt]="fixture.homeTeam.name" class="fixture-card__logo" onerror="this.src='assets/placeholder-team.png'">
              <span>{{ fixture.homeTeam.name }}</span>
            </div>
            <div class="fixture-card__score">
              <span *ngIf="fixture.goalsHome !== null">{{ fixture.goalsHome }} &ndash; {{ fixture.goalsAway }}</span>
              <span *ngIf="fixture.goalsHome === null">vs</span>
            </div>
            <div class="fixture-card__team">
              <img [src]="fixture.awayTeam.logo" [alt]="fixture.awayTeam.name" class="fixture-card__logo" onerror="this.src='assets/placeholder-team.png'">
              <span>{{ fixture.awayTeam.name }}</span>
            </div>
          </div>
          <div class="fixture-card__status" [class]="'fixture-card__status--' + fixture.statusShort.toLowerCase()">
            {{ fixture.status }}
          </div>
          <a [routerLink]="['/live', fixture.id]" class="fixture-card__link" *ngIf="fixture.statusShort === '1H' || fixture.statusShort === '2H' || fixture.statusShort === 'HT' || fixture.statusShort === 'ET' || fixture.statusShort === 'P'">
            <span class="material-icons">visibility</span> View Live
          </a>
        </div>
      </div>

      <div class="no-results" *ngIf="!loading && !error && filteredFixtures.length === 0">
        <p>No fixtures found</p>
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
    .filters {
      display: flex; gap: 12px; margin-bottom: 20px; flex-wrap: wrap;
    }
    .filter-input {
      padding: 8px 12px; background: #1A2E1D; border: 1px solid #2D4A30;
      border-radius: 4px; color: #FFFFFF; font-size: 14px;
    }
    .fixtures-list { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 16px; }
    .fixture-card {
      &__round { font-size: 12px; color: #D4AF37; font-weight: 600; margin-bottom: 8px; }
      &__date { font-size: 12px; color: #6B8A6E; margin-bottom: 12px; }
      &__teams { display: flex; flex-direction: column; align-items: center; gap: 8px; }
      &__team { display: flex; align-items: center; gap: 8px; font-size: 14px; color: #FFFFFF; }
      &__logo { width: 28px; height: 28px; object-fit: contain; }
      &__score { font-size: 20px; font-weight: 700; color: #D4AF37; }
      &__status { font-size: 12px; color: #6B8A6E; margin-top: 8px; text-align: center;
        &--1h, &--2h, &--ht, &--et, &--p { color: #E53935; font-weight: 700; }
        &--ft { color: #43A047; font-weight: 700; }
      }
      &__link { display: inline-flex; align-items: center; gap: 4px; margin-top: 8px; color: #D4AF37; font-size: 13px; }
    }
    .no-results { text-align: center; padding: 40px; color: #6B8A6E; }
  `]
})
export class FixturesComponent implements OnInit {
  fixtures: Fixture[] = [];
  filteredFixtures: Fixture[] = [];
  loading = true;
  error = '';
  dateFilter = '';
  roundFilter = '';
  rounds: string[] = [];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.loadFixtures();
  }

  loadFixtures(): void {
    this.loading = true;
    this.error = '';
    this.api.get<Fixture[]>('/fixtures').subscribe({
      next: (res) => {
        this.fixtures = res.data ?? [];
        this.rounds = [...new Set(this.fixtures.map(f => f.round))].sort();
        this.applyFilters();
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load fixtures';
        this.loading = false;
      }
    });
  }

  applyFilters(): void {
    this.filteredFixtures = this.fixtures.filter(f => {
      if (this.dateFilter && !f.date.startsWith(this.dateFilter)) return false;
      if (this.roundFilter && f.round !== this.roundFilter) return false;
      return true;
    });
  }
}