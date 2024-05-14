import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fitnessfun',
  templateUrl: './fitnessfun.page.html',
  styleUrls: ['./fitnessfun.page.scss'],
})
export class FitnessfunPage implements OnInit {
  fitness_fun:any;
  res:any;
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController,
    private router: Router) { 

         //get stored sno no
         this.storageService.get('sno').then((sno) => {
          if (sno !== false) {
            this.storageService.get('type').then((type) => {
              this.http.post('https://baobabsports.com/baosport/ios/get_fitness_fun.php', {
                "sno": sno,
                "type": type
              }).subscribe(
                res => {
                  this.res=res;
                  this.fitness_fun=this.res['fitness_fun'];
                  console.log(this.fitness_fun);
                  if(this.fitness_fun.length==0){
                    this.toastSevice.presentToast("No Data Found");
                  }
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
      duration: 100
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  public funDetail(id:any,images:any,title:any,cdate:any,des:any,link:any) {
    this.presentLoading();
    this.router.navigate(['/fitness-detail',{id:id,images:images,title:title,cdate:cdate,des:des,link:link}]);
  }

}
