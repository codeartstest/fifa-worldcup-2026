import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { Venue } from '../../shared/models/interfaces';

@Component({
  selector: 'app-venues',
  template: `
    <div class="venues container">
      <h1 class="page-title">
        <span class="material-icons">stadium</span>
        Venues
      </h1>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="venues-grid" *ngIf="!loading && !error">
        <div class="venue-card card" *ngFor="let venue of venues">
          <div class="venue-card__image" *ngIf="venue.image">
            <img [src]="venue.image" [alt]="venue.name" onerror="this.style.display='none'">
          </div>
          <div class="venue-card__placeholder" *ngIf="!venue.image">
            <span class="material-icons">stadium</span>
          </div>
          <div class="venue-card__info">
            <h3 class="venue-card__name">{{ venue.name }}</h3>
            <p class="venue-card__location">
              <span class="material-icons">location_on</span>
              {{ venue.city }}, {{ venue.country }}
            </p>
            <div class="venue-card__details">
              <span class="venue-card__detail">
                <span class="material-icons">people</span>
                {{ venue.capacity?.toLocaleString() }} seats
              </span>
              <span class="venue-card__detail" *ngIf="venue.surface">
                <span class="material-icons">grass</span>
                {{ venue.surface }}
              </span>
            </div>
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
    .venues-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 16px;
    }
    .venue-card {
      padding: 0; overflow: hidden;
      &__image {
        height: 180px; overflow: hidden;
        img { width: 100%; height: 100%; object-fit: cover; }
      }
      &__placeholder {
        height: 180px; display: flex; align-items: center; justify-content: center;
        background: #0D1B0F;
        .material-icons { font-size: 64px; color: #2D4A30; }
      }
      &__info { padding: 16px; }
      &__name { font-size: 18px; color: #D4AF37; margin-bottom: 8px; }
      &__location {
        display: flex; align-items: center; gap: 4px;
        font-size: 14px; color: #B0C4B1; margin-bottom: 12px;
        .material-icons { font-size: 16px; }
      }
      &__details { display: flex; gap: 16px; }
      &__detail {
        display: flex; align-items: center; gap: 4px;
        font-size: 13px; color: #6B8A6E;
        .material-icons { font-size: 16px; }
      }
    }
  `]
})
export class VenuesComponent implements OnInit {
  venues: Venue[] = [];
  loading = true;
  error = '';

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<Venue[]>('/venues').subscribe({
      next: (res) => { this.venues = res.data ?? []; this.loading = false; },
      error: () => { this.error = 'Failed to load venues'; this.loading = false; }
    });
  }
}