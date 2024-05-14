import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,ActivatedRoute } from '@angular/router';
import { Plugins } from '@capacitor/core';
import Swiper from 'swiper';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-skill-detail',
  templateUrl: './skill-detail.page.html',
  styleUrls: ['./skill-detail.page.scss'],
})
export class SkillDetailPage implements OnInit {
  //data varible 
  // private _videoPlayer: any;
  //   private _url: string;
  //   private _handlerPlay: any;
  //   private _handlerPause: any;
  //   private _handlerEnded: any;
  //   private _handlerReady: any;
  //   private _handlerExit: any;
  //   private _first: boolean = false;
  //   private _apiTimer1: any;
  //   private _apiTimer2: any;
  //   private _apiTimer3: any;
  //   private _testApi: boolean = true;
 //@ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;
 sliderOne: any;sno:any;
 activityName:any;className:any;lessonName:any;activityTime:any;activityDetail:any
 lessonIntro:any;video:any;activityBenefits:any;safety:any
 //Configuration for each Slider
 slideOptsOne = {
   initialSlide: 0,
   slidesPerView: 1,
   autoplay: true
 };

  constructor(private http: HttpClient,private actrouter: ActivatedRoute, private router: Router, private loadingCtrl:LoadingController) { 
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [{ "photo": "assets/thumbnail.svg" }]
    };
  }

  async  ngOnInit() {
    this.sno=this.actrouter.snapshot.paramMap.get("id");
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

    // // define the plugin to use
    // const info = await Device.getInfo();
    // if (info.platform === "ios" || info.platform === "android") {
    //   this._videoPlayer = CapacitorVideoPlayer;
    // } else {
    //   this._videoPlayer = WebVPPlugin.CapacitorVideoPlayer
    // }
    // // define the video url
    // this._url = "https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4"
    // // add listeners to the plugin
    // this._addListenersToPlayerPlugin();
  
  }


 
getSkill(){
  this.http.post('https://baobabsports.com/baosport/ios/skill-details.php', {
    "sno": this.sno,
    "type": 'parent'
  }).subscribe((res:any=[]) => {
    
     // Item object for Nature
      this.sliderOne =
      {
        isBeginningSlide: true,
        isEndSlide: false,
        slidesItems: res['image']
      };
      this.activityName=res['skill'][0].activityName;
      this.className=res['skill'][0].className;
      this.lessonName=res['skill'][0].lessonName;
      this.activityTime=res['skill'][0].activityTime;
      this.lessonIntro=res['skill'][0].lessonIntro;
      this.activityDetail=res['skill'][0].activityDetail;
      this.safety=res['skill'][0].safety;
      this.activityBenefits=res['skill'][0].activityBenefits;
      this.video=res['video'];
    

    },
    err => {
      console.log(err);
    }
  );

}
isShown: boolean = true ; // hidden by default
lessonIntroShown: boolean=false;
videoShown:boolean=false;
safetyShown:boolean=false;
activityBenefitsShown:boolean=false;
toggleShow() {
this.isShown = ! this.isShown;
}
lessonIntroshow(){
  this.lessonIntroShown =!this.lessonIntroShown;
}
videoshow(){
  this.videoShown=!this.videoShown;
}
safetyshow(){
  this.safetyShown=!this.safetyShown;
}
activityBenefitsshow(){
  this.activityBenefitsShown=!this.activityBenefitsShown;
}

playVideo(url:any){
  console.log(url);
  this.presentLoading();
  this.router.navigate(['/video-modal',{url:url}]);
  //const res:any  =  this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url,playerId:"fullscreen",componentTag:"my-page"});
    
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
// private _addListenersToPlayerPlugin() {
//   this._handlerPlay = this._videoPlayer.addListener('jeepCapVideoPlayerPlay', (data:any) => {
//     console.log('Event jeepCapVideoPlayerPlay ', data);

//   }, false);
//   this._handlerPause = this._videoPlayer.addListener('jeepCapVideoPlayerPause', (data:any) => {
//     console.log('Event jeepCapVideoPlayerPause ', data);

//   }, false);
//   this._handlerEnded = this._videoPlayer.addListener('jeepCapVideoPlayerEnded', async (data:any) => {
//     console.log('Event jeepCapVideoPlayerEnded ', data);
 
//   }, false);
//   this._handlerExit = this._videoPlayer.addListener('jeepCapVideoPlayerExit', async (data:any) => {
//     console.log('Event jeepCapVideoPlayerExit ', data)
  
//     }, false);
//   this._handlerReady = this._videoPlayer.addListener('jeepCapVideoPlayerReady', async (data:any) => {
//     console.log('Event jeepCapVideoPlayerReady ', data)
//     console.log("testVideoPlayerPlugin testAPI ",this._testApi);
//     console.log("testVideoPlayerPlugin first ",this._first);
//     if(this._testApi && this._first) {
//       // test the API
//       this._first = false;
//       console.log("testVideoPlayerPlugin calling isPlaying ");
//       const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
//       console.log('const isPlaying ', isPlaying)
//       this._apiTimer1 = setTimeout(async () => {
//         const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
//         console.log('const pause ', pause)
//         const isPlaying = await this._videoPlayer.isPlaying({playerId:"fullscreen"});
//         console.log('const isPlaying after pause ', isPlaying)
//         let currentTime = await this._videoPlayer.getCurrentTime({playerId:"fullscreen"});
//         console.log('const currentTime ', currentTime);
//         let muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
//         console.log('initial muted ', muted);
//         const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:!muted.value});
//         console.log('setMuted ', setMuted);
//         muted = await this._videoPlayer.getMuted({playerId:"fullscreen"});
//         console.log('const muted ', muted);
//         const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
//         console.log("duration ",duration);
//         // valid for movies havin a duration > 25
//         const seektime = currentTime.value + 0.5 * duration.value < duration.value -25 ? currentTime.value + 0.5 * duration.value
//                         : duration.value -25;
//         const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(seektime)});
//         console.log('const setCurrentTime ', setCurrentTime);
//         const play = await this._videoPlayer.play({playerId:"fullscreen"});
//         console.log("play ",play);
//         this._apiTimer2 = setTimeout(async () => {
//           const setMuted = await this._videoPlayer.setMuted({playerId:"fullscreen",muted:false});
//           console.log('setMuted ', setMuted);
//           const setVolume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:0.5});
//           console.log("setVolume ",setVolume);
//           const volume = await this._videoPlayer.getVolume({playerId:"fullscreen"});
//           console.log("Volume ",volume);
//           this._apiTimer3 = setTimeout(async () => {
//             const pause = await this._videoPlayer.pause({playerId:"fullscreen"});
//             console.log('const pause ', pause);
//             const duration = await this._videoPlayer.getDuration({playerId:"fullscreen"});
//             console.log("duration ",duration);
//             const volume = await this._videoPlayer.setVolume({playerId:"fullscreen",volume:1.0});
//             console.log("Volume ",volume);
//             const setCurrentTime = await this._videoPlayer.setCurrentTime({playerId:"fullscreen",seektime:(duration.value - 3)});
//             console.log('const setCurrentTime ', setCurrentTime);
//             const play = await this._videoPlayer.play({playerId:"fullscreen"});
//             console.log('const play ', play);
//           }, 10000);
//         }, 10000);

//       }, 5000);
//     }
//   }, false);

// }
}
