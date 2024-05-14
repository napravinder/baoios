import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';

import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
id:any;type:any;
my:boolean=false;
extn: any;
res:any;
event:boolean=true;
images:any;title:any;cdate:any;des:any;link:any;
  constructor(private iab: InAppBrowser,private router: Router,private toastSevice: ToastService,private actrouter: ActivatedRoute,private http: HttpClient,private loadingCtrl: LoadingController) { 
    
  }

  ngOnInit() {
    this.id=this.actrouter.snapshot.paramMap.get("id");

    this.type=this.actrouter.snapshot.paramMap.get("type");
   this.getEvent();
  }
getEvent(){
  this.presentLoading();
  this.http.post('https://baobabsports.com/baosport/ios/get_single_event.php', {
      "id": this.id,
      "type": this.type
    }).subscribe(
      res1 => {
        this.res=res1;
        console.log(res1);
      if(this.type=="my"){
        this.images=this.res['data'][0].images;
        this.title=this.res['data'][0].title;
        this.cdate=this.res['data'][0].date;
        this.link=this.res['data'][0].link;
        this.extn = this.link.split('.')[2];
        this.des=this.res['data'][0].des;
      }else{
        this.images=this.res['data'][0].eventImages;
        this.title=this.res['data'][0].eventName;
        this.cdate=this.res['data'][0].eventDate;
        this.des=this.res['data'][0].eventDetail;

      }
        if(this.type=='my'){
          this.my=true;
          this.event=false;
        }else{
          this.my=false;
          this.event=true;
        }
      },
      err => {
        console.log(err);
      }
    );

}
playVideo(url:any){
  const browser = this.iab.create(url,"_blank");
  // if(url==0){
  //   this.toastSevice.presentToast('No video found');
  // }else{
  // this.presentLoading();
  // this.router.navigate(['/video-modal',{url:url}]);
  //  } //const res:any  =  this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url,playerId:"fullscreen",componentTag:"my-page"});
    
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
}
