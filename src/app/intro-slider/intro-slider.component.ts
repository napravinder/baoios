import { Component, OnInit,ViewChild,ElementRef  } from '@angular/core';
import Swiper from 'swiper';
import { LoadingController } from '@ionic/angular';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-intro-slider',
  templateUrl: './intro-slider.component.html',
  styleUrls: ['./intro-slider.component.scss'],
})
export class IntroSliderComponent implements OnInit {
  swiperRef: ElementRef | undefined;
  response: any;
  images:any
  type: any;
  sno1: any;
  constructor(    private http: HttpClient,private loadingCtrl: LoadingController,  private router: Router,  private storageService: StorageService, ) {
    this.presentLoading();
    this.getImages();
    this.storageService.get('sno').then((sno) => {
      this.sno1=sno;
      if (sno !== null) {
      
        this.storageService.get('type').then((type) => {
          this.type=type;
          if(this.type == 'parent'){
            this.router.navigate(['/home']);
          }else if(this.type=='business'){
            this.router.navigate(['/business-home']);
          }else if(this.type=='trainer'){
            this.router.navigate(['/trainer-home']);
          }
        });
       
      }
    });
  }
  ionViewWillEnter() {
    this.storageService.get('introskip').then((introskip) => {
      if(introskip==1){
        this.login();
      }
    });
  
  }

  ngOnInit() {
   
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
  login() {
    this.storageService.set('introskip',1);

    this.presentLoading();
    this.router.navigate(['/login']);
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration:200
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  getImages(){
    this.http.post('https://baobabsports.com/baosport/ios/bg/image.php',{}).subscribe((res:any=[]) => {
      
    this.images=res['images'];
     },
      err => {
        console.log(err);
      }
    );
  
  }

}
