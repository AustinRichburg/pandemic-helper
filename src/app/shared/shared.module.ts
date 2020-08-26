import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfectionRateComponent } from '../infection-rate/infection-rate.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';
import { NotesComponent, NoteContentComponent } from './notes/notes.component';
import { MatDialogModule } from '@angular/material/dialog';
import { GameListComponent } from './game-list/game-list.component';
import { JoinMultiComponent } from './join-multi/join-multi.component';
import { GameHistoryComponent } from './game-history/game-history.component';



@NgModule({
    declarations: [
        InfectionRateComponent,
        LoginComponent,
        SignupComponent,
        NotesComponent,
        NoteContentComponent,
        GameListComponent,
        JoinMultiComponent,
        GameHistoryComponent
    ],
    imports: [
        AppRoutingModule,
        CommonModule,
        MatButtonModule,
        FormsModule,
        MatDialogModule
    ],
    exports: [
        InfectionRateComponent,
        MatButtonModule,
        LoginComponent,
        SignupComponent,
        NotesComponent,
        MatDialogModule,
        NoteContentComponent,
        GameHistoryComponent
    ]
})
export class SharedModule { }
