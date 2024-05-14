import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-playathome',
  templateUrl: './playathome.page.html',
  styleUrls: ['./playathome.page.scss'],
})
export class PlayathomePage implements OnInit {
listItems:any;

  constructor(private http: HttpClient, private router: Router,private loadingCtrl: LoadingController) {
   
   }

  ngOnInit() {
    this.getActivity();
  }
  getActivity(){
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/play_at_home.php', "").subscribe((res:any=[]) => {
        this.loadingCtrl.dismiss();
        this.listItems=res['weekly_activity'];
      
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

  public lessonDetail(id:any) {
    this.presentLoading();
    this.router.navigate(['/lesson-plan',{id:id}]);
  }
}
