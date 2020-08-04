import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Rules } from '../constants';

@Component({
    selector: 'app-rules',
    templateUrl: './rules.component.html',
    styleUrls: ['./rules.component.scss']
})
export class RulesComponent implements OnInit {

    /* Rules object found in src/app/constants.ts file */
    rules: Object = Rules;

    /* URL param indicating which rulebook to display (ie. legacy, vanilla) */
    ruleSet: string;

    /* Text user is searching */
    searchText: string;

    /* Array of all searchable HTML elements */
    searchableText: NodeListOf<HTMLElement>;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        this.ruleSet = this.route.snapshot.paramMap.get('type');
        this.searchText = '';
    }

    ngAfterViewInit() {
        this.searchableText = document.getElementById('rules').querySelectorAll('.section-header, .text-section, .subtext');
    }

    /**
     * Called on each keystroke of the searchbar. Searches through all elements that have been deemed searchable in the
     * searchableText array and highlights anything matched against the phrase the user has typed.
     */
    onSearch() : void {
        // If the user deletes the search phrase, remove all highlights
        if (this.searchText.trim() === '') {
            this.searchableText.forEach(element => {
                element.classList.remove('highlight');
            });
            return;
        }
       
        // Highlights all matching text and activates the dropdowns if necessary
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

    /**
     * Toggles the subtext of rules.
     * @param e The click event.
     */
    toggleSubtext(e: any) : void {
        let target = e.target;
        console.log(e)
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
