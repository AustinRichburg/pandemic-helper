import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanillaCityTableComponent } from './vanilla-city-table/vanilla-city-table.component';
import { VanillaCityTableRemoteComponent } from './vanilla-city-table-remote/vanilla-city-table-remote.component';

const routes: Routes = [
    { path: 'vanilla', component: VanillaCityTableComponent },
    { path: 'vanilla/:gameId', component: VanillaCityTableRemoteComponent }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class VanillaGameRoutingModule { }