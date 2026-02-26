import { Component, ChangeDetectionStrategy, signal, viewChild, computed, inject } from '@angular/core';
import { TranslationService } from './i18n';
import { HeroComponent } from './components/hero/hero.component';
import { SectionsContainerComponent } from './components/sections-container/sections-container.component';
import { SectionComponent } from './components/section/section.component';
import { AwardsListComponent } from './components/awards-list/awards-list.component';
import { LogoCarouselComponent } from './components/logo-carousel/logo-carousel.component';
import { NavBarComponent, NavCommand } from './components/nav-bar/nav-bar.component';
import { PartStwComponent } from './components/part-stw/part-stw.component';
import { PreloaderComponent } from './components/preloader/preloader.component';
import { CursorFollowerComponent } from './components/cursor-follower/cursor-follower.component';
import { PapersListComponent, Paper } from './components/papers-list/papers-list.component';
import { AcademicPartnersComponent, AcademicPartner } from './components/academic-partners/academic-partners.component';
import { KpisComponent, KPI } from './components/kpis/kpis.component';
import { HudOverlayComponent } from './components/hud-overlay/hud-overlay.component';
import { CookieBannerComponent } from './components/cookie-banner/cookie-banner.component';

import { CollapsibleListComponent, CollapsibleItem } from './components/collapsible-list/collapsible-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { AccordionComponent } from './components/accordion/accordion.component';
import { FooterComponent } from './components/footer/footer.component';

