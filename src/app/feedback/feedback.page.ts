import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.page.html',
  styleUrls: ['./feedback.page.scss'],
})
export class FeedbackPage implements OnInit {
  rate:any;trainerName="";
  trainerImage="https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  bad="notactive";ok="notactive";verygood="notactive";good="notactive";excellent="notactive";
  postData={
    "id":'0',
    "feedback":'',
    "type":'parent',
    "sno":''
  }
  res:any;
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController) {
      this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
          this.postData.sno=sno;
          
        this.http.post('https://baobabsports.com/baosport/ios/get_trainer_feedback.php', {
          "sno": sno,
          "type": 'parent'
        }).subscribe(
          res => {
            this.res=res;
            this.trainerName=this.res['trainer'][0].name;
            
            if(this.res['trainer'][0].image){
              this.trainerImage=this.res['trainer'][0].image;
            }
                 this.postData.id=this.res['trainer'][0]['id'];
            if(this.res['overall_rate']>4){
              this.bad="bad";
              this.ok="ok";
              this.verygood="verygood";
              this.good="good";
              this.excellent="excellent";
            }else if(this.res['overall_rate']>3){
              this.bad="bad";
              this.ok="ok";
              this.good="good";
              this.verygood="verygood";
              this.excellent="notactive";
            }else if(this.res['overall_rate']>2){
              this.bad="bad";
              this.ok="ok";
              this.good="good";
              this.verygood="notactive";
              this.excellent="notactive";
            }
            else if(this.res['overall_rate']>1){
              this.bad="bad";
              this.ok="ok";
              this.good="notactive";
              this.verygood="notactive";
              this.excellent="notactive";
            }else{
              this.bad="bad";
              this.ok="notactive";
              this.good="notactive";
              this.verygood="notactive";
              this.excellent="notactive";
            }
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

  apiUrl: string = 'https://baobabsports.com/baosport/ios/insert_feedback.php';
  optionsFn(){
    this.postData.feedback=this.rate;
    this.presentLoading();
    this.http.post(this.apiUrl,this.postData).subscribe(
      res => {
          this.toastSevice.presentToast("Feedback Given");
    
      
      },
      err => {
        console.log(err);
        this.toastSevice.presentToast('Network Issue.');
      }
    );
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
