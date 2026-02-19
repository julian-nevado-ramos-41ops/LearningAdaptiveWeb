import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface KPI {
    value: string;
    description: string;
}

@Component({
    selector: 'app-kpis',
    standalone: true,
    imports: [CommonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'class': 'kpis-container'
    },
    template: `
    <div class="kpis-header">
      <h2 class="title">{{ title() }}</h2>
      <p class="subtitle">{{ subtitle() }}</p>
    </div>

    <ul class="kpis-table">
      @for (kpi of kpis(); track $index) {
        <li class="kpi-row">
          <span class="col-value">{{ kpi.value }}</span>
          <div class="col-description-container">
            <div class="col-description-track">
                <span class="col-description">{{ kpi.description }}</span>
                <span class="col-description">{{ kpi.description }}</span>
                <span class="col-description">{{ kpi.description }}</span>
                <span class="col-description">{{ kpi.description }}</span>
            </div>
          </div>
        </li>
      }
    </ul>
  `,
    styles: `
    :host {
      display: block;
      width: 100%;
      /* height: 100%;  Let it take natural height */
      padding: 4rem 5%;
      color: var(--text-muted, #666);
      font-family: 'Inter', sans-serif;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      box-sizing: border-box;
      overflow: hidden; /* Ensure marquee doesn't imply horizontal scrollbar on body */
    }

    .kpis-header {
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

    .kpis-table {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      width: 100%;
      max-width: 900px; /* Added to prevent spanning full width */
    }

    .kpi-row {
      display: grid;
      grid-template-columns: 1fr 2fr;
      align-items: center;
      gap: 2rem;
      padding: 1rem 0;
      border-bottom: 1px solid rgba(0,0,0,0.05);
      font-size: 0.9rem;
      color: #666;
    }

    .kpi-row:hover {
      border-bottom-color: rgba(0,0,0,0.2);
    }
    
    .kpi-row:hover .col-value {
        color: #000;
    }

    .col-value {
      font-weight: 600;
      color: #333;
      font-size: 2rem; /* Reduced from 3rem */
      line-height: 1;
      white-space: nowrap;
      transition: color 0.3s ease;
    }

    /* Tunnel/Marquee Effect */
    .col-description-container {
        overflow: hidden;
        white-space: nowrap;
        position: relative;
        mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
    }

    .col-description-track {
        display: inline-flex;
        /* gap: 4rem; REMOVED to rely on padding for precise loop calculation */
        animation: tunnelScroll 20s linear infinite;
        width: fit-content; /* Ensure it takes width of content */
    }

    .col-description {
        font-size: 1.2rem; /* Reduced from 2rem */
        font-weight: 300;
        color: #888;
        text-transform: uppercase;
        padding-right: 8rem; /* Increased from 2rem for more space between repetitions */
    }

    @keyframes tunnelScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); } /* -50% works if content is duplicated once (2 sets total). we have 4 items. if items 1&2 are same as 3&4, this is perfect seamless loop. */
    }

    @media (max-width: 768px) {
      .title {
        font-size: 2.5rem;
      }

      .kpi-row {
        grid-template-columns: 1fr;
        gap: 1rem;
      }
      
      .col-value {
        font-size: 1.5rem;
      }
      
      .col-description {
        font-size: 0.9rem;
      }
    }
  `
})
export class KpisComponent {
    kpis = input.required<KPI[]>();
    title = input<string>('KPIs');
    subtitle = input<string>('A COHERENT YET AMBITIOUS OUTREACH');
}
