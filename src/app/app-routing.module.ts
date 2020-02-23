import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PandemicVanillaComponent } from './pandemic-vanilla/pandemic-vanilla.component';
import { PandemicLegacyComponent } from './pandemic-legacy/pandemic-legacy.component';


const routes: Routes = [
  {path: '', component: PandemicVanillaComponent},
  {path: 'legacy', component: PandemicLegacyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
