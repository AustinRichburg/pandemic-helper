export class City {

    private name: string;
    private numberInDeck: number;

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

}