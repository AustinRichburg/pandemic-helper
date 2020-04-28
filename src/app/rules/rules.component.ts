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
    searchableText: NodeListOf<HTMLElement>;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.ruleSet = this.route.snapshot.paramMap.get('type');
        this.searchText = '';
    }

    ngAfterViewInit(): void {
        //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        //Add 'implements AfterViewInit' to the class.
        this.searchableText = document.getElementById('rules').querySelectorAll('.section-header, .text-section, .subtext');
    }

    onSearch() {
        if (this.searchText.trim() === '') {
            this.searchableText.forEach(element => {
                element.classList.remove('highlight');
            });
            return;
        }
       
        this.searchableText.forEach(element => {
            if (element.textContent.toLowerCase().includes(this.searchText.toLowerCase())) {
                element.classList.add('highlight');
                if (element.classList.contains('subtext')) {
                    element.classList.add('active');
                    element.classList.add('dd-active');
                }
                element.click();
            } else {
                element.classList.remove('highlight');
            }
        });
    }

    toggleSubtext(e) {
        let target = e.target;
        if (target.localName === 'i') {
            target = e.target.parentElement;
        }

        let subtext = target.querySelector('.subtext');
        let chevron = target.querySelector('i');

        if (subtext.classList.contains('active')) {
            subtext.classList.remove('active');
            chevron.classList.remove('dd-active');
        } else {
            subtext.classList.add('active');
            chevron.classList.add('dd-active');
        }
    }

}
