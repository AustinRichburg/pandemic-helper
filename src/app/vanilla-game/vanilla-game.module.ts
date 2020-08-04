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
import { CreateMultiComponent } from '../shared/create-multi/create-multi.component';
import { JoinMultiComponent } from '../shared/join-multi/join-multi.component';
import { VanillaCityTableRemoteComponent } from './vanilla-city-table-remote/vanilla-city-table-remote.component';

@NgModule({
    declarations: [
        VanillaCityTableComponent,
        GameOverModalComponent,
        VanillaCityTableRemoteComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        VanillaGameRoutingModule,
        MatTableModule,
        MatDialogModule,
        MatButtonModule,
        MatSortModule
    ],
    entryComponents: [
        GameOverModalComponent,
        NotesComponent,
        NoteContentComponent,
        GameListComponent,
        CreateMultiComponent,
        JoinMultiComponent
    ]
})
export class VanillaGameModule { }
