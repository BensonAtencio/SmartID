import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../service/auth.service';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  sliders: IonSlides;

  userId: string;
  user: any;
  
  logH: any;

  constructor(private auth: AuthService, private afs: AngularFirestore, private router: Router) {}

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.user = user
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
