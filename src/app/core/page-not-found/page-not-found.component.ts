import { Component } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `
    <div class="not-found">
      <span class="material-icons not-found__icon">error_outline</span>
      <h1>404</h1>
      <p>Page Not Found</p>
      <a routerLink="/home" class="btn btn-accent">Go to Homepage</a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 60vh;
      text-align: center;
      color: #B0C4B1;

      &__icon {
        font-size: 80px;
        color: #D4AF37;
        margin-bottom: 16px;
      }

      h1 {
        font-size: 72px;
        font-weight: 700;
        color: #FFFFFF;
        margin-bottom: 8px;
      }

      p {
        font-size: 20px;
        margin-bottom: 24px;
      }
    }
  `]
})
export class PageNotFoundComponent {}