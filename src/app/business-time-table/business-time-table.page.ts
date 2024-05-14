import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-business-time-table',
  templateUrl: './business-time-table.page.html',
  styleUrls: ['./business-time-table.page.scss'],
})
export class BusinessTimeTablePage implements OnInit {
  public view_time:any;
  public view_time_table:any;
  res:any;
  constructor(
    private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController
    ) { 
    
   this.presentLoading();
      //get stored sno no
      this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
  
          this.http.post('https://baobabsports.com/baosport/ios/view_time_table.php', {
            "sno": sno,
            "type": 'business'
          }).subscribe(
            res => {
              this.res=res;
              this.view_time=this.res['view_time'];
              this.view_time_table=this.res['view_time_table'];
                console.log(this.view_time[0].period);
            },
            err => {
              console.log(err);
            }
          );
  
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

}