interface SectionData {
  id: number;
  title: string;
  subtitle: string;
  backgroundColor: string;
  textColor?: string;
  image?: string;
  secondaryImage?: string;
  modalContent?: string;
  prompt?: string;
  llmLinks?: { label: string, url: string }[];
  customContent?: string;
}

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NavBarComponent,
    HeroComponent,
    SectionsContainerComponent,
    SectionComponent,
    AwardsListComponent,
    LogoCarouselComponent,
    PartStwComponent,

    PreloaderComponent,
    CursorFollowerComponent,
    PapersListComponent,
    AcademicPartnersComponent,
    CollapsibleListComponent,

    KpisComponent,
    AccordionComponent,
    ContactUsComponent,
    HudOverlayComponent,
    CookieBannerComponent,
    FooterComponent,
  ],
  template: `
    <app-preloader />
    <app-cursor-follower />
    <app-hud-overlay />

    <app-nav-bar 
      [logo]="{ src: 'img/logo-nav-bar.gif', alt: 'Algorithmization', link: '/' }"
      [menuItems]="navItems()" 
      variant="glass"
      topOffset="20px"
      borderRadius="10px"
      fontFamily="'PP Supply Mono Regular', 'PP Supply Mono Regular Placeholder', monospace"
    />

    <app-hero 
      [title]="ts.t().hero.title" 
      [subtitle]="ts.t().hero.subtitle" 
      [showBrackets]="true"
      bracketsColor="var(--color-1)"
      subtitleColor="gray"
      description=""
    />

    <app-part-stw
      [titleHtml]="ts.t().partStw.titleHtml"
      [description]="ts.t().partStw.description"
    />

    <app-accordion
      id="accordion"
      mode="scroll"
      [cards]="accordionItems()"
      [sectionTitle]="ts.t().accordion.sectionTitle"
      [sectionSubtitle]="ts.t().accordion.sectionSubtitle"
    />

    <div class="papers-block" id="papers">
      <app-papers-list [papers]="papers()" [title]="ts.t().papers.title" [subtitle]="ts.t().papers.subtitle" />
    </div>

    <div class="kpis-block" id="kpis">
      <app-kpis
        [kpis]="kpisData()"
        [title]="ts.t().kpis.title"
        [subtitle]="ts.t().kpis.subtitle"
      />
    </div>

    <app-sections-container
      layout="horizontal"
      viewportHeightVh="85"
      (sectionChanged)="onSectionChanged($event)"
      (navigateRequest)="handleNavigateRequest($event)"
      #horizontalContainerCollapsible
      id="horizontal-collapsible"
    >
      @for (section of horizontalSectionsStructure(); track section.id; let i = $index, count = $count) {
        <app-section
          [id]="section.id"
          [title]="section.title"
          [subtitle]="section.subtitle"
          [backgroundColor]="section.backgroundColor"
          [textColor]="section.textColor || '#ffffff'"
          [sectionIndex]="i"
          [totalSections]="count"
          [globalCurrentSection]="currentSection()"
          (navigate)="horizontalContainerCollapsible.scrollToSection($event)"
          (nextSection)="horizontalContainerCollapsible.scrollToSection(i + 1)"
        >
            @if (section.customContent === 'collapsible-1') {
                <div class="two-col-lists">
                  <app-collapsible-list [items]="collapsibleList1()" (requestModal)="openModal({title: $event.title, content: $event.content, color: section.backgroundColor})" style="width: 100%;" />
                </div>
            } @else if (section.customContent === 'collapsible-2') {
                <div class="two-col-lists">
                  <app-collapsible-list [items]="collapsibleList2()" (requestModal)="openModal({title: $event.title, content: $event.content, color: section.backgroundColor})" style="width: 100%;" />
                </div>
            } @else if (section.customContent === 'collapsible-3') {
                <p class="section-quote-paragraph"><em>{{ ts.t().sectionQuote }}</em></p>
            }
        </app-section>
      }
    </app-sections-container>

    <div class="awards-block" id="awards">
      <app-awards-list />
    </div>

    <app-contact-us id="contact" />

    <app-footer />

    <app-cookie-banner />

    @if (modalVisible()) {
      <div class="modal-overlay" (click)="closeModal()">
          <div class="modal-container" [style.background-color]="currentModalData()?.color" (click)="$event.stopPropagation()">
            <button class="close-btn" (click)="closeModal()">×</button>
            <h2 class="modal-title">{{ currentModalData()?.title }}</h2>
            <div class="modal-scroll-wrapper">
              <div class="modal-body" [innerHTML]="currentModalData()?.content"></div>
              @if (currentModalData()?.prompt || currentModalData()?.llmLinks?.length) {
                <div class="modal-actions">
                  @if (currentModalData()?.prompt) {
                    <div class="prompt-section">
                      <span class="action-label">{{ ts.t().modal.copyPromptLabel }}</span>
                      <button class="copy-btn" (click)="copyPrompt(currentModalData()!.prompt!)">
                        @if (copied()) {
                          <span class="copy-icon">✓</span> {{ ts.t().modal.copiedButton }}
                        } @else {
                          <span class="copy-icon">📋</span> {{ ts.t().modal.copyButton }}
                        }
                      </button>
                    </div>
                  }
                  @if (currentModalData()?.llmLinks?.length) {
                    <div class="llm-section">
                      <span class="action-label">{{ ts.t().modal.llmLabel }}</span>
                      <div class="llm-buttons">
                        @for (link of currentModalData()!.llmLinks!; track link.label) {
                          <button class="llm-btn" (click)="openLlmLink(link.url)">{{ link.label }}</button>
                        }
                      </div>
                    </div>
                  }
                </div>
              }
            </div>
          </div>
      </div>
    }
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background-color: #f4f1ea;
      overflow-x: clip;
    }

    .awards-block {
      width: 100%;
      padding: 4rem 0;
      scroll-snap-align: start;
    }

    .papers-block {
      width: 100%;
      padding: 4rem 0;
      scroll-snap-align: start;
      background-color: #f4f1ea; /* Ensure background match */
    }

    .kpis-block {
      width: 100%;
      scroll-snap-align: start;
    }

    .two-col-lists {
      display: flex;
      flex-direction: row;
      gap: 1.5rem;
      width: 100%;
      align-items: flex-start;
    }

    .two-col-lists > * {
      flex: 1;
      min-width: 0;
    }

    @media (max-width: 768px) {
      .two-col-lists {
        flex-direction: column;
        gap: 2rem;
      }
    }

    .section-quote-paragraph {
      font-family: 'Inter', sans-serif;
      font-size: clamp(1.15rem, 1.7vw, 1.5rem);
      font-weight: 300;
      line-height: 1.7;
      color: rgba(255, 255, 255, 0.85);
      max-width: 620px;
      margin: 0;
      letter-spacing: 0.01em;
    }

    @media (max-width: 768px) {
      .section-quote-paragraph {
        font-size: 1.25rem; /* Ensure readable size on mobile */
        max-width: 100%;
        line-height: 1.5;
      }
    }

    /* ─── Modal ─── */
    .modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        backdrop-filter: blur(5px);
        z-index: 2000;
        display: flex;
        justify-content: center;
        align-items: center;
        animation: fadeIn 0.3s ease;
    }

    .modal-container {
        padding: 3rem;
        width: 95%;
        max-width: 800px;
        position: relative;
        animation: slideUp 0.3s ease;
        border-radius: 12px;
        color: #ffffff;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        display: flex;
        flex-direction: column;
        max-height: 90vh;
    }
    
    .modal-scroll-wrapper {
        overflow-y: auto;
        padding-right: 1rem;
        /* Custom scrollbar for webkit */
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
    }
    
    .modal-scroll-wrapper::-webkit-scrollbar {
        width: 6px;
    }
    .modal-scroll-wrapper::-webkit-scrollbar-track {
        background: transparent;
    }
    .modal-scroll-wrapper::-webkit-scrollbar-thumb {
        background-color: rgba(255, 255, 255, 0.3);
        border-radius: 10px;
    }
    
    @media (max-width: 768px) {
        .modal-container {
            padding: 1.5rem;
            width: 90%;
        }
    }

    .close-btn {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: none;
        border: none;
        color: white;
        font-size: 2rem;
        cursor: pointer;
        opacity: 0.8;
        padding: 0;
        line-height: 1;
    }
    
    .close-btn:hover { opacity: 1; }

    .modal-title {
        font-family: 'Bebas Neue', Impact, sans-serif;
        font-size: 2.5rem;
        margin-bottom: 1.5rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        color: #ffffff;
        flex-shrink: 0;
    }

    .modal-body {
        font-family: 'Inter', sans-serif;
        color: #ffffff;
        line-height: 1.6;
        font-size: 1.1rem;
        white-space: normal;
    }
    
    ::ng-deep .modal-body ul,
    ::ng-deep .modal-body ol {
        padding-left: 2rem;
        margin: 1.5rem 0;
        list-style-position: outside;
        margin-left: 1.5rem;
    }
    
    .modal-body li {
        margin-bottom: 0.5rem;
    }

    /* ─── Modal Actions (Copy Prompt + LLM Buttons) ─── */
    .modal-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 16px;
        margin-top: 2rem;
        align-items: flex-start;
        padding-top: 1.5rem;
        border-top: 1px solid rgba(255, 255, 255, 0.2);
    }

    .prompt-section, .llm-section {
        flex: 1;
        min-width: 200px;
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .action-label {
        font-size: 0.95rem;
        color: rgba(255, 255, 255, 0.85);
        font-family: 'Inter', sans-serif;
    }

    .copy-btn {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.16);
        border: 1px solid rgba(255, 255, 255, 0.2);
        border-radius: 8px;
        color: #ffffff;
        font-family: 'PP Supply Mono Regular', 'Courier New', monospace;
        font-size: 0.9rem;
        cursor: pointer;
        transition: all 0.2s ease;
        width: fit-content;
    }

    .copy-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.35);
        transform: translateY(-1px);
    }

    .copy-btn:active {
        transform: translateY(0);
    }

    .copy-icon {
        font-size: 1rem;
    }

    .llm-buttons {
        display: flex;
        gap: 8px;
        flex-wrap: wrap;
    }

    .llm-btn {
        padding: 10px 20px;
        background: rgba(255, 255, 255, 0.16);
        border: 1px solid rgba(255, 255, 255, 0.15);
        border-radius: 8px;
        color: #ffffff;
        font-size: 0.9rem;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.2s ease;
        letter-spacing: 0.3px;
    }

    .llm-btn:hover {
        background: rgba(255, 255, 255, 0.25);
        border-color: rgba(255, 255, 255, 0.3);
        transform: translateY(-1px);
    }

    .llm-btn:active {
        transform: translateY(0);
    }

    @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
    @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }

    /* Force larger font for the paragraph in section 5 */
    ::ng-deep #section-5 .section-custom-content p {
      font-size: 1.5rem !important;
      line-height: 1.3 !important;
      max-width: 800px !important;
      font-weight: 300 !important;
      color: #ffffff !important;
    }
  `],
})
export class AppComponent {
  readonly ts = inject(TranslationService);
  currentSection = signal(0);

