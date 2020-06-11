export interface CityInterface {
    readonly name: string;
    numberInDeck: number;
    totals: number[];
    currDrawn: number;
    notes: string[];
    chance(index: number, totalCards: number) : string;
    inDeck(index: number) : number;
}