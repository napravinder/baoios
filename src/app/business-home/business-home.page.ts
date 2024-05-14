import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { LoadingController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { ModalPage } from '../modal/modal.page';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Platform, ActionSheetController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-business-home',
  templateUrl: './business-home.page.html',
  styleUrls: ['./business-home.page.scss'],
})
export class BusinessHomePage implements OnInit {
  subscription:any;
  my: boolean = false;imageData:any;
  event: boolean = true; ticker: any;
  topColor="#EE9555";eventColor:any;activityColor:any;workColor:any;
  trainerName = ""; schoolName:any; trainerImage = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
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
  res:any;

  constructor(private http: HttpClient,private appCom:AppComponent, private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
     private loadingCtrl: LoadingController, public modalCtrl: ModalController,
     private toastSevice: ToastService,
     private platform: Platform,
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
          "type": 'business'
        }).subscribe(
          res => {
            this.res=res;
            // Item object for Nature
            this.sliderOne =
            {
              isBeginningSlide: true,
              isEndSlide: false,
              slidesItems: this.res['images']
            };


          },
          err => {
            console.log(err);
          }
        );
        this.http.post('https://baobabsports.com/baosport/ios/news.php', {
          "sno": sno,
          "type": 'business'
        }).subscribe(
          res11 => {
            this.res=res11;
                this.ticker=this.res['ticker'][0].news;
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
        "type": 'business'
      }).subscribe(
        res1 => {
          this.res=res1;
          if (this.res['status'] == "notfound") {
            authService.logout();
          } else {
            this.trainerName = this.res['name'];
            this.schoolName = this.res['name'];
            
            this.appCom.username=this.res['name'];
            this.appCom.fname ="";
            if (this.res['profile_pic']) {
              this.trainerImage = this.res['profile_pic'];
            }

            if (this.res['rate'] > 4) {
              this.bad = "bad";
              this.ok = "ok";
              this.verygood = "verygood";
              this.good = "good";
              this.excellent = "excellent";
            } else if (this.res['rate'] > 3) {
              this.bad = "bad";
              this.ok = "ok";
              this.good = "good";
              this.verygood = "verygood";
              this.excellent = "notactive";
            } else if (this.res['rate'] > 2) {
              this.bad = "bad";
              this.ok = "ok";
              this.good = "good";
              this.verygood = "notactive";
              this.excellent = "notactive";
            }
            else if (this.res['rate'] > 1) {
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
          this.topColor=this.res['colors'][0].top;
          this.eventColor=this.res['colors'][0].event;
          this.activityColor=this.res['colors'][0].activity;
          this.workColor=this.res['colors'][0].work;
          //set color
          this.loadingCtrl.dismiss();
        },
        err => {
          console.log(err);
        }
      );
    });

  }
  async showModal() {  
    const modal = await this.modalCtrl.create({  
      component: ModalPage  
    });  
    return await modal.present();  
  }  

  ngOnInit() {
  }

  upcoming(sno: any) {
    this.http.post('https://baobabsports.com/baosport/ios/get_upcoming_events.php', {
      "sno": sno,
      "type": 'business'
    }).subscribe(
      res2 => {
        this.res=res2;
        console.log(res2)
        this.upcomingcard = this.res['upcoming_events'];
        if (this.res['upcoming_events'][0].type == "my") {
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
      duration: 6000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  prayer() {
    this.presentLoading();
    this.router.navigate(['/prayer-activity']);
  }
  playAtHome() {
    this.presentLoading();
    this.router.navigate(['/playathome']);
  }
  gallery() {
    this.presentLoading();
    this.router.navigate(['/gallery']);
  }
  admission() {
    this.presentLoading();
    this.router.navigate(['/admission']);
  }
  timetable() {
    this.presentLoading();
    this.router.navigate(['/business-time-table']);
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
    this.router.navigate(['/business-feedback']);
  }
  eventDetail(id: any, type: any) {
    this.presentLoading();
    this.router.navigate(['/event-detail', { id: id, type: type }]);
  }
  logBook() {
    this.presentLoading();
    this.router.navigate(['/logbook']);
  }
  training(){
    this.presentLoading();
    this.router.navigate(['/training']);
  }
  upcomingEvent(){
    this.presentLoading();
    this.router.navigate(['/upcomingevent']);
  }
  trainingRequest(){
    this.presentLoading();
    this.router.navigate(['/training-request']);
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
      "sno":this.sno1,"type":'business',"image":this.imageData.base64String
    }).subscribe(
      res => {
        this.res=res;
        if(this.res['status']=="true"){
        this.trainerImage=this.res['image'];
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
  // this.subscription = this.platform.backButton.subscribe(() => {
  //      navigator['app'].exitApp();
  // });
}
ionViewWillLeave() {
  this.subscription.unsubscribe();
}
}
