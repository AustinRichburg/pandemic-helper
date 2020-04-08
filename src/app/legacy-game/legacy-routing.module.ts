import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SeasonOneComponent } from './season-one/season-one.component';
import { SeasonTwoComponent } from './season-two/season-two.component';

const routes: Routes = [
  { path: 'legacy', component: HomeComponent },
  { path: 'legacy/season-one', component: SeasonOneComponent },
  { path: 'legacy/season-two', component: SeasonTwoComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class LegacyRoutingModule {
}