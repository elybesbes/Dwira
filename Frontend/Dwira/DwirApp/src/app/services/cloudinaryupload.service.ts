import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CloudinaryService {
  cloudName = 'photoscloud';
  uploadPreset = 'nibtvkme'; 

  constructor(private http: HttpClient) { }

  uploadPhoto(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', this.uploadPreset);
    return this.http.post<any>(`https://api.cloudinary.com/v1_1/${this.cloudName}/image/upload`, formData);
  }
}
