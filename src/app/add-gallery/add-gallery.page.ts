import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { ImageService, ApiImage } from '../api/image.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { Platform, ActionSheetController,AlertController  } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { PopoverController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';


@Component({
  selector: 'app-add-gallery',
  templateUrl: './add-gallery.page.html',
  styleUrls: ['./add-gallery.page.scss'],
})
export class AddGalleryPage implements OnInit {
  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;
  images:any;
  res:any;
  resClass:any;
  selectedNumber:any;
  croppedImagepath = "";
  className:any;
  isLoading = false;
  selectedClassId:any;
  imagePickerOptions = {
    maximumImagesCount: 1,
    quality: 50
  };
  sno1:any;
 // @ViewChild('fileInput', { static: false }) fileInput: ElementRef;
  constructor( private http: HttpClient,private authService:AuthService,
    private storageService:StorageService,
    private popoverCtrl: PopoverController,
    private alertCtrl: AlertController,
    private toastSevice:ToastService,private storage:Storage,private api: ImageService,
     private loadingCtrl:LoadingController,private plt: Platform, private actionSheetCtrl: ActionSheetController) {
      this.loadImages();
   }
   loadImages() {
      //get stored sno no
 this.storageService.get('sno').then((sno) => {
  if (sno !== false) {

    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_gallery.php', {
        "sno": sno,
        "type": type
      }).subscribe(
        response => {
          this.res=response;
          this.images=this.res['view_images'];
          console.log(this.res)
        },
        err => {
          console.log(err);
        }
      );


      this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
          "sno": sno,
          "type": 'className',
          "type2":type,
          "select":""
        }).subscribe(
          response => {
            this.resClass=response;
            this.className=this.resClass['className'];
             
          },
          err => {
            console.log(err);
          }
        );
    });
   

  }
});
  }
  
  filterImagesByClass(classId: string): any[] {
    return this.images.filter((img: { classId: string; }) => img.classId === classId);
  }
  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };
  

 

  // async selectImageSource() {
  //   const buttons = [
  //     {
  //       text: 'Select Number',
  //       icon: 'list',
  //       handler: () => {
  //         this.showNumberSelectorPopover();
  //       }
  //     },
  //     {
  //       text: 'Take Photo',
  //       icon: 'camera',
  //       handler: () => {
  //         this.addImage(CameraSource.Camera);
  //       }
  //     },
  //     {
  //       text: 'Choose  Photo',
  //       icon: 'image',
  //       handler: () => {
  //         this.addImage(CameraSource.Photos);
  //       }
  //     }
  //   ];
 
    
 
  //   const actionSheet = await this.actionSheetCtrl.create({
  //     header: 'Select Image Source',
  //     buttons
  //   });
    
  //   await actionSheet.present();
  // }
  
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
        text: 'Choose Photo',
        icon: 'image',
        handler: () => {
          this.addImage(CameraSource.Photos);
        }
      }
    ];
  
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
  
    await actionSheet.present();
  
    const options = this.className.map((option: { className: any; id: any; }) => ({
      name: 'option',
      type: 'radio',
      label: option.className,
      value: option.id
    }));
  
    const alert = await this.alertCtrl.create({
      header: 'Select Option',
      inputs: options,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: (selectedOption) => {
            this.selectedClassId=selectedOption;
          }
        }
      ]
    });
  
    await alert.present();
  }
  async showNumberSelectorPopover() {
    const numbers = Array.from({ length: 12 }, (_, index) => index + 1);
  
    const popover = await this.popoverCtrl.create({
      component: 'number-selector',
      componentProps: {
        numbers,
        onSelect: (selectedNumber: any) => {
          console.log(`Selected Number: ${selectedNumber}`);
          // You can perform any action with the selected number here
        }
      },
      translucent: true
    });
  
    await popover.present();
  }
  
  async addImage(source: CameraSource) {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source
    }).catch(reason => {
      console.error('error while taking picture', reason);
      });;
    // this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      const imageName = 'Give me a name';
      let base64Image =  image;
      this.api.uploadImage(base64Image, imageName,this.selectedClassId).subscribe(() => {
                this.loadImages();
                this.presentLoading();
             }, (err) => {
              // Handle error
             });
    // }, (err) => {
    //   // Handle error
    // });
//     this.camera.getPicture(this.options).then((imageData) => {
//       // imageData is either a base64 encoded string or a file URI
//       // If it's base64 (DATA_URL):
//       const imageName = 'Give me a name';
//       let base64Image = 'data:image/jpeg;base64,' + imageData;
//       this.api.uploadImage(base64Image, imageName).subscribe((newImage: ApiImage) => {
//         this.loadImages();
//         this.presentLoading();
//      }, (err) => {
//       // Handle error
//      });
//  });
}
 
 // Used for browser direct file upload
 uploadFile(event: EventTarget) {
  // this.presentLoading();
  // const eventObj: MSInputMethodContext = event as MSInputMethodContext;
  // const target: HTMLInputElement = eventObj.target as HTMLInputElement;
  // const file: File = target.files[0];
  // this.api.uploadImageFile(file,"https://baobabsports.com/baosport/ios/add_new_gallery.php").subscribe((newImage: ApiImage) => {
  //   this.loadImages();
  //   this.presentLoading();
  // });
}
  // Used for browser direct file upload
  // uploadFile(event: EventTarget) {
  //   const eventObj: MSInputMethodContext = event as MSInputMethodContext;
  //   const target: HTMLInputElement = eventObj.target as HTMLInputElement;
  //   const file: File = target.files[0];
  //   this.api.uploadImageFile(file).subscribe((newImage: ApiImage) => {
  //     this.images.push(newImage);
  //   });
  // }
 
  deleteImage(image: ApiImage, index:any) {
    this.api.deleteImage(image.id).subscribe(response => {
      this.images.splice(index, 1);
      this.res=response;
      if(this.res['status']=='true'){
        this.toastSevice.presentToast("image deleted Successfully");
  
      }else{
        this.toastSevice.presentToast("Something went wrong");
      }

    });
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
  ngOnInit() {
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }
  
}
