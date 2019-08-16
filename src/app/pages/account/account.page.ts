import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

require('firebase/auth');

declare var require: any
declare var window;

@Component({
  selector: 'app-account',
  templateUrl: './account.page.html',
  styleUrls: ['./account.page.scss'],
})
export class AccountPage implements OnInit {
  public recaptchaVerifier: firebase.auth.RecaptchaVerifier;
  verificationId: any = '';
  phone: any = '';
  code: string = "";
  isSendOTP: boolean;
  myLogin: FormGroup;
  error_messages = {
    'phone': [
      {
        type: 'require', messages: 'Bạn vui lòng nhập số điện thoại '
      },
      {
        type: 'pattern', messages: 'Ex: [0334456992]'
      }
    ],
    'code': [
      { type: require, messages: 'Bạn vui lòng nhập mã code' }
    ]
  }
  constructor(public navCtrl: NavController, public router: Router, public formBuilder: FormBuilder) {
    this.myLogin = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern("^((\\+84-?)|0)?[0-9]{9}$")
      ])),
      code: new FormControl('', Validators.compose([
        Validators.required, Validators.maxLength(6),
        Validators.pattern("^((\\+91-?)|0)?[0-9]{6}$")
      ]))
    })
  }
  ngOnInit() {
    this.isSendOTP = false;
    }

    send(phone: any) {
      let b = this.phone.slice(0, 1);
      let a = this.phone.slice(1);
      let number;
      if (b == '+')
        number = "+" + a;
      else if (b == '0')
        number = "+84" + a;
      window.FirebasePlugin.verifyPhoneNumber(number, 60, (credential) => {
        let code = credential.instantVerification ? credential.code : phone.value;
        this.verificationId = credential.verificationId;
        this.isSendOTP = true;
      }, (error: any) => {
        console.error(error);
      });
      alert("OTP gửi thành công");
    }
  
    verify() {
      let signInCredential = firebase.auth.PhoneAuthProvider.credential(this.verificationId, this.code);
      firebase.auth().signInWithCredential(signInCredential).then((info) => {
        this.router.navigate(['home']);
      }, (error) => {
        console.log(error);
        alert("OTP không chính xác");
      });
    }
    // register() {
    //   this.router.navigate(['register']);
    // }
    // loginEmail() {
    //   this.router.navigate(['login-email']);
    // }
}




