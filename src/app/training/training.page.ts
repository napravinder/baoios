import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-training',
  templateUrl: './training.page.html',
  styleUrls: ['./training.page.scss'],
})
export class TrainingPage implements OnInit {
  training:any;sno:any; type: any;
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
            this.sno=sno;
            this.type = type;
           this.getActivity();
          });
         
  
        }
      });
     }

  ngOnInit() {
    
         
  }
  getActivity(){
    this.http.post('https://baobabsports.com/baosport/ios/get_training_session.php', {
      "sno": this.sno,
      "type": this.type
    }).subscribe((res:any=[]) => {

        this.training=res['food'];
        console.log(this.training);
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
      duration: 100
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  public trainingDetail(id:any,images:any,title:any,cdate:any,des:any,link:any) {
    this.presentLoading();
    this.router.navigate(['/training-detail',{id:id,images:images,title:title,cdate:cdate,des:des,link:link}]);
  }
  public lessonStatus(event:any, id: any , status: any) {
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/training_status.php', {
      "id": id,
      "sno": this.sno,
      "type": this.type,
      "status": status
    }).subscribe(
      res => {
        this.getActivity();
      },
      err => {
        console.log(err);
      }
    );

  }

}
