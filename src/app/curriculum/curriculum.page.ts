import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.page.html',
  styleUrls: ['./curriculum.page.scss'],
})

export class CurriculumPage implements OnInit {
  curriculum_classes:any;levelIDs:any;
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
                this.http.post('https://baobabsports.com/baosport/ios/get_curriculum_classes.php', {
                  "sno": sno,
                  "type": type
                }).subscribe(
                  res => {
                    this.res=res;
                    this.curriculum_classes=this.res['curriculum_classes'];
                    this.levelIDs=this.res['levelIDs'];
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
  public curDetail(id:any,name:any) {
    this.presentLoading();
    this.router.navigate(['/curriculum-detail',{id:id,name:name,levelIDs:this.levelIDs}]);
  }
}