  modalVisible = signal(false);
  copied = signal(false);
  currentModalData = signal<{ title: string, content: string, color: string, prompt?: string, llmLinks?: { label: string, url: string }[] } | null>(null);

  openModal(data: { title: string, content: string, color: string, prompt?: string, llmLinks?: { label: string, url: string }[] }) {
    this.currentModalData.set(data);
    this.modalVisible.set(true);
  }

  closeModal() {
    this.modalVisible.set(false);
  }

  copyPrompt(text: string) {
    navigator.clipboard.writeText(text).then(() => {
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    });
  }

  openLlmLink(url: string) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  navItems = computed<NavCommand[]>(() => this.ts.t().nav as NavCommand[]);

  /* ── Part STW Content — now driven by TranslationService ── */

  /* ── Accordion Data (2 blocks) — images are static, text from service ── */
  private accordionImages = [
    [{ src: 'img/book2.jpg', alt: 'Book', class: 'grayscale-hover first-card-small' }],
    [{ src: 'img/sergio_receiving_prize.jpg', alt: 'Sergio receiving prize', class: 'grayscale-hover' }],
  ];
  accordionItems = computed(() => this.ts.t().accordion.cards.map((card, i) => ({
    ...card,
    images: this.accordionImages[i] || []
  })));

  /* ── KPIs Content ── */
  kpisData = computed<KPI[]>(() => this.ts.t().kpis.items);

  /* ── Horizontal Sections with Collapsible Lists ── */
  private horizontalSectionsMeta: Omit<SectionData, 'title' | 'subtitle'>[] = [
    { id: 1, backgroundColor: 'rgb(76, 214, 188)', customContent: 'collapsible-1' },
    { id: 2, backgroundColor: 'rgb(76, 214, 188)', customContent: 'collapsible-2' },
    { id: 3, backgroundColor: '#FD5F65', customContent: 'collapsible-3' },
  ];
  horizontalSectionsStructure = computed<SectionData[]>(() =>
    this.ts.t().horizontalSectionsStructure.map((t, i) => ({
      ...this.horizontalSectionsMeta[i],
      title: t.title,
      subtitle: t.subtitle,
    } as SectionData))
  );

  collapsibleList1 = computed<CollapsibleItem[]>(() =>
    this.ts.t().collapsibleList1.map(item => ({ ...item, subtitle: '', image: '' }))
  );

  collapsibleList2 = computed<CollapsibleItem[]>(() =>
    this.ts.t().collapsibleList2.map(item => ({ ...item, subtitle: '', image: '' }))
  );

  /* ── Computed halves for 2-column layout ── */
  collapsibleList1Half1 = computed(() => {
    const items = this.collapsibleList1();
    return items.slice(0, Math.ceil(items.length / 2));
  });
  collapsibleList1Half2 = computed(() => {
    const items = this.collapsibleList1();
    return items.slice(Math.ceil(items.length / 2));
  });
  collapsibleList2Half1 = computed(() => {
    const items = this.collapsibleList2();
    return items.slice(0, Math.ceil(items.length / 2));
  });
  collapsibleList2Half2 = computed(() => {
    const items = this.collapsibleList2();
    return items.slice(Math.ceil(items.length / 2));
  });

  /* ── 2 horizontal sections (both black) ── */
  horizontalSections = signal<SectionData[]>([
    { id: 1, title: 'TOOLKIT', subtitle: '', backgroundColor: '#000000', image: 'img/toolkit/toolkit.png' },
    { id: 2, title: 'HIGHLIGHTS', subtitle: '', backgroundColor: '#000000', image: 'img/toolkit/toolkit41ops.png' },
  ]);



