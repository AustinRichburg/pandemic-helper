import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CityComponent } from './city/city.component';
import { CityChanceComponent } from './city-chance/city-chance.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { InfectionRateComponent } from './infection-rate/infection-rate.component';
import { PandemicVanillaComponent } from './pandemic-vanilla/pandemic-vanilla.component';
import { PandemicLegacyComponent } from './pandemic-legacy/pandemic-legacy.component';
import { VanillaCityTableComponent } from './vanilla-city-table/vanilla-city-table.component';

@NgModule({
  declarations: [
    AppComponent,
    CityComponent,
    CityChanceComponent,
    InfectionRateComponent,
    PandemicVanillaComponent,
    PandemicLegacyComponent,
    VanillaCityTableComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
