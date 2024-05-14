import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-fitness-detail',
  templateUrl: './fitness-detail.page.html',
  styleUrls: ['./fitness-detail.page.scss'],
})
export class FitnessDetailPage implements OnInit {
  substring="youtube.com";
  s2="youtu.be";
  youtubeLink: any;
  youtubeId: any;
  res:any;
  isYouTube = false;
  isVideo=true;
  images:any;title:any;cdate:any;des:any;link:any;
  constructor(private actrouter: ActivatedRoute, private loadingCtrl:LoadingController,private router: Router) { }

  ngOnInit() {
    this.title=this.actrouter.snapshot.paramMap.get("title");
    this.images=this.actrouter.snapshot.paramMap.get("images");
    this.cdate=this.actrouter.snapshot.paramMap.get("cdate");
    this.des=this.actrouter.snapshot.paramMap.get("des");
    this.link=this.actrouter.snapshot.paramMap.get("link");
  
  if(this.link.indexOf(this.substring)!==-1 || this.link.indexOf(this.s2)!==-1){
    this.isYouTube=true;
    this.isVideo=false;
    this.link='https://www.youtube.com/embed/bsSFJUTcG18';
    console.log(this.link);
  }else{
    this.isYouTube=false;
    this.isVideo=true;
  }
  }
  playVideo(url:any){
    this.presentLoading();
    this.router.navigate(['/video-modal',{url:url}]);
    //const res:any  =  this._videoPlayer.initPlayer({mode:"fullscreen",url:this._url,playerId:"fullscreen",componentTag:"my-page"});
      
  }
 

  extractId(youtubeLink:any) {
    // Extract ID from yout.be link
    const youtuBeMatch = youtubeLink.match(/^(?:https?:\/\/)?(?:www\.)?youtu\.be\/(.+)$/);
    if (youtuBeMatch) {
      this.youtubeId = youtuBeMatch[1];
      return youtuBeMatch[1];
    }

    // Extract ID from youtube.com link
    const youtubeComMatch = youtubeLink.match(
      /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=(.+)$/
    );
    if (youtubeComMatch) {
      this.youtubeId = youtubeComMatch[1];
      return youtuBeMatch[1];
    }

    // If no match found, reset the youtubeId
    this.youtubeId = '';
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