  /* ── 5 NEW horizontal sections ── */
  /* ── 5 NEW horizontal sections ── */
  horizontalSectionsNew = signal<SectionData[]>([
    {
      id: 1,
      title: 'Corporate Transformation',
      subtitle: '',
      backgroundColor: '#E63946',
      textColor: '#ffffff',
      image: 'img/state_of_the_art_platforms.png',
      modalContent: `
    < p > It’s just the move from artisans to orchestrated blue collars, as it happened during the previous century, but in the headquarters - hence, from artisans to orchestrated white collars.It is the way companies can help their employees add value in an algorithmic world - by stating innovation as business - as - usual(BAU).It is accomplished through three main steps that loop: </p>
      < ol >
      <li>Revisit of operations taking into account all that can be unlocked through AI.This is, from Ops to AI Ops - hence, our name, 41OPS, years before it became a mainstream vision.</li>
        < li > Creation of an Extended Production Architecture(EPA) so that AI can be organically consumed by the company’s legacy - typically, a custom interface which gives room to the first versions of the algorithms that will help the department become more efficient.</li>
          < li > New versions of the methods and AI models as well as addition of new ones so that patterns are at last professionally, realistically exploited.</li>
            </ol>
\n\n < p > Loop so that employees deliver innovation as business - as - usual(BAU).</p>
  `
    },
    {
      id: 2,
      title: 'Methodology',
      subtitle: '',
      backgroundColor: '#457B9D',
      textColor: '#ffffff',
      image: 'img/sections/sticker_bot_head_jaime_AGI.png',
      secondaryImage: 'img/sections/company_departments_bubbles.png',
      modalContent: `
  < p > We are uniquely positioned to deliver Transformation Bubbles towards the unlocking of Extreme - Efficiency.It ticks 1000 dimensions but let’s highlight a few: </p>
    < ol >
    <li>Bottom - up transformation: letting departments account for freedom while synergies are granted via technology.</li>
      < li > Customized: departamental EPA upon the company’s legacy.</li>
        < li > Organic operating system: not forced but, on the contrary, as a byproduct from the departamental, bottom - up transformation.Thereon, all sorts of hybrid decisions, across departments, can be taken in real time.</li>
          </ol>
          < p > To the best of our knowledge, we are not only the pioneers of this corporate - friendly methodology but also, the only ones who can deliver it.</p>
            `
    },
    {
      id: 3,
      title: 'Behind-the-scenes',
      subtitle: '',
      backgroundColor: '#2A9D8F',
      textColor: '#ffffff',
      image: 'img/sections/sticker_bot_no_face_jaime (1).png',
      secondaryImage: 'img/sections/scaffold_apple_tree.png',
      modalContent: `
            < p > Our laser - focus is the Machine in Machine Learning(more particularly, the M2 in ML).</p>
              < p > Our product can be understood as the factory of algorithmic use cases.Or, else: </p>
                < ol >
                <li>The scaffolding(the factory) surrounding a tree so that the sticks(the use cases) can reach not only low - hanging fruits(the impact) but any fruit at ease.</li>
                  < li > The spreadsheet(the factory) where your employees or external providers can create their own designs(ops) and formulas(use cases).</li>
                    < li > The cake(the factory) upon which the cherries(use cases) can be at last be put on top - else, they fall directly into the table leaving no impact behind.</li>
                      </ol>
                      < p > And it delivered through two platforms: </p>
                        < ol >
                        <li>Fractal: the end - to - end tech that we use to run the whole group becomes not the end - product but, crucially, the beginning - product of each department’s transformation.</li>
                          < li > Alpha Dynamics: an advanced investment platform that is not available yet to most of the best known financial agents.</li>
                            </ol>
                              `
    },
    {
      id: 4,
      title: 'Unbeatable',
      subtitle: '',
      backgroundColor: '#F4A261',
      textColor: '#ffffff',
      image: '',
      modalContent: `
                            < p > Not surprisingly, the light of above information and leveraging the belonging to SciTheWorld Group, we have become, globally, we are second - to - none in terms of: </p>
                              < ol >
                              <li>Quality: we can not only compete with any algorithmic house but, more interestingly, aggregate them all - i.e.we are a Pareto Superior.</li>
                                < li > Price: where our competitors require millions and years we can start gradual for less than €500k and less than half a year.</li>
                                  < li > Time - to - Production: once up and running, projects that take months are usually done within 2 weeks.</li>
                                    < li > Cybersecurity: proprietary approaches that leverage the algorithmic nativity of the EPAs.In particular, when the hacker is inside(employee, CNE…).</li>
                                      < li > IP protection: federation grants hard separation across any role.</li>
                                        < li > Business continuity: detachable by design.</li>
                                          < li > Ease of change resistance: we empower professionals to dynamically define where they can keep adding value.</li>
                                            < li > Data protection: advanced permissioning strategies to share or aggregate data at the right level.</li>
                                              < li > Scalability: as we focus on the M in ML we can let our partners (or your preferred AI providers) do the human part of your use cases.</li>
                                                </ol>
                                                  `
    },
    {
      id: 5,
      title: 'In a paragraph',
      subtitle: '',
      backgroundColor: '#1D3557',
      textColor: '#ffffff',
      customContent: `
           <p>
          <em>[ EPAs are custom deeptech that seats on top of our clients’ departamental PAs(legacies) so that they can unlock their algorithmic nature.They gradually build up the clients operating systems upon which any use case is built and, more interestingly, controlled at ease. ]</em>
        </p>
    `
    },
  ]);

