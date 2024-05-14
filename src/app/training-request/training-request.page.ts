import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-training-request',
  templateUrl: './training-request.page.html',
  styleUrls: ['./training-request.page.scss'],
})
export class TrainingRequestPage implements OnInit {
  sno1: any; 
  postData={
    "title":'',
    "des":'',
    "date":'',
    "sno":'',
    "type":''
  };
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private authService: AuthService,private loadingCtrl: LoadingController,
      private toastSevice:ToastService,) {

    //get stored sno no
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.storageService.get('type').then((type) => {
        this.postData.sno=sno;
        this.postData.type=type;
      });
      }
    });
  }




  ngOnInit() {
  }

  apiUrl: string = 'https://baobabsports.com/baosport/ios/add_training_request.php';
  validateInputs() {
    let title = this.postData.title.trim();
    let des = this.postData.des.trim();
    return (
    this.postData.title &&
    this.postData.des &&
    title.length > 0 &&
    des.length > 0 
    );
    }
  saveData() {
    if (this.validateInputs()) {
      this.presentLoading();
    this.http.post(this.apiUrl,this.postData).subscribe((res:any=[]) => {
  
        if(res['status']=='true'){
          this.toastSevice.presentToast("Request submit Successfully");
        
    
        }else{
          this.toastSevice.presentToast("Something went wrong");
        }
      
      },
      err => {
        console.log(err);
        this.toastSevice.presentToast('Network Issue.');
      }
    );
    } else {
    this.toastSevice.presentToast('Please enter data.');
    }
    }
    async presentLoading() {
      const loading = await this.loadingCtrl.create({
        cssClass: 'my-custom-class',
        message: 'Please wait...',
        duration:2500
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      
    }
}
