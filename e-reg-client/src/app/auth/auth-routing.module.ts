import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BasicDetailComponent } from './basic-detail/basic-detail.component';
import { CompleteRegistrationComponent } from './complete-registration/complete-registration.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { PhoneVerificationComponent } from './phone-verification/phone-verification.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [{
  path: 'signup',
  component: SignupComponent,
  children: [
    { path: 'basic-detail', component: BasicDetailComponent },
    { path: 'email-verification', component: EmailVerificationComponent },
    { path: 'phone-verification', component: PhoneVerificationComponent },
    { path: 'complete-registation', component: CompleteRegistrationComponent }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
