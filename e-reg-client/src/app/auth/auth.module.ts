import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { BasicDetailComponent } from './basic-detail/basic-detail.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';


@NgModule({
  declarations: [SignupComponent, LoginComponent, BasicDetailComponent, EmailVerificationComponent, PhoneVerificationComponent, CompleteRegistrationComponent],
  imports: [
    CommonModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
