import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-lesson-plan',
  templateUrl: './lesson-plan.page.html',
  styleUrls: ['./lesson-plan.page.scss'],
})



export class LessonPlanPage implements OnInit {
 
  sliderOne: any;


  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  swiperRef: ElementRef | undefined;

  id:any;
  levelName:any;
  groupName:any;
  lessonCode:any;
  activityName:any;
  lessonIntro:any;
  unitUsed:any;
  warmup:any;
  activityDetail:any;
  activityTime:any;
  activityBenefits:any;
  coolDown:any;
  homeWork:any;
  safety:any;
  videos:any;
  fontSize=12;
  

  constructor(private http: HttpClient, private router: Router,private router1:ActivatedRoute,private loadingCtrl:LoadingController) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{ "photo": "assets/thumbnail.svg" }]
    };
   }

  ngOnInit() {
    this.id= this.router1.snapshot.paramMap.get("id")
    this.getActivity();
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 500, // set the delay time in milliseconds
        disableOnInteraction: false // allow autoplay to continue after user interaction
      }
    });
  
  }
  getActivity(){
    this.presentLoading();
    return new Promise(resolve => {
    this.http.post('https://baobabsports.com/baosport/ios/get_activity_by_id.php', {
      "id": this.id
    }).subscribe((res:any=[]) => {
          this.loadingCtrl.dismiss();
        console.log(res['data'][0].id);
        this.levelName=res['levelName'];
        this.groupName=res['groupName'];
        this.lessonCode=res['data'][0].lessonCode;
        this.activityName=res['data'][0].activityName;
        this.lessonIntro=res['data'][0].lessonIntro;
        this.unitUsed=res['data'][0].unitUsed;
        this.warmup=res['data'][0].warmup;
        this.activityDetail=res['data'][0].activityDetail;
        this.activityTime=res['data'][0].activityTime;
        this.activityBenefits=res['data'][0].activityBenefits;
        this.coolDown=res['data'][0].coolDown;
        this.homeWork=res['data'][0].homeWork;
        this.safety=res['data'][0].safety;
        this.videos=res['videos'];
        console.log(res['data'][0].image.split(',',1));
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
  });

  }
  playVideo(url:any){
    this.presentLoading();
    this.router.navigate(['/video-modal',{url:url}]);
        
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
  zoomIn(){
    if(this.fontSize<30){
    this.fontSize++;
    }
  }
  zoomOut(){
    if(this.fontSize>8){
    this.fontSize--;
  }
  }
}
