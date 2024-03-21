import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})

export class HomeComponent {

  guestHouses: { name: string, localization: string, photoLink: string }[] = [
    { name: 'Dar El Gaïed El Maâmouri', localization: 'Hammamet, Nabeul, Tunisia', photoLink: '../../../assets/first.jpg' },
    { name: 'Dar la vie est belle', localization: 'Salakta, Mahdia, Tunisia', photoLink: '../../../assets/second.jpg' },
    { name: 'Le Foret bleu', localization: 'Cap Blanc, Bizerte, Tunisia', photoLink: '../../../assets/third.jpg' },
    { name: 'Dar Zaghouene', localization: 'Zaghouene, Tunisia', photoLink: '../../../assets/fourth.jpg' }
  ];

  currentIndex: number= 0;
  profilePhotoURL: string ='';
  isFirstClicked: boolean = false;
    isSecondClicked: boolean = false;
    isThirdClicked: boolean = false;
    isFourthClicked: boolean = false;

  constructor(
    private router : Router,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.profilePhotoURL = this.GetProfilePhoto();
    //this.incrementCurrentIndex();
  }

  GetProfilePhoto() {
    const user = this.authService.getUserInfoFromToken();
    if (user && user.website) {
      const imageProfileURL = user.website;
      return imageProfileURL;
    } else {
      console.error('Error Loading Photo');
      return 'Error Loading Photo';
    }
  }

  first() {
    this.currentIndex = 0
    this.isFirstClicked = true;
    this.resetClickedStates('isFirstClicked');
}

second() {
  this.currentIndex = 1
    this.isSecondClicked = true;
    this.resetClickedStates('isSecondClicked');
}

third() {
  this.currentIndex = 2
    this.isThirdClicked = true;
    this.resetClickedStates('isThirdClicked');
}

fourth() {
  this.currentIndex = 3
    this.isFourthClicked = true;
    this.resetClickedStates('isFourthClicked');
}

  resetClickedStates(currentClicked: string) {
    if (currentClicked !== 'isFirstClicked') this.isFirstClicked = false;
    if (currentClicked !== 'isSecondClicked') this.isSecondClicked = false;
    if (currentClicked !== 'isThirdClicked') this.isThirdClicked = false;
    if (currentClicked !== 'isFourthClicked') this.isFourthClicked = false;
}
 
  openArrivalDatePicker() {
    // Implement your arrival date picker logic here
    console.log('Open Arrival Date Picker');
  }

  openDepartureDatePicker() {
    // Implement your departure date picker logic here
    console.log('Open Departure Date Picker');
  }

}
