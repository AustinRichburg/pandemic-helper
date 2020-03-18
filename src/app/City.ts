import { Rate } from './constants';

export class City {

    private name: string;
    private numberInDeck: number;
    private cardsPerPile: number[];

    constructor(name: string) {
        this.name = name;
        this.numberInDeck = 3;
        this.cardsPerPile = [3].fill(1, Rate.length);
    }

    public getName() : string {
        return this.name;
    }

    public draw(index: number) : void {
        this.cardsPerPile[index]++;
        this.cardsPerPile[index - 1]--;
    }

    public getNumberInPile(index: number) : number {
        return this.cardsPerPile[index];
    }

}