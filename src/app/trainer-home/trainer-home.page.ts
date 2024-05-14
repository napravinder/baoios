import { Component, OnInit,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalAssessmentPage } from '../modal-assessment/modal-assessment.page';
import { ToastService } from '../services/toast.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform , ActionSheetController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';

@Component({
  selector: 'app-trainer-home',
  templateUrl: './trainer-home.page.html',
  styleUrls: ['./trainer-home.page.scss'],
})
export class TrainerHomePage implements OnInit {
  @ViewChild(IonModal) modal: IonModal | undefined;
  subscription: any;
  ticker:any;
  
  atype: any;
  res: any;
  my: boolean = false;
  event: boolean = true;imageData:any;
  topColor="#F9BE7C";eventColor:any;activityColor:any;workColor:any;
  trainerName = "";trainerAddress:any; trainerImage = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  bad = "notactive"; ok = "notactive"; verygood = "notactive"; good = "notactive"; excellent = "notactive";
  sno1 = "";
  //@ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any;
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  upcomingcard: any

  constructor(private appCom:AppComponent,private http: HttpClient, private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
     private loadingCtrl: LoadingController, 
     public modalCtrl: ModalController,
       private platform: Platform,
     private toastSevice: ToastService,
     private actionSheetCtrl: ActionSheetController

     ) {



    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{ "photo": "1.png" }, { "photo": "2.png" }, { "photo": "3.png" }, { "photo": "4.png" }, { "photo": "5.png" }, { "photo": "6.png" }, { "photo": "7.png" }]
    };

    //get stored sno no
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.sno1 = sno;
        this.http.post('https://baobabsports.com/baosport/ios/slider_images.php', {
          "sno": sno,
          "type": 'trainer'
        }).subscribe((res:any=[]) =>{
            // Item object for Nature
            this.sliderOne =
            {
              isBeginningSlide: true,
              isEndSlide: false,
              slidesItems: res['images']
            };
           
          },
          err => {
            console.log(err);
          }
        );
        this.http.post('https://baobabsports.com/baosport/ios/news.php', {
          "sno": sno,
          "type": 'trainer'
        }).subscribe((res11:any=[]) => {
                this.ticker=res11['ticker'][0].news;
          },
          err => {
            console.log(err);
            
          }
        );

      } else {
        authService.logout();
      }
      this.presentLoading();
      this.http.post('https://baobabsports.com/baosport/ios/single_user_data.php', {
        "sno": sno,
        "type": 'trainer'
      }).subscribe((res1:any=[]) => {
        
          if (res1['status'] == "notfound") {
            authService.logout();
          } else {
            this.trainerName = res1['name'];
            this.trainerAddress=res1['address'];
            this.appCom.username=res1['name'];
            this.appCom.fname = res1['address'];
            if (res1['profile_pic']) {
              this.trainerImage = res1['profile_pic'];
            }

            if (res1['rate'] > 4) {
              this.bad = "bad";
              this.ok = "ok";
              this.verygood = "verygood";
              this.good = "good";
              this.excellent = "excellent";
            } else if (res1['rate'] > 3) {
              this.bad = "bad";
              this.ok = "ok";
              this.good = "good";
              this.verygood = "verygood";
              this.excellent = "notactive";
            } else if (res1['rate'] > 2) {
              this.bad = "bad";
              this.ok = "ok";
              this.good = "good";
              this.verygood = "notactive";
              this.excellent = "notactive";
            }
            else if (res1['rate'] > 1) {
              this.bad = "bad";
              this.ok = "ok";
              this.good = "notactive";
              this.verygood = "notactive";
              this.excellent = "notactive";
            } else {
              this.bad = "bad";
              this.ok = "notactive";
              this.good = "notactive";
              this.verygood = "notactive";
              this.excellent = "notactive";
            }
          }
          this.upcoming(sno);
          //set color
          this.topColor=res1['colors'][0].top;
          this.eventColor=res1['colors'][0].event;
          this.activityColor=res1['colors'][0].activity;
          this.workColor=res1['colors'][0].work;
          //set color
        },
        err => {
          console.log(err);
          this.toastSevice.presentToast('Network Issue.');
        }
      );
    });

  }
  async showModal() {
    const modal = await this.modalCtrl.create({
      component: ModalAssessmentPage
    });
    return await modal.present();
  }


  ngOnInit() {
  }
  
  upcoming(sno: any) {
    this.http.post('https://baobabsports.com/baosport/ios/get_upcoming_events.php', {
      "sno": sno,
      "type": 'trainer'
    }).subscribe((res2:any=[]) => {
        console.log(res2['upcoming_events']);
        this.upcomingcard = res2['upcoming_events'];
        if (res2['upcoming_events'][0].type == "my") {
          this.my = true;
          this.event = false;

        } else {
          this.event = true;
          this.my = false;
        }

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
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  addprayer() {
    this.presentLoading();
    this.router.navigate(['/add-prayer-activity']);
  }
  playAtHome() {
    this.presentLoading();
    this.router.navigate(['/playathome']);
  }
  gallery() {
    this.presentLoading();
    this.router.navigate(['/add-gallery']);
  }
  admission() {
    this.presentLoading();
    this.router.navigate(['/admission']);
  }
  timetable() {
    this.presentLoading();
    this.router.navigate(['/triner-timertable']);
  }
  foodandnutrition() {
    this.presentLoading();
    this.router.navigate(['/foodandnutrition']);
  }
  fitnessfun() {
    this.presentLoading();
    this.router.navigate(['/fitnessfun']);
  }
  skill() {
    this.presentLoading();
    this.router.navigate(['/skill']);
  }
  feedback() {
    this.presentLoading();
   // this.router.navigate(['/business-feedback']);
  }
  eventDetail(id: any, type: any) {
    this.presentLoading();
    this.router.navigate(['/event-detail', { id: id, type: type }]);
  }
  logBook() {
    this.presentLoading();
    this.router.navigate(['/logbook-trainer']);
  }
  training(){
    this.presentLoading();
    this.router.navigate(['/training']);
  }
  curriculum(){
    this.presentLoading();
    this.router.navigate(['/curriculum']);
  }
  addnewStudent(){
    this.router.navigate(['/add-new-student']);
  }
  addAssessment(){
    this.router.navigate(['/add-assessment']);
  }
  addEvent(){
    this.presentLoading();
    this.router.navigate(['/event']);
  }
  addActivity(){
    this.presentLoading();
    this.router.navigate(['/activity']);
  }
  trainingRequest(){
    this.presentLoading();
    this.router.navigate(['/training-request']);
  }
  upcomingEvent(){
    this.presentLoading();
    this.router.navigate(['/upcomingevent']);
  }
  
  newsBoard(){
    this.presentLoading();
    this.router.navigate(['/newsboard']);
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
 
    
 
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Select Image Source',
      buttons
    });
    await actionSheet.present();
  }
  async addImage(source:any) {
    this.imageData = await Camera.getPhoto({
     quality: 60,
     allowEditing: true,
     resultType: CameraResultType.Base64,
     source
   }).catch(reason => {
      console.error('error while taking picture', reason);
      });
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/update_profile.php', {
      "sno":this.sno1,"type":'trainer',"image":this.imageData.base64String
    }).subscribe((res:any=[]) => {
        if(res['status']=="true"){
        this.trainerImage=res['image'];
        this.toastSevice.presentToast("Profile update Successfully");
        }else{
          this.toastSevice.presentToast("Problem to upload profile");
        }
        this.loadingCtrl.dismiss();
      },
      err => {
        console.log(err);
      }
    );

  
   
 }
 ionViewDidEnter() {
  this.subscription = this.platform.backButton.subscribe(() => {
    // if (typeof navigator !== 'undefined' && navigator.app) {
    // //  navigator.app.exitApp();
    // }
  });
}

ionViewWillLeave() {
  this.subscription.unsubscribe();
}
  

cancel() {
  //this.modal.dismiss(null, 'cancel');
}

confirm() {
  this.addATT();
}

onWillDismiss(event: Event) {
  const ev = event as CustomEvent<OverlayEventDetail<string>>;
  if (ev.detail.role === 'confirm') {
  }
}
async addATT() {

  this.presentLoading();
  this.http.post('https://baobabsports.com/baosport/ios/add_attendance.php', {
    "sno":this.sno1,"type":this.atype,"reason":this.res
  }).subscribe((res1:any=[]) => {
      if(res1['status']=="true"){
      this.toastSevice.presentToast("Attendance added Successfully");
      }else{
        this.toastSevice.presentToast("Attendance allready added ");
      }
      this.loadingCtrl.dismiss();
     // this.modal.dismiss(this.atype, 'confirm');
    },
    err => {
      console.log(err);
    }
  );
 
}
}
