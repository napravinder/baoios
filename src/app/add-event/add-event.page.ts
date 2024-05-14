import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { ImageService, ApiImage } from '../api/image.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.page.html',
  styleUrls: ['./add-event.page.scss'],
})
export class AddEventPage implements OnInit {
  sno1: any; imageData:any;eventsno: any;
  res:any;
  postData={
    "event_name":'',
    "event_date":'',
    "event_time":'',
    "event_details":'',
    "eventImages":'',
    "sno":''
  };

imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  //@ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor(private http: HttpClient,private authService:AuthService,
    private storageService:StorageService,private api: ImageService,
    private router: Router,
    private toastSevice:ToastService,private storage:Storage
    ,private loadingCtrl: LoadingController,private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.storageService.get('type').then((type) => {
        this.postData.sno=sno;
      });
      }
    });
  }
  async selectImageSource() {
    const buttons = [
      {
        text: 'Take Photo',
        icon: 'camera',
        handler: () => {
          this.addImage(CameraSource.Camera);
        }
      },
      {
        text: 'Choose  Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
 
    // Only allow file selection inside a browser
    // if (!this.plt.is('hybrid')) {
    //   buttons.push({
    //     text: 'Choose a File',
    //     icon: 'attach',
    //     handler: () => {
    //       this.fileInput.nativeElement.click();
    //     }
    //   });
    // }
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }
//save data code here
apiUrl: string = 'https://baobabsports.com/baosport/ios/add_new_event.php';
validateInputs() {
  let event_name = this.postData.event_name.trim();
  let event_date = this.postData.event_date.trim();
  let event_time = this.postData.event_time.trim();
  let event_details = this.postData.event_details.trim();
  return (
  this.postData.event_name &&
  this.postData.event_date &&
  this.postData.event_details &&
  this.postData.event_time &&
  event_name.length > 0 &&
  event_details.length > 0 &&
  event_date.length > 0
  );
  }
  saveData() {
  if (this.validateInputs()) {
    this.presentLoading();
  this.http.post(this.apiUrl,this.postData).subscribe(
    response => {
      this.res=response;
      if(this.res['status']=='true'){
        console.log(this.res);
        this.eventsno=this.res['sno'];
        this.uploadImage();
  
      }else{
        this.toastSevice.presentToast("Something went wrong");
      }
    
    },
    err => {
      console.log(err);
      this.toastSevice.presentToast('Network Issue.');
    }
  );
  } else {
  this.toastSevice.presentToast('Please enter data.');
  }
  }
  //end of save data code here


  async addImage(source:any) {
     this.imageData = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
      source
    });
    //this.presentLoading();
    // const blobData = this.b64toBlob(image.base64String, `image/${image.format}`);
    // const imageName = 'Give me a name';

   
    
  }
uploadImage(){
  this.presentLoading();
  this.http.post('https://baobabsports.com/baosport/ios/add_new_event_images.php', {
    "sno":this.eventsno,"image":this.imageData.base64String
  }).subscribe(
    response => {
      this.res=response;
     if(this.res['status']=='true'){
      this.toastSevice.presentToast("Event Added Successfully");
      this.presentLoading();
      this.router.navigate(['/event']);
     }
    },
    err => {
      console.log(err);
    }
  );
}

 // Used for browser direct file upload
 uploadFile(event: EventTarget) {
  //  const url="https://baobabsports.com/baosport/ios/add_new_event_images.php";
  // this.presentLoading();
  // const eventObj: MSInputMethodContext = event as MSInputMethodContext;
  // const target: HTMLInputElement = eventObj.target as HTMLInputElement;
  // const file: File = target.files[0];
  // this.api.uploadImageFile(file,url).subscribe((newImage: ApiImage) => {
  //   this.presentLoading();
  // });
}

   // Helper function
  // https://stackoverflow.com/questions/16245767/creating-a-blob-from-a-base64-string-in-javascript
  b64toBlob(b64Data:any, contentType = '', sliceSize = 512) {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];
 
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);
 
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
 
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
 
    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:2500
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }

}
