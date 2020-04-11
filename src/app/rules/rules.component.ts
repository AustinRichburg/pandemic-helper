import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rules } from '../constants';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

    rules: Object = Rules;
    ruleSet: string;
    searchText: string;
    searchableText: NodeListOf<Element>;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.ruleSet = this.route.snapshot.paramMap.get('type');
        this.searchText = '';
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.searchableText = document.getElementById('rules').querySelectorAll('.section-header, .text-section');
    }

    onSearch() {
        if (this.searchText.trim() === '') {
            this.searchableText.forEach(element => {
                element['classList'].remove('highlight');
            });
            return;
        }
       
        this.searchableText.forEach(element => {
            if (element['textContent'].toLowerCase().includes(this.searchText.toLowerCase())) {
                element['classList'].add('highlight');
            } else {
                element['classList'].remove('highlight');
            }
        });
    }

}
