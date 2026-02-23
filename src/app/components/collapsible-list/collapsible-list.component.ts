import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CollapsibleItem {
    title: string;
    subtitle: string;
    content: string;
    image: string;
}

@Component({
    selector: 'app-collapsible-list',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './collapsible-list.component.html',
    styleUrls: ['./collapsible-list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollapsibleListComponent {
    items = input.required<CollapsibleItem[]>();
    requestModal = output<{ title: string, content: string }>();

    openModal(item: CollapsibleItem) {
        const contentStr = `
            ${item.subtitle ? `<h4 style="color: var(--color-1); font-family: 'Bebas Neue', sans-serif; font-size: 1.5rem; margin-bottom: 1rem;"><span style="font-weight: 800;">[</span>${item.subtitle}<span style="font-weight: 800;">]</span></h4>` : ''}
            <div style="font-family: 'Inter', sans-serif; font-size: 1.125rem; line-height: 1.7; color: rgba(255, 255, 255, 0.9); white-space: pre-wrap;">${item.content}</div>
            ${item.image ? `<img src="${item.image}" style="max-width: 100%; border-radius: 8px; margin-top: 1rem;">` : ''}
        `;
        this.requestModal.emit({ title: item.title, content: contentStr });
    }
}
