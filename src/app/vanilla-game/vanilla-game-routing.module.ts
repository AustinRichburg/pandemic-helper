import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanillaCityTableComponent } from './vanilla-city-table/vanilla-city-table.component';

const routes: Routes = [
  { path: 'vanilla', component: VanillaCityTableComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class VanillaGameRoutingModule {
}