import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';

interface NavItem {
  label: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'app-nav',
  template: `
    <nav class="navbar" [class.navbar--open]="menuOpen">
      <div class="navbar__brand" routerLink="/home">
        <span class="material-icons navbar__logo">sports_soccer</span>
        <span class="navbar__title">FIFA World Cup 2026</span>
      </div>
      <button class="navbar__toggle" (click)="toggleMenu()" [attr.aria-expanded]="menuOpen" aria-label="Toggle navigation">
        <span class="material-icons">{{ menuOpen ? 'close' : 'menu' }}</span>
      </button>
      <ul class="navbar__links" [class.navbar__links--open]="menuOpen">
        <li *ngFor="let item of navItems">
          <a [routerLink]="item.route" routerLinkActive="active" (click)="closeMenu()">
            <span class="material-icons">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </a>
        </li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      height: 64px;
      background: #1A2E1D;
      border-bottom: 2px solid #D4AF37;
      display: flex;
      align-items: center;
      padding: 0 16px;
      z-index: 1000;
    }

    .navbar__brand {
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;
      color: #D4AF37;
      font-weight: 700;
      font-size: 18px;
      white-space: nowrap;
    }

    .navbar__logo {
      font-size: 28px;
    }

    .navbar__toggle {
      display: none;
      background: none;
      border: none;
      color: #D4AF37;
      cursor: pointer;
      margin-left: auto;
      padding: 4px;

      .material-icons {
        font-size: 28px;
      }
    }

    .navbar__links {
      display: flex;
      list-style: none;
      margin-left: auto;
      gap: 4px;

      a {
        display: flex;
        align-items: center;
        gap: 6px;
        padding: 8px 14px;
        color: #B0C4B1;
        border-radius: 4px;
        font-size: 14px;
        font-weight: 500;
        transition: all 0.2s ease;
        white-space: nowrap;

        &:hover, &.active {
          color: #FFFFFF;
          background: #1A7A2E;
        }

        .material-icons {
          font-size: 18px;
        }
      }
    }

    @media (max-width: 1279px) {
      .navbar__toggle {
        display: block;
      }

      .navbar__links {
        display: none;
        position: absolute;
        top: 64px;
        left: 0;
        right: 0;
        flex-direction: column;
        background: #1A2E1D;
        border-bottom: 2px solid #D4AF37;
        padding: 8px 16px;
        gap: 0;

        &--open {
          display: flex;
        }

        a {
          padding: 12px 16px;
          border-radius: 0;
          border-bottom: 1px solid #2D4A30;
        }
      }
    }

    @media (max-width: 767px) {
      .navbar__title {
        font-size: 14px;
      }
    }
  `]
})
export class NavComponent {
  menuOpen = false;

  navItems: NavItem[] = [
    { label: 'Fixtures', route: '/fixtures', icon: 'event' },
    { label: 'Live', route: '/live', icon: 'live_tv' },
    { label: 'Standings', route: '/standings', icon: 'leaderboard' },
    { label: 'Bracket', route: '/bracket', icon: 'account_tree' },
    { label: 'Players', route: '/players', icon: 'person' },
    { label: 'Teams', route: '/teams', icon: 'groups' },
    { label: 'Venues', route: '/venues', icon: 'stadium' },
    { label: 'News', route: '/news', icon: 'article' }
  ];

  @HostListener('window:resize')
  onResize(): void {
    if (window.innerWidth >= 1280) {
      this.menuOpen = false;
    }
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}