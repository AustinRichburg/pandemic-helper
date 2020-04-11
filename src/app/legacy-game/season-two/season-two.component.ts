import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-season-two',
    templateUrl: './season-two.component.html',
    styleUrls: ['./season-two.component.scss']
})
export class SeasonTwoComponent implements OnInit {

    title: string = "Legacy - Season 2";

    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}
