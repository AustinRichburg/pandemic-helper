import { BehaviorSubject } from 'rxjs';

export interface CityInterface {
    readonly name: string;
    numberInDeck: number;
    totals: number[];
    currDrawn: number;
    notes: string[];
    index: number;
    chance(index: number, totalCards: number) : string;
    inDeck(index: number) : number;
    draw() : boolean;
    handleEpidemic() : void;
    toObject() : Object;
    setLoadedValues(city: Object) : void;
}