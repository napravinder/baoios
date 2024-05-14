import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-foodandnutrition',
  templateUrl: './foodandnutrition.page.html',
  styleUrls: ['./foodandnutrition.page.scss'],
})
export class FoodandnutritionPage implements OnInit {
public food:any; res:any;
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController,
    private router: Router) {
        this.presentLoading();
       //get stored sno no
       this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.loadingCtrl.dismiss();
          this.storageService.get('type').then((type) => {
          this.http.post('https://baobabsports.com/baosport/ios/get_food.php', {
            "sno": sno,
            "type": type
          }).subscribe(
            res => {
              this.res=res;
              this.food=this.res['food'];
              console.log(this.food);
            },
            err => {
              console.log(err);
            }
          );
        });
        }
      });
     }

  ngOnInit() {
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
  public lessonDetail(id:any,images:any,title:any,cdate:any,des:any,link:any) {
    this.presentLoading();
    this.router.navigate(['/fooddetail',{id:id,images:images,title:title,cdate:cdate,des:des,link:link}]);
  }
}
