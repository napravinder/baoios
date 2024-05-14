import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PrayerModelPage } from '../prayer-model/prayer-model.page';
import { ToastService } from '../services/toast.service';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-add-prayer-activity',
  templateUrl: './add-prayer-activity.page.html',
  styleUrls: ['./add-prayer-activity.page.scss'],
})
export class AddPrayerActivityPage implements OnInit {

  sch = new Array<any>(); remtime: any; i: any
  postData = {
    "cdate": '',
    "name": '',
    "totalTime": 0,
    "untilUsed": '',
    "schedule": '',
    "sno": ''
  }
  res:any;
  remetime: any;
  constructor(   private storageService: StorageService, private http: HttpClient,private modalCtrl: ModalController, private toastSevice: ToastService, private loadingCtrl: LoadingController) {

    this.i = 0;
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.postData.sno=sno;
      }
    });
  }

  ngOnInit() {
  }

  async addSchdule() {


    //checking values
    if (this.postData.cdate && this.postData.name && this.postData.totalTime) {
      if (this.i == 0) {
        this.remetime = this.postData.totalTime;

      }

      const modal = await this.modalCtrl.create({
        component: PrayerModelPage,
        componentProps: { reme: this.remetime }
      });
      modal.onDidDismiss().then((data) => {
        if (data !== null) {
          this.sch[this.i] = data.data;
          this.remetime = this.remetime - data.data.tasktime;
          this.i++;
        }
      });
      return await modal.present();

    } else {
      this.toastSevice.presentToast('Enter Activity total time and required  fileds.');
    }

  }
  apiUrl: string = 'https://baobabsports.com/baosport/ios/add_new_prayer.php';
  validateInputs() {
    for(let x=0; x< this.sch.length;x++){
      if(this.postData.schedule){
        this.postData.schedule=this.postData.schedule+","+this.sch[x].taskname+"="+this.sch[x].tasktime;
      }else{
        this.postData.schedule=this.postData.schedule+this.sch[x].taskname+"="+this.sch[x].tasktime;
      }
      
    }
    return (
      this.postData.cdate &&
      this.postData.name &&
      this.postData.totalTime > 0
    );
  }
  saveData() {
    if (this.validateInputs()) {
      this.presentLoading();
      this.http.post(this.apiUrl, this.postData).subscribe(
        res => {
this.res=res;
          if (this.res['status'] == 'true') {
            this.toastSevice.presentToast("Prayer activity Added Successfully");

          } else {
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
  remove(no:any){
   this.remetime =   this.remetime +this.sch[no].tasktime;
    (this.sch).splice(no, 1);

  };
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
