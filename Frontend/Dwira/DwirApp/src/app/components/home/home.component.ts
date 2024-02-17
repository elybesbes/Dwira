import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})



export class HomeComponent {

  constructor(
    private router : Router,
    private authService: AuthService,
  ) {}

  
  
  GetProfilePhoto() {
    const user = this.authService.getUserInfoFromToken();
    if (user && user.website) {
      const imageProfileURL = user.website;
      return imageProfileURL;
    } else {
      console.error('Problem in profile photo');
      return '';
    }
  }
  

}
