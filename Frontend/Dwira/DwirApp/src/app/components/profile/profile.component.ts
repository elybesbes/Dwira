import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CloudinaryService } from '../../services/cloudinaryupload.service';
import { AuthService } from '../../services/auth.service';
import {User} from '../../models/User'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {
  profileImage: File | null = null;

  user : User[] =[];
  constructor(
    private router: Router,
    private cloudinaryService: CloudinaryService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {
    const user = this.authService.getUserInfoFromToken();
    console.log('User:', user);
    if (user) {
      const userId = user.nameid;
      console.log('User ID:', userId);
    } else {
      console.error('User not found or invalid token');
    }
  }

  onSelect(event: any) {
    if (event && event.addedFiles && event.addedFiles.length > 0) {
      const file: File = event.addedFiles[0];
      this.profileImage = file;
    }
  }

  onRemove() {
    this.profileImage = null;
  }

  getAllUsers() {
    this.authService.getAllUsers().subscribe(
      {
        next: (user) => {
          this.user = user;
        },
        error: (response) => {
          console.log(response);
        }
      }
    );
  }

  OnUpload() {
    if (this.profileImage) {
      this.cloudinaryService.uploadPhoto(this.profileImage).subscribe(
        (response) => {
          console.log('Upload successful:', response);
          console.log('response Url',response.url)
          this.updateProfileImage(response.url);
          this.router.navigate(['/home']);     
        },
        (error) => {
          console.error('Upload error:', error);
        }
      );
    } else {
      console.log('No image selected.');
    }
  }

  updateProfileImage(imageUrl: string) {
    const user = this.authService.getUserInfoFromToken();
    const userId = user.nameid;
    console.log('user id to update', userId);
    this.authService.updateProfileImage(userId, imageUrl).subscribe(
      (response) => {
        console.log('Profile image updated successfully:', response);
        alert('Profile image updated successfully.');
      },
      (error) => {
        console.error('Failed to update profile image:', error);
        alert('Failed to update profile image. Please try again.');
      }
    );
  }

  goToHome() {
    this.router.navigate(['/home']);
  }


}
