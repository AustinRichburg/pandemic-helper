import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InfectionRateComponent } from '../infection-rate/infection-rate.component';
import { MatButtonModule } from '@angular/material/button';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AppRoutingModule } from '../app-routing.module';
import { FormsModule } from '@angular/forms';



@NgModule({
    declarations: [InfectionRateComponent, LoginComponent, SignupComponent],
    imports: [
        AppRoutingModule,
        CommonModule,
        MatButtonModule,
        FormsModule
    ],
    exports: [
        InfectionRateComponent,
        MatButtonModule,
        LoginComponent,
        SignupComponent
    ]
})
export class SharedModule { }