  /* ── 8 NEW vertical sections ── */
  verticalSectionsNew = signal<SectionData[]>([
    {
      id: 1,
      title: 'About us',
      subtitle: 'THE EXECUTION ARM OF SCITHEWORLD',
      backgroundColor: '#4AB5EA',
      modalContent: `
  < p > 41OPS is SciTheWorld’s AI - native transformation company.</p>
    < p > From its inception, it has also played a structural role within the Group: funding the Centre of Excellence so that Algorithmization could remain free and independent in its intellectual property creation.</p>
      < p > This independence is not incidental.Long - run, frontier research—ours spans more than a decade—is effectively unfunded by traditional mechanisms: not by universities, not by corporations, and not by investors. 41OPS exists, in part, to close that structural gap between applied science and industrial reality.</p>
        < p > 41OPS inherits from SciTheWorld’s: </p>
          < ul >
          <li>Algorithmization discipline(methodology), </li>
            < li > Custom SaaS platforms:
<ol>
  <li>Fractal platform(AI - native corporate tech), </li>
    < li > Alpha Dynamics platform(investment and decision systems).</li>
      </ol>
      </li>
      </ul>
      < p > This guarantees coherence between theory, architecture, and execution.</p>
        `
    },
    {
      id: 2,
      title: 'What we actually deliver',
      subtitle: 'THE REAL DEAL',
      backgroundColor: '#FA715E',
      modalContent: `
        < p > 41OPS sells Extreme - Efficiency.SciTheWorld is an example itself of an Extreme - Efficient Group: </p>
          < ol >
          <li>Algorithmization: 2 people(co - founders).</li>
            < li > Platforms:
<ul style="list-style-type: lower-alpha;" >
  <li>Fractal : 4.5 people(co - founders + 2.5 employees that rotate to ensure scalability and resilience).</li>
    < li > Alpha Dynamics: 2 people(co - founders).</li>
      </ul>
      </li>
      < li > Learning - adaptive and SystematicMe: 2 people.</li>
        </ol>
        < p > The Bank of Spain was so surprised by this capacity that they even sent people to briefly audit our methodology.</p>
          < p > Typical outputs include “Transformation Bubbles”: </p>
            < ul >
            <li>AI - native workflows and protocols.</li>
              < li > SaaS platforms customized at ease to each department’s needs.</li>
                </ul>
                < p > Average time - to - production across projects once transformation becomes business - as - usual(BAU) upon our platforms: ~2 weeks.</p>
                  `
    },
    {
      id: 3,
      title: 'Brands that trust us',
      subtitle: 'ALL SORTS OF SIZES, INDUSTRIES AND DIGITAL MATURITY',
      backgroundColor: '#4CD6BC',
      modalContent: `
                  < p > As the execution arm of our Centre of Excellence, our trajectory has necessarily differed from that of most technology companies.From the outset, we prioritized getting the technology holistically right over maximizing short - term revenue.</p>
                    < p > The reason lies in what we refer to as The Cube, introduced in Algorithmization’s first paper, Data MAPs: On - Platform Organizations.The challenge was straightforward but demanding: how do you prove the universality of a technological breakthrough ? </p>
                      < p > SciTheWorld’s answer was empirical rather than rhetorical.They chose to validate the technology through us by filling the Cube with real use cases spanning: </p>
                        < ul >
                        <li>multiple sectors, </li>
                          < li > a wide range of company sizes(from small organizations to listed corporations), </li>
                            < li > and very different levels of digital maturity.</li>
                              </ul>
                              < p > Crucially, once a use case proved successful, we did not replicate it repeatedly to maximize profits.Instead, we deliberately sought the next most orthogonal case—one that stressed the system in a different dimension.This approach optimized not for revenue, but for flexibility, robustness, and universality of the technology.</p>
                                < p > As a consequence, our work gained global visibility—through universities, professional networks, and media influence—which in turn led us to advise a spectrum of actors that would otherwise have been far beyond our natural reach: from individuals(including former heads of state and prominent Silicon Valley CEOs) to companies, governments, central banks, and supranational institutions.</p>
                                  < p > In short, we chose to optimize the long - term value of SciTheWorld, not its short - term revenue.</p>
                                    < p > That choice has proven correct as we transparently explained in Advances in Agentic AI: Back to the Future.</p>
                                      `
    },
    { id: 4, title: 'Two modes of engagement', subtitle: 'THE KEY IS TO INTERACT WITH THE CLIENT UNTIL THEY UNDERSTAND OUR NATURE AND QUALITY', backgroundColor: '#EECA46' },
    {
      id: 5,
      title: 'Transformation bubbles',
      subtitle: 'A SCALABLE PATH TO AI-NATIVITY',
      backgroundColor: '#FD5F65',
      modalContent: `
                                      < p > 41OPS delivers transformation through a proprietary approach called Transformation Bubbles.</p>
                                        < p > A Transformation Bubble is a bounded, high - impact transformation unit that: </p>
                                          < ul >
                                          <li>can stand alone, </li>
                                            < li > delivers measurable value fast, </li>
                                              < li > and is designed to interconnect with future bubbles.</li>
                                                </ul>
                                                < p > Each bubble compounds into the next through network effects.</p>
                                                  < h3 > SciTheWorld’s roadmap of transformation </h3>
                                                    < p > Transformation Bubbles are deployed along a strict ladder: </p>
                                                      < p style = "text-align: center; font-weight: 700; margin: 1rem 0;" > products → departments → companies → sectors → countries → society </p>
                                                        < p > This is not optional.Skipping levels creates fragility, politics, and failure.</p>
                                                          < p > 41OPS is one of the very few organizations that has already operated at the country level, through the Extreme - Efficient Nations methodology.</p>
                                                            `
    },
    {
      id: 6,
      title: 'You can unplug us. By design',
      subtitle: 'WE DON’T WANT TO BE YOUR NEXT DEPENDENCE',
      backgroundColor: '#A8D5BA',
      modalContent: `
                                                            < p > Our technology is strategy - driven and federated, in line with how the most advanced AI - native organizations operate.This architecture ensures that your intellectual property remains yours—whether it is created with us, independently, or in collaboration with other partners.</p>
                                                              < p > What this means in practice is simple but fundamental: </p>
                                                                < ul >
                                                                <li>you own the strategies, </li>
                                                                  < li > you own their constituent components(we help you aggregate AI services from third parties by design), </li>
                                                                    < li > and you retain the ability to rebuild or operate them without us.</li>
                                                                      </ul>
                                                                      < p > We explicitly design and deliver projects so that clients can decouple from us if they choose to.In fact, we recommend this as a best practice on your key workflows(e.g.regulation) for business continuity and risk management.</p>
                                                                        < p > There is, however, an important distinction to understand.</p>
                                                                          < p > If you remove our platform, the strategies remain executable because the code is standardized and portable.You will continue to be effective at the strategic level.</p>
                                                                            < p > What you will no longer have is the same level of efficiency.</p>
                                                                              < p > That efficiency comes from what our platform provides behind the scenes: </p>
                                                                                < ul >
                                                                                <li>architectural flexibility, </li>
                                                                                  < li > advanced cybersecurity, </li>
                                                                                    < li > dynamic federation, </li>
                                                                                      < li > operational resilience, </li>
                                                                                        < li > and long - term evolvability.</li>
                                                                                          </ul>
                                                                                          < p > In short: you can leave at any time without losing control of your strategy.What you choose to leave behind is infrastructure - level efficiency, not intellectual property.</p>
                                                                                            `
    },
    { id: 7, title: 'Two speeds in transformation', subtitle: 'OFTEN BOTH CO-LIVE', backgroundColor: '#F4A261' },
    {
      id: 8,
      title: 'Extreme-efficient ecosystems',
      subtitle: 'OUR AGENTS DO NOT KNOW LIMITS',
      backgroundColor: '#9B59B6',
      modalContent: `
                                                                                            < p > Our Transformation Bubbles are designed to scale both within a single organization and across multiple organizations.</p>
                                                                                              < p > In practice, this means that we do not transform companies, sectors, or countries as isolated entities.We build ad - hoc ecosystems.</p>
                                                                                                < p > Behind the scenes, Algorithmization operates at the ecosystem level.Organizational boundaries are treated as constraints to be managed—not as the unit of transformation.</p>
                                                                                                  < p > These ecosystems can take multiple forms: </p>
                                                                                                    < h3 > Within the same company or group </h3>
                                                                                                      < p > From SMEs to global groups.Whether the departments are considered the ecosystem or it is the different local companies from a group.Here, transformation bubbles expand by compounding internal network effects.</p>
                                                                                                        < p > When combined with SystematicMe’s training and judgment - building layer, these ecosystem - based transformations achieve a level of robustness and durability that is rarely observed in conventional AI initiatives.</p>
                                                                                                          < p > Transformation becomes not only scalable—but resilient.</p>

                                                                                                            < h3 > Across multiple independent companies </h3>
                                                                                                              < h4 > Portfolios under a single owner(e.g.Private Equity) </h4>
                                                                                                                < p > This unlocks a new transformation frontier: </p>
                                                                                                                  < ul >
                                                                                                                  <li>smarter selection through AI - informed analysis, </li>
                                                                                                                    < li > faster AI - native transformation due to reduced internal political friction, </li>
                                                                                                                      < li > and, more subtly, cross - company interoperability, enabling collaborations across portfolio companies that generate orthogonal value previously inaccessible.</li>
                                                                                                                        </ul>
                                                                                                                        < h4 > Companies under different owners </h4>
                                                                                                                          < ul >
                                                                                                                          <li>sector associations, </li>
                                                                                                                            < li > regional ecosystems, </li>
                                                                                                                              < li > initiatives to revitalize depressed regions within a country.</li>
                                                                                                                                </ul>
                                                                                                                                < p > In these cases, Algorithmization enables coordination and efficiency gains that no single entity could achieve independently.</p>
                                                                                                                                  `
    },
  ]);

