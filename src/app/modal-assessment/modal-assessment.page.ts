import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';  
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
@Component({
  selector: 'app-modal-assessment',
  templateUrl: './modal-assessment.page.html',
  styleUrls: ['./modal-assessment.page.scss'],
})
export class ModalAssessmentPage implements OnInit {
  className:any;
  sno1: any;
  class_id: any;
  gotype:any;
  url1:any;
  constructor(public modalCtrl: ModalController,private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private router: Router,
    private loadingCtrl:LoadingController,
    private iab: InAppBrowser
    ) {
//get stored sno no
this.storageService.get('sno').then((sno) => {
  if (sno !== false) {
    this.sno1=sno;
    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
        "sno": sno,
        "type2": type,
        "type":'className',
        "select":''
      }).subscribe((res:any=[]) => {
          this.className=res['className'];
        
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
  dismiss() {  
    this.modalCtrl.dismiss();  
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
  openurl() {
   
    if(this.class_id!==""){
      if(this.gotype=="fitness"){
        this.url1="https://baobabsports.com/baosport/view-assesment-ios.php?class_id="+this.class_id+"&sno="+this.sno1;
      }else{
        this.url1="https://baobabsports.com/baosport/add-skill.php?class_id="+this.class_id+"&sno="+this.sno1;
      }
      
    }
    const browser = this.iab.create(this.url1,"");

  }
}
