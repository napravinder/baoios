import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-skill',
  templateUrl: './skill.page.html',
  styleUrls: ['./skill.page.scss'],
})
export class SkillPage implements OnInit {
public skill:any
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
          this.storageService.get('type').then((type) => {
          this.http.post('https://baobabsports.com/baosport/ios/improve_skill.php', {
            "sno": sno,
            "type": type
          }).subscribe((res:any=[]) => {
        
              this.skill=res['skill']; 
              if(this.skill.length==0){
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
      duration: 1000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
  public lessonDetail(id:any,classID:any,tid:any) {
    this.presentLoading();
    this.router.navigate(['/skill-detail',{id:id,classID:classID,tid:tid}]);
  }

}
