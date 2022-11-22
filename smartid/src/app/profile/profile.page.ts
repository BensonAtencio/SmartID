import { Component, OnInit } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  sliders: IonSlides; 
  logH: any;
  userId: string;
  user: any;
  section: string;
  num: number;
  name: string;
  email: string;

  constructor(private auth: AuthService, private afs: AngularFirestore, private afauth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.user = user;
      this.name = user.userName;
      this.section = user.userSection;
      this.num = user.userNum;
      this.email = user.userEmail;
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
