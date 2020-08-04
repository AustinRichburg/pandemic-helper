import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesComponent, NoteContentComponent } from './notes.component';
import { MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DeckService } from 'src/app/deck.service';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('NotesComponent', () => {
    let component: NotesComponent;
    let fixture: ComponentFixture<NotesComponent>;
    let data = {
        name: 'Washington',
        notes: ['note 1', 'note 2'],
        deckService: DeckService
    }
    let nestedFixture: ComponentFixture<NoteContentComponent>;
    let nestedDialog: NoteContentComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ NotesComponent, NoteContentComponent ],
        imports: [ MatDialogModule, FormsModule ],
        providers: [
            { provide: DeckService, useClass: MockDeckService },
            { provide: MatDialogRef, useValue: {} }, {provide: MAT_DIALOG_DATA, useValue: data}
        ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NotesComponent);
        nestedFixture = TestBed.createComponent(NoteContentComponent);
        component = fixture.componentInstance;
        nestedDialog = nestedFixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should open new note creation', () => {
        let button = fixture.debugElement.query(By.css('button[name="create"]')).nativeElement;
        spyOn(component.dialog, 'open');

        button.dispatchEvent(new Event('click'));
        expect(component.dialog.open).toHaveBeenCalled();
    });

    it('should delete note on remove click', () => {
        let deleteButtons = fixture.debugElement.queryAll(By.css('.delete-btn'));
        spyOn(component, 'deleteNote');
        length = data.notes.length;

        deleteButtons.forEach(button => {
            button.nativeElement.dispatchEvent(new Event('click'));
        });
        expect(component.deleteNote).toHaveBeenCalledTimes(length);
    });

    it('should add new note', () => {
        let addNote = nestedFixture.debugElement.query(By.css('button[name="add"]')).nativeElement;
        let textarea = nestedFixture.debugElement.query(By.css('textarea')).nativeElement;

        spyOn(nestedDialog, 'addNote');

        textarea.value = "this is a new note";
        addNote.dispatchEvent(new Event('click'));

        expect(nestedDialog.addNote).toHaveBeenCalled();
    });

});

class MockDeckService {

    addNote() {
        return true;
    }

    deleteNote() {
        return true;
    }

}
