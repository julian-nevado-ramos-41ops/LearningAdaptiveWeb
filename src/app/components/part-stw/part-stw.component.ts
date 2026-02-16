
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-part-stw',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './part-stw.component.html',
    styleUrl: './part-stw.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartStwComponent {
    /** HTML content for the title, allows styling like underlines */
    titleHtml = input.required<string>();

    /** Description text displayed on the right column */
    description = input.required<string>();

    // Customization Inputs
    backgroundColor = input<string>('#F3F1E7'); // Light beige default
    textColor = input<string>('#1a1a1a');

    /** Font family for the title */
    titleFont = input<string>("'Inter', sans-serif");

    /** Font family for the description */
    descriptionFont = input<string>("'DM Sans', sans-serif");
}
