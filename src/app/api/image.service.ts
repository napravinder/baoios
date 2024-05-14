import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { Storage } from '@ionic/storage-angular';

export interface ApiImage {
  id: string;
  created: Date;
  image: string;
  classId:string;
}
 
@Injectable({
  providedIn: 'root'
})

export class ImageService {
  sno1:any;
  
  url = 'https://baobabsports.com/baosport/ios/get_gallery.php';
 
  constructor(private http: HttpClient,private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,private storage:Storage,) { 

      this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.sno1=sno;
          this.storageService.get('type').then((type) => {
           
          });
         
      
        }
      
      });
    }
 
  getImages() {
      //get stored sno no
 

//  this.http.post(this.url, {
//   "sno": this.sno1,
//   "type": 'trainer'
// }).subscribe(images => {
//     console.log(images+"x");
//   });;
  this.http.post('https://baobabsports.com/baosport/ios/get_gallery.php', {
    "sno": this.sno1,
    "type": 'trainer'
  }).subscribe(
    res => {
      console.log(res);
    },
    err => {
      console.log(err);
    }
  );

    
  }
 
  uploadImage(image64:any, name:any,classId1:any) {
    return this.http.post('https://baobabsports.com/baosport/ios/add_new_gallery.php', 
    {"sno":this.sno1,"image":image64,"video1":"","classId":classId1});
  }
 
  uploadImageFile(file: File,url:string) {
    const ext = file.name.split('.').pop();
    const formData = new FormData();
    formData.append('file', file, `myimage.${ext}`);
    formData.append('name', file.name);
    formData.append('sno',this.sno1);
    formData.append('type','f');
 
    return this.http.post(url, formData);
  }
 
  deleteImage(id:any) {
    return this.http.post('https://baobabsports.com/baosport/ios/delete_image.php', {"id":id});
  }
}
