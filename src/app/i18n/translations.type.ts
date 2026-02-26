/**
 * Shape of the translation dictionary.
 * Both EN and ES must conform to this interface.
 */

export interface NavItem {
    label: string;
    link?: string;
    children?: NavItem[];
}

export interface Translations {
    nav: NavItem[];

    hero: {
        title: string;
        subtitle: string;
    };

    partStw: {
        titleHtml: string;
        description: string;
    };

    accordion: {
        sectionTitle: string;
        sectionSubtitle: string;
        cards: { title: string; description: string }[];
    };

    kpis: {
        title: string;
        subtitle: string;
        items: { value: string; description: string }[];
    };

    papers: {
        title: string;
        subtitle: string;
    };

    horizontalSectionsStructure: { title: string; subtitle: string }[];

    sectionQuote: string;

    collapsibleList1: { title: string; content: string }[];
    collapsibleList2: { title: string; content: string }[];

    awards: {
        title: string;
        subtitle: string;
        items: { name: string; category: string; project: string; year: string }[];
    };

    footer: {
        isoText: string;
        copyright: string;
    };

    contactUs: {
        title: string;
    };

    cookieBanner: {
        text: string;
        accept: string;
    };

    modal: {
        copyPromptLabel: string;
        copyButton: string;
        copiedButton: string;
        llmLabel: string;
    };
}
