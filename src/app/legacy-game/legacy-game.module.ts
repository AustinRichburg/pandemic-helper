import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeasonOneComponent } from './season-one/season-one.component';
import { SeasonTwoComponent } from './season-two/season-two.component';
import { HomeComponent } from './home/home.component';
import { LegacyRoutingModule } from './legacy-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [SeasonOneComponent, SeasonTwoComponent, HomeComponent],
  imports: [
    CommonModule,
    SharedModule,
    LegacyRoutingModule
  ]
})
export class LegacyGameModule { }
