import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfectionRateComponent } from '../infection-rate/infection-rate.component';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [InfectionRateComponent],
    imports: [
        CommonModule,
        MatButtonModule
    ],
    exports: [
        InfectionRateComponent,
        MatButtonModule
    ]
})
export class SharedModule { }
