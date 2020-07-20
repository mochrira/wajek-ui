import { NgModule, ModuleWithProviders } from '@angular/core';
import { WuiFirebaseHttpService } from './services/wui-firebase-http.service';
import { WuiFirebaseService } from './services/wui-firebase.service';
import { WuiModule } from 'wui';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { wuiFirebaseRouting } from './routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { VerifyPhoneComponent } from './pages/verify-phone/verify-phone.component';
import { AppComponent } from './app/app.component';
import { RegisterUndanganComponent } from './pages/register-undangan/register-undangan.component';
import { RegisterLembagaComponent } from './pages/register-lembaga/register-lembaga.component';
import { RegisterComponent } from './pages/register/register.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(wuiFirebaseRouting),
    WuiModule.forRoot()
  ],
  declarations: [
    LandingComponent,
    LoginComponent,
    VerifyPhoneComponent,
    AppComponent,
    RegisterUndanganComponent,
    RegisterLembagaComponent,
    RegisterComponent
  ],
  exports: [
    AppComponent
  ]
})
export class WuiFirebaseModule {

  static forRoot(decoration: any): ModuleWithProviders<WuiFirebaseModule> {

    return {
      ngModule: WuiFirebaseModule,
      providers: [
        WuiFirebaseService,
        WuiFirebaseHttpService,
        {
          provide: 'wuiFirebaseDecoration', 
          useValue: decoration
        }
      ]
    };
  }

}