import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VanillaCityTableComponent } from './vanilla-city-table/vanilla-city-table.component';

const routes: Routes = [
    { path: '', component: VanillaCityTableComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
