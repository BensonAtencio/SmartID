import { Component } from '@angular/core';
import { IonSlides } from '@ionic/angular';
import { AuthService } from '../service/auth.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AuthService) {
    
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
