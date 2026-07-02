import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/services/api.service';
import { NewsArticle } from '../../shared/models/interfaces';

@Component({
  selector: 'app-news',
  template: `
    <div class="news container">
      <h1 class="page-title">
        <span class="material-icons">article</span>
        Tournament News
      </h1>

      <div class="filters">
        <button *ngFor="let cat of categories" (click)="filterCategory = cat"
                [class.active]="filterCategory === cat" class="filter-btn">
          {{ cat }}
        </button>
      </div>

      <div class="loading-spinner" *ngIf="loading"></div>
      <div class="error-message" *ngIf="error">{{ error }}</div>

      <div class="news-grid" *ngIf="!loading && !error">
        <div class="news-card card" *ngFor="let article of filteredArticles">
          <div class="news-card__image" *ngIf="article.image">
            <img [src]="article.image" [alt]="article.title" onerror="this.style.display='none'">
          </div>
          <div class="news-card__content">
            <span class="news-card__category">{{ article.category }}</span>
            <h3 class="news-card__title">{{ article.title }}</h3>
            <p class="news-card__summary">{{ article.summary }}</p>
            <div class="news-card__meta">
              <span>{{ article.author }}</span>
              <span>{{ article.date | date:'mediumDate' }}</span>
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
    .filters { display: flex; gap: 8px; margin-bottom: 20px; flex-wrap: wrap; }
    .filter-btn {
      padding: 6px 16px; border: 1px solid #2D4A30; border-radius: 20px;
      background: transparent; color: #B0C4B1; font-size: 13px; cursor: pointer;
      transition: all 0.2s ease;
      &.active, &:hover { background: #1A7A2E; border-color: #1A7A2E; color: #FFFFFF; }
    }
    .news-grid {
      display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 16px;
    }
    .news-card {
      padding: 0; overflow: hidden;
      &__image { height: 200px; overflow: hidden; img { width: 100%; height: 100%; object-fit: cover; } }
      &__content { padding: 16px; }
      &__category {
        display: inline-block; font-size: 11px; font-weight: 600; color: #1A7A2E;
        background: #D4AF37; padding: 2px 8px; border-radius: 3px; margin-bottom: 8px;
        text-transform: uppercase;
      }
      &__title { font-size: 18px; color: #FFFFFF; margin-bottom: 8px; line-height: 1.4; }
      &__summary { font-size: 14px; color: #B0C4B1; line-height: 1.5; margin-bottom: 12px; }
      &__meta {
        display: flex; justify-content: space-between; font-size: 12px; color: #6B8A6E;
      }
    }
  `]
})
export class NewsComponent implements OnInit {
  articles: NewsArticle[] = [];
  filteredArticles: NewsArticle[] = [];
  loading = true;
  error = '';
  filterCategory = 'All';
  categories: string[] = ['All'];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.api.get<NewsArticle[]>('/news').subscribe({
      next: (res) => {
        this.articles = res.data ?? [];
        const cats = [...new Set(this.articles.map(a => a.category))];
        this.categories = ['All', ...cats];
        this.filteredArticles = this.articles;
        this.loading = false;
      },
      error: () => { this.error = 'Failed to load news'; this.loading = false; }
    });
  }

  set filterCategory(cat: string) {
    this._filterCategory = cat;
    this.filteredArticles = cat === 'All'
      ? this.articles
      : this.articles.filter(a => a.category === cat);
  }
  get filterCategory(): string { return this._filterCategory; }
  private _filterCategory = 'All';
}