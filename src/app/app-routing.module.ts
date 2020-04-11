import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RulesComponent } from './rules/rules.component';

const routes: Routes = [
    { path: '', redirectTo: '/vanilla', pathMatch: 'full' },
    { path: 'rules/:type', component: RulesComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
