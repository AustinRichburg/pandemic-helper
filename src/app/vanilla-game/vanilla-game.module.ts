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

@NgModule({
    declarations: [
        VanillaCityTableComponent,
        GameOverModalComponent
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
    entryComponents: [GameOverModalComponent]
})
export class VanillaGameModule { }
