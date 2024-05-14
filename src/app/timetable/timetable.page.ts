import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-timetable',
  templateUrl: './timetable.page.html',
  styleUrls: ['./timetable.page.scss'],
})
export class TimetablePage implements OnInit {
  public view_time:any;
  public view_time_table:any;
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
            "type": 'parent'
          }).subscribe((res:any=[]) => {
              this.loadingCtrl.dismiss();
              this.view_time=res['view_time'];
              this.view_time_table=res['view_time_table'];
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
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    
  }
}
