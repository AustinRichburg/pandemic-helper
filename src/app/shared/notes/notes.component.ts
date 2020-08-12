import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';
import { Observable } from 'rxjs';

export interface DialogData {
    name: string,
    notes: Observable<string[]>,
    deckService: DeckService
}

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    deck: any;
    notes: string[]

    constructor(public dialogRef: MatDialogRef<NotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog) {
            console.log(data.notes)
            data.notes.subscribe(
                notes => {this.notes = notes; console.log('notes updated')}
            );
            this.deck = data.deckService;
    }

    ngOnInit() { }

    createNote() {
        let config = new MatDialogConfig();
        config.data = {name: this.data.name, deckService: this.deck};
        this.dialog.open(NoteContentComponent, config);
    }

    deleteNote(index: number) {
        this.deck.deleteNote(this.data.name, index);
    }

}

@Component({
    selector: 'note-content',
    template: `<textarea cols="30" rows="10" [(ngModel)]="note"></textarea>
               <button mat-button (click)="dialogRef.close()">Cancel</button>
               <button mat-button name="add" (click)="addNote()">Add</button>`,
    styleUrls: ['./notes.component.scss']
})
export class NoteContentComponent {

    note: string = "";
    deck: any;

    constructor(
        public dialogRef: MatDialogRef<NoteContentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData) {
            this.deck = data['deckService'];
        }

    addNote() {
        this.deck.addNote(this.data.name, this.note);
        this.dialogRef.close();
    }

}
