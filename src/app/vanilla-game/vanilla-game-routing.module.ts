import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VanillaGameComponent } from './vanilla-game.component';


const routes: Routes = [
    { path: 'vanilla', component: VanillaGameComponent },
    { path: 'vanilla/:id', component: VanillaGameComponent }
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