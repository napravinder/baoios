import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-activity',
  templateUrl: './activity.page.html',
  styleUrls: ['./activity.page.scss'],
})
export class ActivityPage implements OnInit {
  res: any;

  view_user_activity:any;status:any;color:any;
  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService,
    private storageService: StorageService, private toastSevice:ToastService, private loadingCtrl: LoadingController) {
     }

  ngOnInit() {
       //get stored sno no
       this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.storageService.get('type').then((type) => {
          this.http.post('https://baobabsports.com/baosport/ios/view_user_activity.php', {
            "sno": sno,
            "type": type
          }).subscribe(
            response => {
                this.res=response;
              this.view_user_activity=this.res['view_user_activity'];
              
              if(this.res['view_user_activity'][0].status=="P"){
                  this.status="Pending";
                  this.color="warning";
              }else if(this.res['view_user_activity'][0].status=="D"){
                  this.status="Disapproved";
                  this.color="danger";
              }else{
                this.status="Approved";
                this.color="success";
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
  addActivity(){
    this.router.navigate(['/add-activity']);
  }
  activityDetail(id:any){ 

    if(this.status=="Approved"){
    this.presentLoading();
    this.router.navigate(['/lesson-plan',{id:id}]);
    }
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
