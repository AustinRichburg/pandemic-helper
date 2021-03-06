import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameOverModalComponent } from './game-over-modal/game-over-modal.component';
import { VanillaCityTableComponent } from './vanilla-city-table/vanilla-city-table.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { VanillaGameRoutingModule } from './vanilla-game-routing.module';
import { MatSortModule } from '@angular/material/sort';
import { NotesComponent, NoteContentComponent } from '../shared/notes/notes.component';
import { GameListComponent } from '../shared/game-list/game-list.component';
import { JoinMultiComponent } from '../shared/join-multi/join-multi.component';
import { VanillaGameComponent } from './vanilla-game.component';
import { LogisticsBtnGroupComponent } from './logistics-btn-group/logistics-btn-group.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        VanillaCityTableComponent,
        GameOverModalComponent,
        VanillaGameComponent,
        LogisticsBtnGroupComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        VanillaGameRoutingModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatSortModule,
        FormsModule
    ],
    entryComponents: [
        GameOverModalComponent,
        NotesComponent,
        NoteContentComponent,
        GameListComponent,
        JoinMultiComponent
    ]
})
export class VanillaGameModule { }
