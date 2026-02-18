import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface AcademicPartner {
    institution: string;
    partnership: string;
}

@Component({
    selector: 'app-academic-partners',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'academic-partners-container'
    },
    template: `
    <div class="partners-header">
      <h2 class="title">{{ title() }}</h2>
      <p class="subtitle">{{ subtitle() }}</p>
    </div>

    @if (introText()) {
      <p class="intro-text">{{ introText() }}</p>
    }

    <ul class="partners-table">
      @for (partner of partners(); track $index) {
        <li class="partner-row">
          <span class="col-institution">{{ partner.institution }}</span>
          <span class="col-partnership">{{ partner.partnership }}</span>
        </li>
      }
    </ul>

    @if (outroText()) {
      <p class="outro-text">{{ outroText() }}</p>
    }
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

    .partners-header {
      margin-bottom: 3rem;
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

    .intro-text, .outro-text {
      font-size: 1.1rem;
      line-height: 1.6;
      max-width: 800px;
      margin-bottom: 3rem;
      color: #333;
    }

    .outro-text {
      margin-top: 3rem;
      margin-bottom: 0;
    }

    .partners-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
    }

    .partner-row {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: flex-start; /* Align top for multi-line text */
      gap: 2rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      transition: all 0.3s ease;
      font-size: 1rem;
      color: #666;
    }

    .partner-row:hover {
      color: #000;
      border-bottom-color: rgba(0,0,0,0.2);
    }

    .col-institution {
      font-weight: 600;
      color: #000;
      font-size: 1.2rem;
    }

    .col-partnership {
      line-height: 1.5;
    }

    @media (max-width: 768px) {
      .title {
        font-size: 2.5rem;
      }

      .partner-row {
        grid-template-columns: 1fr;
        gap: 0.5rem;
      }
      
      .col-institution {
        font-size: 1.1rem;
        margin-bottom: 0.25rem;
      }
    }
  `
})
export class AcademicPartnersComponent {
    partners = input.required<AcademicPartner[]>();
    title = input<string>('Academic Partners');
    subtitle = input<string>('WE ALWAYS WORK AS A TEAM');
    introText = input<string>('');
    outroText = input<string>('');
}
