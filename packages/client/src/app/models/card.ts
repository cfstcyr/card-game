export interface Card {
    id: string;
    content: string;
}

export interface CardDisplay extends Card {
    contentTop?: string;
}