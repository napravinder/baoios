import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import Swiper from 'swiper';
@Component({
  selector: 'app-logactivity',
  templateUrl: './logactivity.page.html',
  styleUrls: ['./logactivity.page.scss'],
})
export class LogactivityPage implements OnInit {
  id: any;result:any;
  //@ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
  sliderOne: any; sno: any;
  activityName: any; className: any; lessonName: any; activityTime: any; activityDetail: any
  lessonIntro: any; video: any; activityBenefits: any; safety: any
  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };
  constructor(private http: HttpClient, private actrouter: ActivatedRoute,private loadingCtrl: LoadingController, 
    private router: Router ) {
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{ "photo": "assets/thumbnail.svg" }]
    };
  }

  ngOnInit() {
    this.sno = this.actrouter.snapshot.paramMap.get("id");
    this.getSkill();
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
  getSkill() {
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/log_activity.php', {
      "sno": this.sno,
      "type": 'parent'
    }).subscribe((res:any=[]) => {
        this.loadingCtrl.dismiss();
        // Item object for Nature

        this.sliderOne =
        {
          isBeginningSlide: true,
          isEndSlide: false,
          slidesItems: res['image']
        };     
       
        
        this.activityName = res['skill'][0].activityName;
        this.className = res['skill'][0].className;
        this.lessonName = res['skill'][0].lessonName;
        this.activityTime = res['skill'][0].activityTime;
        this.lessonIntro = res['skill'][0].lessonIntro;
        this.activityDetail = res['skill'][0].activityDetail;
        this.safety = res['skill'][0].safety;
        this.activityBenefits = res['skill'][0].activityBenefits;
        this.video = res['video'];

//console.log(res['skill'].activityBenefits)
      },
      err => {
        console.log(err);
      }
    );

  }
  isShown: boolean = true; // hidden by default
  lessonIntroShown: boolean = false;
  videoShown: boolean = false;
  safetyShown: boolean = false;
  activityBenefitsShown: boolean = false;
  toggleShow() {
    this.isShown = !this.isShown;
  }
  lessonIntroshow() {
    this.lessonIntroShown = !this.lessonIntroShown;
  }
  videoshow() {
    this.videoShown = !this.videoShown;
  }
  safetyshow() {
    this.safetyShown = !this.safetyShown;
  }
  activityBenefitsshow() {
    this.activityBenefitsShown = !this.activityBenefitsShown;
  }


  playVideo(url: any) {
    this.presentLoading();
    this.router.navigate(['/video-modal', { url: url }]);

  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }

}
