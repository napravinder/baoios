import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-admission',
  templateUrl: './admission.page.html',
  styleUrls: ['./admission.page.scss'],
})
export class AdmissionPage implements OnInit {
  
  postData={
    "studentName":'',
    "fatherName":'',
    "motherName":'',
    "dob":'',
    "phone":'',
    "address":'',
    "sno":''
  }
  res:any;
  constructor(
    private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController) {

      this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.postData.sno=sno;
        }
      });
     }

  ngOnInit() {
  }
  
  apiUrl: string = 'https://baobabsports.com/baosport/ios/admission_form.php';
  validateInputs() {
    let studentName = this.postData.studentName.trim();
    let fatherName = this.postData.fatherName.trim();
    let motherName = this.postData.motherName.trim();
    let dob = this.postData.dob.trim();
    let phone = this.postData.phone.trim();
    let address = this.postData.address.trim();
    return (
    this.postData.studentName &&
    this.postData.fatherName &&
    studentName.length > 0 &&
    fatherName.length > 0
    );
    }
    saveData() {
    if (this.validateInputs()) {
      this.presentLoading();
    this.http.post(this.apiUrl,this.postData).subscribe(
      res => {
        this.res=res;
        if(this.res['status']=='true'){
          console.log(res);
          this.toastSevice.presentToast("Data Added Successfully");
    
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
        duration: 2000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      
    }
}
