import { Component, OnInit } from '@angular/core';
import { ModalController} from '@ionic/angular';  
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  className:any;
  student:any;
  class_id:any;
  dates:any;
  sno1:any;
  student_id:any;
  log_id:any;
  constructor(public modalCtrl: ModalController,private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private router: Router,
    private loadingCtrl:LoadingController) { 
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
            }).subscribe(
              res => {
                //this.className=res['className'];
              
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
  getStu(){
    this.presentLoading();
    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_students_school.php', {
        "sno": this.sno1,
        "class_id": this.class_id
      }).subscribe(
        res => {
         // this.student=res['view_students'];
        
        },
        err => {
          console.log(err);
        }
      );
    });
  
  }
  getDate(){
    this.presentLoading();
    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_date_school.php', {
        "sno": this.sno1,
        "class_id": this.class_id,
        "student_id":this.student_id
      }).subscribe(
        res => {
         // this.dates=res['view_log_date'];
        
        },
        err => {
          console.log(err);
        }
      );
    });
  
  }
  getData(){
   this.dismiss();
    this.presentLoading();
   
    this.router.navigate(['/logbook-detail',{id:this.log_id,student_id:this.student_id}]);
  }
}
