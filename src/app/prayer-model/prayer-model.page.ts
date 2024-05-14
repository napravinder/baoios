import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController} from '@ionic/angular';  
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-prayer-model',
  templateUrl: './prayer-model.page.html',
  styleUrls: ['./prayer-model.page.scss'],
})
export class PrayerModelPage implements OnInit {
reme:any;
  modelData:any={
    "taskname":'',
    "tasktime":0
  }
  constructor(navParams: NavParams,public modalCtrl: ModalController,private toastSevice: ToastService) {
    this.reme=navParams.get('reme');

   }

  ngOnInit() {
  }
  add(){
    if((parseInt(this.reme)>=this.modelData.tasktime && this.modelData.tasktime>0)){
        this.modalCtrl.dismiss(this.modelData);
    }else{
    this.toastSevice.presentToast('Tasktime should be lessthen and equal to Remaining time.');
    }
  }
dismiss() {  
  if(this.reme<=this.modelData.tasktime){
    this.modalCtrl.dismiss(this.modelData);  
  }else{
    this.modelData.taskname="";
    this.modelData.tasktime=0;
    this.modalCtrl.dismiss(this.modelData); 
  }

}  
}