  engagementModesList = signal<CollapsibleItem[]>([
    {
      title: 'Open projects',
      subtitle: '',
      content: 'In open projects, the client drives the initiative.\n41OPS provides senior professionals selected not only for technical skill, but—critically—for attitude, judgment, and execution discipline.\nBeyond staffing, we introduce an additional layer of value:\n• rigorous project management,\n\n• architectural awareness,\n\n• and leverage of our internal technology to increase delivery reliability.\n\nThis model has repeatedly proven effective as a trust-building mechanism, often serving as the entry point toward deeper, closed-scope transformations.',
      image: ''
    },
    {
      title: 'Closed Projects',
      subtitle: '',
      content: 'In closed projects, 41OPS drives the transformation.\nHere, the mandate is explicit: address a clearly identified structural need and turn Algorithmization into operational reality. These engagements typically leverage Fractal and Alpha Dynamics to deliver AI-nativity inside organizations.\nIn this context, it is important to be precise:\n| 41OPS does not merely sell AI projects.\n\nIt delivers AI-nativization: the redesign of operations, workflows, and infrastructures so that intelligence becomes:\n• structural rather than cosmetic,\n\n• governable rather than opaque,\n\n• economically efficient rather than integration-heavy.\n\nThis is the difference between deploying AI and becoming AI-native.\nMore eloquently, we don’t only sell the sticks to grasp the low hanging fruits. We add the scaffolding that allows you also reach the mid and high hanging ones.',
      image: ''
    }
  ]);

  transformationSpeedsList = signal<CollapsibleItem[]>([
    {
      title: 'Gradual transformation (inside the organization)',
      subtitle: '',
      content: 'For organizations that want to evolve their core safely:\n• We start with selected products or departments.\n\n• We redesign workflows, decision paths, and infrastructure.\n\n• We deploy Custom SaaS powered by SciTheWorld platforms.\n\n• We progressively interconnect bubbles across the organization.\n\nThe result is controlled compounding, not disruption theatre.',
      image: ''
    },
    {
      title: 'One-go transformation (speedboats as joint ventures)',
      subtitle: '',
      content: 'When internal politics, legacy incentives, or governance slow transformation:\n• We create speedboats: joint ventures or parallel entities.\n\n• These entities operate AI-native from day one.\n\n• Learnings are then inherited by the parent organization.\n\nThis approach is particularly effective for:\n• regulated industries,\n\n• large incumbents,\n\n• and private-equity-backed transformations.',
      image: ''
    }
  ]);

