import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-curriculum-detail',
  templateUrl: './curriculum-detail.page.html',
  styleUrls: ['./curriculum-detail.page.scss'],
})
export class CurriculumDetailPage implements OnInit {
className:any;id:any;levelIDs:any;activity:any; type: any; sno: any; res:any;
  constructor(private actrouter: ActivatedRoute,private http: HttpClient, private loadingCtrl:LoadingController,private router: Router,
    private storageService: StorageService,) {

    this.storageService.get('sno').then((sno) => {
      console.log(sno);
      if (sno !== false) {
      this.sno=sno;
        this.storageService.get('type').then((type) => {
          this.type=type;
           this.className=this.actrouter.snapshot.paramMap.get("name");
           this.id=this.actrouter.snapshot.paramMap.get("id");
        this.getActivity();
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
      duration: 1000
    });
    await loading.present();
  
    const { role, data } = await loading.onDidDismiss();
  
  }
  public lessonDetail(id:any) {
    this.presentLoading();
    this.router.navigate(['/lesson-plan',{id:id}]);
  }
  getActivity() {
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/get_class_activities.php', {
                  "classid": this.id,
                  "trainerID": this.sno,
                  "type": this.type,
                  "levelIDs": this.actrouter.snapshot.paramMap.get("levelIDs"),
                  
                }).subscribe(
                  res => {
                    this.res=res;
                    console.log(res);
                    this.activity=this.res['activity'];
                  },
                  err => {
                    console.log(err);
                  }
                );
  }
  public lessonStatus(event:any, id: any , status: any) {
    this.presentLoading();
    this.http.post('https://baobabsports.com/baosport/ios/trainer_activity_status.php', {
      "activityId": id,
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
