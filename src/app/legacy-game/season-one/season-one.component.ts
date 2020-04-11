import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-season-one',
    templateUrl: './season-one.component.html',
    styleUrls: ['./season-one.component.scss']
})
export class SeasonOneComponent implements OnInit {

    title: string = "Legacy - Season 1"

    constructor(private titleService: Title) { }

    ngOnInit() {
        this.titleService.setTitle(this.title);
    }

}
