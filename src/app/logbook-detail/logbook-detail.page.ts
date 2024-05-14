import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-logbook-detail',
  templateUrl: './logbook-detail.page.html',
  styleUrls: ['./logbook-detail.page.scss'],
})
export class LogbookDetailPage implements OnInit {
id:any;name:any;gender:any; classname:any;address:any;stu_id:any;
  constructor(
    private actrouter: ActivatedRoute, 
      private authService:AuthService,
    private storageService:StorageService,
    private http: HttpClient,
     private loadingCtrl: LoadingController, 
     private router: Router) { }

  ngOnInit() {
    this.id=this.actrouter.snapshot.paramMap.get("id");
    if(this.actrouter.snapshot.paramMap.get("student_id")){
      this.stu_id=this.actrouter.snapshot.paramMap.get("student_id");
      this.getLogDetailsB();
    }else{
    this.getLogDetails();
    }
  }
  getLogDetails(){
    //get stored sno no
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {

        this.http.post('https://baobabsports.com/baosport/ios/single_user_data.php', {
          "sno": sno,
          "type": 'parent'
        }).subscribe((res:any=[]) => {
            this.loadingCtrl.dismiss();
            this.name=res['name'];
            this.gender=res['gender'];
            this.classname=res['class'];
            this.address=res['address'];
          },
          err => {
            console.log(err);
          }
        );

      }
    });
  }
  getLogDetailsB(){
    //get stored sno no
  
      if (this.stu_id) {

        this.http.post('https://baobabsports.com/baosport/ios/single_user_data.php', {
          "sno": this.stu_id,
          "type": 'parent'
        }).subscribe((res:any=[]) =>{
            this.name=res['name'];
            this.gender=res['gender'];
            this.classname=res['class'];
            this.address=res['address'];
          },
          err => {
            console.log(err);
          }
        );

      }
 
  }
  viewAcivity(){
    this.presentLoading();
    this.router.navigate(['/logactivity',{id:this.id}]);
  }
  
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 3000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  
}
