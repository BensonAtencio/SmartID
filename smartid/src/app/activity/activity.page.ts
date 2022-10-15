import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from '../service/auth.service';
import { IonSlides } from '@ionic/angular';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {

  sliders: IonSlides;

  userId: string;
  user: any;
  activity: any;
  history: any[];


  constructor(private auth: AuthService, private afs: AngularFirestore, private afauth: AngularFireAuth, private router: Router) { }

  ngOnInit() {
    this.auth.user$.subscribe(user => {
      this.userId = user.userId;
      this.user = user;
      this.activity = user.userActivity;
    })

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
