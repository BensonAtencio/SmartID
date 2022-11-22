import { Component, OnInit } from '@angular/core';
import { IonItemDivider, IonSlides } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../service/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QrcodePage implements OnInit {

  sliders: IonSlides;

  qrString: any[];
  userId: string;
  user: any;

  logH: any;

  constructor(private auth: AuthService, private afs: AngularFirestore, private afauth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.user = user;
      this.qrString = [user.userName , user.userSection];
      
    })
    this.logH = firebase.auth().currentUser.metadata.lastSignInTime;
  }

  activity(){
    this.afs.collection('user').doc(this.userId).set({
        'userActivity': this.logH
      },{merge: true});
    
    this.router.navigate(['/activity'])
    }


  slide0pts={
    loop:true
  };
  slidesDidLoad(slides:IonSlides){
    slides.startAutoplay();
  }

  logout(){
    this.auth.signOut();
  }

}