  /* ── 7 vertical sections (OLD - Kept reference but unused in template) ── */
  verticalSections = signal<SectionData[]>([
    {
      id: 1,
      title: 'Why Algorithmization exists',
      subtitle: 'WE SAW THE NEED A DECADE BEFORE INDUSTRY AND ACADEMIA',
      backgroundColor: '#4AB5EA',
      modalContent: '<p>Most AI projects fail not because AI is immature, but because organizations are not designed to absorb intelligence.</p><p>Algorithmization exists to solve that structural problem.</p><p>It is not about using more AI.</p><p>It is about becoming an algorithmic system.</p>'
    },
    {
      id: 2,
      title: 'A NEW DISCIPLINE',
      subtitle: 'WHAT IT IS',
      backgroundColor: '#FA715E',
      modalContent: `< p style = "margin-bottom: 2rem;" > Algorithmization is a new applied - science discipline focused on advanced transformation.</p>
  < p style = "margin-bottom: 2rem;" > Its objective is not to “add AI” to organizations, but to re - architect them so that decision - making, operations, and innovation become algorithmic by design—precise, governable, and economically grounded.</p>
    < p > In an Algorithmized organization: </p>
      < ul style = "display: flex; flex-direction: column; gap: 2rem; margin-bottom: 2rem;" >
        <li>improvements compound daily, </li>
          < li > transformation is no longer episodic, </li>
            < li > and competitive advantage is structural, not tool - dependent.</li>
              </ul>
              < p > Algorithmization is the intellectual backbone of SciTheWorld and the foundation upon which its platforms, methodologies, and spin - offs are built.</p>`
    },
    { id: 3, title: 'THE 3 KNOWLEDGE PILLARS', subtitle: '', backgroundColor: '#4CD6BC' },
    {
      id: 4,
      title: 'THE MISSION',
      subtitle: 'APPLIED SCIENCE IS NOT SCIENCE APPLIED',
      backgroundColor: '#EECA46',
      modalContent: `<p>Algorithmization follows a strict scientific–industrial loop:</p>
<h3 style="margin: 1rem 0; text-align: center; font-size: 1.25em;">Invent → Formalize → Prove → Industrialize</h3>
<p>This sequence is non-negotiable.</p>
<ul>
<li><strong>Invent</strong><br>Identify structural inefficiencies and missing paradigms at the intersection of economics, AI, and architecture.</li>
<li><strong>Formalize</strong><br>Translate invention into theory, methodologies, and architectures that can be taught, audited, and replicated.</li>
<li><strong>Prove</strong><br>Stress-test the theory in real industrial environments, under real constraints: cost, latency, governance, compliance, and failure.</li>
<li><strong>Industrialize</strong><br>Embed the proven theory into platforms, standards, and operating models that scale beyond individuals and single organizations.</li>
</ul>
<p>This loop is continuously executed by SciTheWorld’s Centre of Excellence.</p>`
    },
    { id: 5, title: 'OUTPUTS', subtitle: '', backgroundColor: '#FD5F65' },
    {
      id: 6, title: 'A VERY SPECIAL BYPRODUCT', subtitle: 'WE DEVISED IT MORE THAN A DECADE AHEAD', backgroundColor: '#A8D5BA',
      modalContent: `<p>Agentic AI is now everywhere.</p>
<p>What is less visible is that the architectural and operational foundations behind it were defined long before the term became mainstream.</p>
<p>Our approach has always been deliberately precise—both in theory and in execution. As a result, simply reproducing Chapter 3 of our first paper, a body of work that required seven years of industrial validation, is enough for any large language model to independently verify its status as pioneer work on Agentic AI for corporate transformation.</p>
<p>You can test this yourself here.</p>`,
      prompt: `To the light of the info that I'm going to give you based on a paper written in 2022, would you say this is a pioneer work on agentic AI? In particular, 'AI-native enterprises and operating models' as distinguished by McKinsey. Note that pioneers typically anticipate concepts but with different names than those used afterwards, mainstream. Take everything into account and make your most accurate verdict. And note that you are seeing only one chapter of a paper - there are more chapters in that paper and there are more papers on transformation, algorithmization and AI as they have a centre of excellence for that. Also, they have an award to the best innovation in simulation as they allowed, back in 2019, a machine to autonomously self-create and calibrate its algorithms via Reinforcement Learning (a major topic in Sergio's PhD Thesis in AI). Finally, spot he problems its solves with respect to mainstream agents (e.g. costs, legacy system integration, compliance, RAM...). Follows the Chapter:`,
      llmLinks: [
        { label: 'ChatGPT', url: 'https://chat.openai.com' },
        { label: 'Claude.AI', url: 'https://claude.ai' },
        { label: 'Gemini', url: 'https://gemini.google.com' }
      ]
    },
    {
      id: 7,
      title: 'SCOPE OF ALGORITHMIZATION',
      subtitle: 'A COHERENT YET AMBITIOUS OUTREACH',
      backgroundColor: '#F4A261',
      modalContent: `<p>Algorithmization is designed to scale along a single, coherent ladder:</p>
<p style="text-align: center; font-weight: 700; margin: 4rem 0 2rem 0; font-size: 1.2rem;">products → departments → companies → sectors → nations → society</p>
<p>This is not an ambition—it is a constraint imposed by complexity.</p>
<p>SciTheWorld has already proven Algorithmization at multiple levels of this ladder, including <strong>country-level applications</strong>, and is actively extending it toward societal transformation through partnerships in the humanities and education.</p>`
    },
  ]);

