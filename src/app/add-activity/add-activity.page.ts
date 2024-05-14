import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ActionSheetController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.page.html',
  styleUrls: ['./add-activity.page.scss'],
})
export class AddActivityPage implements OnInit {
  res:any;
  sno1: any;type1: any;imageData:any;actsno: any;className:any;
  lessonName:any;levelName:any;
  lesson_code:any;age_groups:any;
 
  postData={
    "grouplevelID":'',
    "agegroupID":'',
    "classID":'',
    "lessonID":'',
    "month":'',
    "atime":'',
    "lessonCode":'',
    "activityName":'',
    "lessonIntro":'',
    "unitUsed":'',
    "warmup":'',
    "activityDetail":'',
    "activityTime":'',
    "activityBenefits":'',
    "coolDown":'',
    "homeWork":'',
    "video":'',
    "sno":''
  }
  constructor(private http: HttpClient,private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,private storage:Storage,private loadingCtrl: LoadingController,private plt: Platform, private actionSheetCtrl: ActionSheetController) { }

  ngOnInit() {
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.sno1=sno;
        this.storageService.get('type').then((type) => {
        this.postData.sno=sno;
        this.type1=type;
        this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
          "sno": sno,
          "type": 'className',
          "type2":type,
          "select":""
        }).subscribe(
          response => {
            this.res=response;
            this.className=this.res['className'];
            
          },
          err => {
            console.log(err);
          }
        );
      });
      }
    });
  }
  //=----------------------------------------------------------------
  getLesson(){
    this.presentLoading();

      this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
        "sno": this.sno1,
        "type": 'lessonName',
        "type2":this.type1,
        "select":this.postData.classID
      }).subscribe((res:any=[]) => {
          this.lessonName=res['lessonName'];
        
        },
        err => {
          console.log(err);
        }
      );
  }
    //=----------------------------------------------------------------
  getlevelName(){
    this.presentLoading();

    this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
      "sno": this.sno1,
      "type": 'levelName',
      "type2":this.type1,
      "select":this.postData.classID
    }).subscribe((res:any=[]) => {
        this.levelName=res['levelName'];
      
      },
      err => {
        console.log(err);
      }
    );
  }
  //=----------------------------------------------------------------
 
  getData(){
      this.presentLoading();
  
      this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
        "sno": this.sno1,
        "type": 'new_get_data',
        "type2":this.type1,
        "select":"",
        "table":"",
        "class_id":this.postData.classID,
        "lesson_id":this.postData.lessonID,
        "level_id":this.postData.grouplevelID
      }).subscribe((res:any=[]) => {
          this.lesson_code=res['lesson_code'];
          
          this.age_groups=res['age_groups'];
        
        },
        err => {
          console.log(err);
        }
      );
    }
    //=----------------------------------------------------------------
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
  }
  //=----------------------------------------------------------------
  //save data code here
apiUrl: string = 'https://baobabsports.com/baosport/ios/add_new_activity.php';
validateInputs() {
  let grouplevelID = this.postData.grouplevelID.trim();
  let classID = this.postData.classID.trim();
  let lessonID = this.postData.lessonID.trim();
  let activityName = this.postData.activityName.trim();
  let lessonIntro = this.postData.lessonIntro.trim();
  let unitUsed = this.postData.unitUsed.trim();

  return (
  this.postData.grouplevelID &&
  this.postData.classID &&
  grouplevelID.length > 0 &&
  classID.length > 0 &&
  lessonIntro.length > 0 &&
  lessonID.length > 0
  );
  }
    //=----------------------------------------------------------------
  saveData() {
  if (this.validateInputs()) {
    this.presentLoading();
  this.http.post(this.apiUrl,this.postData).subscribe((res:any=[]) => {

      if(res['status']=='true'){
        console.log(res);
        this.actsno=res['sno'];
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


  async addImage(source: CameraSource) {
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
  this.http.post('https://baobabsports.com/baosport/ios/add_new_images.php', {
    "sno":this.actsno,"image":this.imageData.base64String
  }).subscribe(
    res => {
      console.log(res);
      this.toastSevice.presentToast("Activity Added Successfully");
    },
    err => {
      console.log(err);
    }
  );
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
