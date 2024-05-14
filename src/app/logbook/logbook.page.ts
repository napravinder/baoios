import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-logbook',
  templateUrl: './logbook.page.html',
  styleUrls: ['./logbook.page.scss'],
})
export class LogbookPage implements OnInit {
  student_id:any;
  logbook_date:any
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private http: HttpClient,private router: Router, 
     private loadingCtrl:LoadingController) { 

       //get stored sno no
       this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.presentLoading();
            this.student_id=sno;
          this.http.post('https://baobabsports.com/baosport/ios/get_date_logbook.php', {
            "student_id": sno,
            "type": 'parent'
          }).subscribe((res:any=[]) => {
              this.loadingCtrl.dismiss();
              this.logbook_date=res['view_log_date'];
                console.log(this.logbook_date);
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
      duration:4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  public logDetail(id:any) {
    this.presentLoading();
   
    this.router.navigate(['/logbook-detail',{id:id}]);
  }
}
