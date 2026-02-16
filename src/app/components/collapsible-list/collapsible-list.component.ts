import { Component, ChangeDetectionStrategy, input, signal } from '@angular/core';
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
    expandedIndex = signal<number | null>(null);

    toggleItem(index: number) {
        if (this.expandedIndex() === index) {
            this.expandedIndex.set(null);
        } else {
            this.expandedIndex.set(index);
        }
    }
}
