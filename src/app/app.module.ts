import { BrowserModule, Title } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog';

import { HeaderComponent } from './header/header.component';
import { VanillaGameModule } from './vanilla-game/vanilla-game.module';
import { SharedModule } from './shared/shared.module';
import { LegacyGameModule } from './legacy-game/legacy-game.module';
import { RulesComponent } from './rules/rules.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RulesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    VanillaGameModule,
    LegacyGameModule,
    SharedModule,
    FormsModule
  ],
  providers: [Title],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
