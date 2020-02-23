export class City {

    private name: string;
    private numberInDeck: number;

    private drawn: number[];

    constructor(name: string) {
        this.name = name;
        this.numberInDeck = 3;
    }

    public getName() : string {
        return this.name;
    }

    public getTotalInDeck() : number {
        return this.numberInDeck;
    }

    public getDrawnAt(index: number) {
        return this.drawn[index];
    }

    public increment(index: number) : void {
        this.drawn[index]++;
    }

    public decrement(index: number) : void {
        this.drawn[index]--;
    }

}