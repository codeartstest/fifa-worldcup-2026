import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-nav></app-nav>
    <main class="main-content">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    .main-content {
      min-height: calc(100vh - 64px);
      padding-top: 64px;
    }
  `]
})
export class AppComponent {
  title = 'FIFA World Cup 2026';
}