import { Component, OnInit, Inject } from '@angular/core';
import { WuiFirebaseAuthService } from '../../services/wui-firebase-auth.service';
import { Router } from '@angular/router';
import { WuiService } from '../../../../../wui/src/lib/services/wui.service';

@Component({
  selector: 'wui-firebase-verify-phone',
  templateUrl: './verify-phone.component.html',
  styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {

  title: string;
  description: string;
  nomorInputDecoration: any;
  buttonText: string;

  constructor(
    private authService: WuiFirebaseAuthService,
    private router: Router,
    private wuiService: WuiService,
    @Inject('wuiFirebaseDecoration') private decoration: any
  ) { }

  async signOut() {
    try {
      this.wuiService.openLoading();
      await this.authService.signOut();
      this.wuiService.closeLoading();
      this.router.navigate(['/landing']);
    } catch(e) {
      this.wuiService.closeLoading();
    }
  }

  ngOnInit(): void {
    this.title = this.decoration?.verifyPhoneDecoration?.title || 'Verifikasi Nomor';
    this.description = this.decoration?.verifyPhoneDecoration?.description || 'Masukkan nomor handphone anda untuk melanjutkan aplikasi';
    this.buttonText = this.decoration?.verifyPhoneDecoration?.buttonText || 'VERIFIKASI SEKARANG';
    this.nomorInputDecoration = Object.assign({
      labelText: "Nomor Handphone",
      icon: "cellphone"
    }, this.decoration?.verifyPhoneDecoration?.nomorInputDecoration || {});
  }

}
