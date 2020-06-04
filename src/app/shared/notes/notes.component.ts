import { Component, OnInit, Inject } from '@angular/core';
import { DeckService } from 'src/app/deck.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatDialogConfig } from '@angular/material/dialog';

@Component({
    selector: 'app-notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<NotesComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        public dialog: MatDialog,
        private deck: DeckService) { }

    ngOnInit() {
    }

    createNote() {
        let config = new MatDialogConfig();
        config.data = {name: this.data.name};
        this.dialog.open(NoteContentComponent, config);
    }

    deleteNote(index: number) {
        this.deck.deleteNote(this.data.name, index);
    }

}

@Component({
    selector: 'note-content',
    template: `<textarea name="" id="" cols="30" rows="10" [(ngModel)]="note"></textarea>
               <button mat-button (click)="onNoClick()">Cancel</button>
               <button mat-button (click)="addNote()">Add</button>`,
    styleUrls: ['./notes.component.scss']
})
export class NoteContentComponent {

    note: string = "";

    constructor(
        public dialogRef: MatDialogRef<NoteContentComponent>,
        @Inject(MAT_DIALOG_DATA) public data: DialogData,
        private deck: DeckService) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

    addNote() {
        this.deck.addNote(this.data.name, this.note);
        this.dialogRef.close();
    }

}

export interface DialogData {
    name: string
}
