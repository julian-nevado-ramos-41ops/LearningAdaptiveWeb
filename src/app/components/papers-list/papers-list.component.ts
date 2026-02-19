import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Paper {
  Title: string;
  Link: string;
  Pages: string;
  Date: string;
}

@Component({
  selector: 'app-papers-list',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'papers-list-container'
  },
  template: `
    <div class="papers-header">
      <h2 class="title">{{ title() }}</h2>
      <p class="subtitle">{{ subtitle() }}</p>
    </div>
    <ul class="papers-table">
      @for (paper of papers(); track $index) {
        <li class="paper-row">
          <a [href]="paper.Link" target="_blank" rel="noopener noreferrer" class="col-title">
            {{ paper.Title }}
            <svg class="arrow-icon" width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <span class="col-pages">{{ paper.Pages }} pp</span>
          <span class="col-date">{{ paper.Date }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    :host {
      display: block;
      width: 100%;
      height: 100%;
      padding: 4rem 5%;
      color: var(--text-muted, #666);
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
    }

    .papers-header {
      margin-bottom: 4rem;
    }

    .title {
      font-family: 'Inter', sans-serif;
      font-size: 4rem;
      font-weight: 400;
      color: #000;
      margin-bottom: 0.5rem;
      letter-spacing: -1px;
    }

    .subtitle {
      font-family: 'Courier New', monospace;
      color: var(--color-1, #E85D04);
      font-size: 0.9rem;
      letter-spacing: 2px;
      text-transform: uppercase;
      margin-left: 0.2rem;
    }

    .papers-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
      width: 100%;
    }

    .paper-row {
      display: grid;
      grid-template-columns: 1fr 100px 150px;
      align-items: center;
      gap: 2rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      font-size: 0.95rem;
      color: #666;
    }

    .paper-row:hover {
      color: #000;
      border-bottom-color: rgba(0,0,0,0.2);
    }

    .col-title {
      color: inherit;
      text-decoration: none;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      cursor: pointer;
    }

    .col-title:hover {
        color: var(--color-1, #E85D04);
    }

    .arrow-icon {
        opacity: 0;
        transition: opacity 0.2s ease, transform 0.2s ease;
    }

    .paper-row:hover .arrow-icon {
        opacity: 1;
        transform: translate(2px, -2px);
    }

    .col-pages {
      text-align: right;
      opacity: 0.7;
      font-family: 'Courier New', monospace;
    }

    .col-date {
      text-align: right;
      opacity: 0.8;
      font-variant-numeric: tabular-nums;
    }

    @media (max-width: 768px) {
      .title {
        font-size: 2.5rem;
      }

      .paper-row {
        grid-template-columns: 1fr auto;
        grid-template-areas: 
            "title title"
            "pages date";
        gap: 0.5rem;
        padding-bottom: 1rem;
      }

      .col-title {
        grid-area: title;
        font-size: 1.1rem;
      }
      
      .col-pages {
        grid-area: pages;
        text-align: left;
      }

      .col-date {
        grid-area: date;
      }
    }
  `
})
export class PapersListComponent {
  papers = input.required<Paper[]>();
  title = input<string>('White Papers');
  subtitle = input<string>('A LONG RUN PROJECT');
}