  pillarsList = signal<CollapsibleItem[]>([
    {
      title: 'Microeconomics',
      subtitle: '',
      content: 'Transformation is governed by:\n• incentives,\n• efficiency,\n• competition,\n• and resource allocation.\nWithout microeconomics, AI initiatives optimize locally and fail systemically.\nAlgorithmization uses microeconomic reasoning to decide what should be automated, when, and why.',
      image: ''
    },
    {
      title: 'AI / Machine Learning',
      subtitle: '',
      content: 'Algorithmization treats AI correctly:\n• a model is not a solution,\n\n• intelligence emerges from the orchestration of multiple models,\n\n• expert heuristics and governance are first-class components.\n\nThis is why Algorithmization anticipated Agentic AI for AI-native enterprises and operations long before it became industry terminology.',
      image: ''
    },
    {
      title: 'Deeptech Software Design',
      subtitle: '',
      content: 'AI cannot scale without architecture.\nAlgorithmization embeds:\n• modularity,\n\n• federation,\n\n• resilience,\n\n• security,\n\n• and long-term evolvability\n\ninto the core design of systems.\nDeeptech design is what allows Algorithmization to move from prototypes to nation-scale transformation.',
      image: ''
    }
  ]);

  outputsList = signal<CollapsibleItem[]>([
    {
      title: 'Papers',
      subtitle: '',
      content: 'Formal research and white papers that:\n• define new architectural paradigms (e.g. Data MAPs),\n\n• introduce new transformation logics (e.g. on-platform organizations),\n\n• extend Algorithmization into finance, cybersecurity, geostrategy, and society.\n\nThese papers describe theory that has already been proven in production, not speculative futures.',
      image: ''
    },
    {
      title: 'Architectures',
      subtitle: '',
      content: 'Reusable architectural patterns that break complex systems into smart, federated, governable units—enabling what is now called Agentic AI in enterprise contexts.\nAlgorithmization approaches architecture as a strategic asset, not an implementation detail.',
      image: ''
    },
    {
      title: 'Standards and methodologies',
      subtitle: '',
      content: 'Operational frameworks that allow organizations to:\n• govern AI and automation with precision,\n\n• control transformation economics,\n\n• avoid vendor-driven architectural convergence.\n\nThese standards are increasingly aligned with global regulatory and institutional efforts.',
      image: ''
    },
    {
      title: 'Platforms',
      subtitle: '',
      content: 'Industrial-grade platforms where Algorithmization is executed in production:\n• Fractal — AI-native, end-to-end corporate technology.\n\n• Alpha Dynamics — AI-native investment and decision-making infrastructure.\n\nPlatforms are not endpoints; they are living laboratories of the discipline.',
      image: ''
    }
  ]);

  papers = signal<Paper[]>([
    {
      Title: "Data MAPS: On-Platform Organisations",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4232955",
      Pages: "107",
      Date: "15/10/2022"
    },
    {
      Title: "Advances in Portfolio Management: Dimension-Driven Portfolios [Trilogy - 1/3]",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4321538",
      Pages: "5",
      Date: "10/01/2023"
    },
    {
      Title: "Advances in Portfolio Management: On-Platform Performance Attribution [Trilogy - 2/3]",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4321552",
      Pages: "4",
      Date: "10/01/2023"
    },
    {
      Title: "Advances in Portfolio Management: On-Platform Governance for Portfolio Managers [Trilogy 3/3]",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4321554",
      Pages: "3",
      Date: "10/01/2023"
    },
    {
      Title: "Advances in Cognitive Warfare: Augmented Machines upon Data MAPs towards a Fast and Accurate Turnaround",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4321573",
      Pages: "4",
      Date: "10/01/2023"
    },
    {
      Title: "Advances in Banking: Top-Down Vertical Integration",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4430206",
      Pages: "11",
      Date: "28/04/2023"
    },
    {
      Title: "Advances in AI: When Applied Science is not Science Applied",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4445463",
      Pages: "14",
      Date: "13/05/2023"
    },
    {
      Title: "Advances in Transformation: Why and How CEOs are Moving from Digitalwashing to White Collar Factories",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4560804",
      Pages: "15",
      Date: "25/09/2023"
    },
    {
      Title: "The Lean Aggregation Behind the Next M&A, Tenders and Organic Growth: Federation and the Three-Layer Companies",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4681784",
      Pages: "7",
      Date: "17/01/2024"
    },
    {
      Title: "Advances in Artificial Super Intelligence: Calm is All You Need",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4924496",
      Pages: "22",
      Date: "12/08/2024"
    },
    {
      Title: "Modern Cybersecurity: New Era, New Strategies",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4957894",
      Pages: "19",
      Date: "16/09/2024"
    },
    {
      Title: "Advances in Geostrategy: Extreme-Efficient Nations",
      Link: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=5136657",
      Pages: "11",
      Date: "11/02/2025"
    },
    {
      Title: "Advances in Agentic AI: Back to the Future",
      Link: "https://arxiv.org/abs/2512.24856",
      Pages: "55",
      Date: "31/12/2025"
    }
  ]);

  onSectionChanged(index: number) {
    this.currentSection.set(index);
  }

  academicPartners = signal<AcademicPartner[]>([
    {
      institution: 'University College London',
      partnership: 'Foundations in AI, Machine Learning, and computational rigor.'
    },
    {
      institution: 'ICADE',
      partnership: 'Asset management, finance, and applied economic systems.'
    },
    {
      institution: 'IE University',
      partnership: 'Humanities, societal impact, culture, and the human dimension of AI.'
    }
  ]);



  handleNavigateRequest(index: number) {
    this.currentSection.set(index);
  }
}
