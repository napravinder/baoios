import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-training-detail',
  templateUrl: './training-detail.page.html',
  styleUrls: ['./training-detail.page.scss'],
})
export class TrainingDetailPage implements OnInit {
  images: any; title: any; cdate: any; des: any; link: any;
  constructor(private actrouter: ActivatedRoute, private loadingCtrl: LoadingController, private router: Router) { }

  ngOnInit() {
    this.title=this.actrouter.snapshot.paramMap.get("title");
    this.images=this.actrouter.snapshot.paramMap.get("images");
    this.cdate=this.actrouter.snapshot.paramMap.get("cdate");
    this.des=this.actrouter.snapshot.paramMap.get("des");
    this.link=this.actrouter.snapshot.paramMap.get("link");
  }
  playVideo(url:any){
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
}
