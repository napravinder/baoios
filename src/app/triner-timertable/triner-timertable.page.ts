import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-triner-timertable',
  templateUrl: './triner-timertable.page.html',
  styleUrls: ['./triner-timertable.page.scss'],
})
export class TrinerTimertablePage implements OnInit {
  public view_time:any;
  public view_time_table:any;
  public sno1:any;period:any;start_time:any;end_time:any;periodc:any;cid:any;day:any;
  public clsses:any;start_timec:any;end_timec:any;
  redio:any;
  constructor(  private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController,public alertController: AlertController) { 
      this.presentLoading();
      //get stored sno no
      this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
         this.setData(sno);
              
        }
      });

    }

  ngOnInit() {
  }
setData(sno:any){
  this.sno1=sno;
  this.http.post('https://baobabsports.com/baosport/ios/view_time_table.php', {
    "sno": sno,
    "type": 'trainer'
  }).subscribe((res:any=[]) => {
      this.view_time=res['view_time'];
      this.view_time_table=res['view_time_table'];
    },
    err => {
      console.log(err);
    }
  );
      //classes 
   
        this.http.post('https://baobabsports.com/baosport/ios/get_curriculum_classes.php', {
          "sno": sno,
          "type": 'trainer'
        }).subscribe((res:any=[]) => {
            this.clsses=res['curriculum_classes'];
            this.redio = this.clsses.map(function(el: any) {
              var o = Object.assign({}, el);
              o.name = "classid";
              o.type = "radio";
              o.value = o.id;
              o.label = o.className;
              return o;
            })
          },
          err => {
            console.log(err);
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
  setTime(period:any,start_time:any,end_time:any){
    this.period=period;
    this.start_time=start_time;
    this.end_time=end_time;
    this.presentAlertPrompt();
  }
//for time 
async presentAlertPrompt() {
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'Prompt!',
    inputs: [
      {
        name: 'start_time',
        type: 'time',
        placeholder: 'Start Time',
        value: this.start_time
      },
      {
        name: 'end_time',
        type: 'time',
        id: 'name2-id',
        placeholder: 'End Time',
        value:this.end_time
      }
      
    ],
    buttons: [
      {
        text: 'Cancel',
        role: 'cancel',
        cssClass: 'secondary',
        handler: () => {
          console.log('Confirm Cancel');
        }
      }, {
        text: 'Update',
        handler: (alertData) => {
          
          this.presentLoading();
      this.http.post("https://baobabsports.com/baosport/ios/update_time_table.php",{'type':'time','sno':this.sno1,'period':this.period,'start_time':alertData.start_time,'end_time':alertData.end_time}).subscribe((res:any=[]) => {
          console.log(res);
          if(res['status']=='true'){
           this.setData(this.sno1);
            this.toastSevice.presentToast("Time updated Successfully");
           
          }else{
            this.toastSevice.presentToast("Something went wrong");
          }
        
        },
        err => {
          console.log(err);
          this.toastSevice.presentToast('Network Issue.');
        }
      );
        }
      }
    ]
  });

  await alert.present();
}

  //for class
  setClass(classPeriod:any,day:any,start_time:any,end_time:any){
    this.periodc=classPeriod;
    this.day=day;
    this.start_timec=start_time;
    this.end_timec=end_time;
    this.presentAlertRadio();
     
    
  }
  async presentAlertRadio() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Class',
      inputs: this.redio,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Update',
          handler: (alertData) => {
            this.presentLoading();
            this.http.post("https://baobabsports.com/baosport/ios/update_time_table.php",{'type':'class','sno':this.sno1,'period':this.periodc,'day':this.day,'class_id':alertData,'start_time':this.start_timec,'end_time':this.end_timec}).subscribe((res:any=[]) =>{
                
                if(res['status']=='true'){
                  this.setData(this.sno1);
                  this.toastSevice.presentToast("class updated Successfully");
                 
                }else{
                  this.toastSevice.presentToast("Something went wrong");
                }
              
              },
              err => {
                console.log(err);
                this.toastSevice.presentToast('Network Issue.');
              }
            );
          }
        }
      ]
    });

    await alert.present();
  }

  doRefresh(event:any) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  
}
