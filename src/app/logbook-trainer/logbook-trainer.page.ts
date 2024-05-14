import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logbook-trainer',
  templateUrl: './logbook-trainer.page.html',
  styleUrls: ['./logbook-trainer.page.scss'],
})
export class LogbookTrainerPage implements OnInit {
  curriculum_classes:any;levelIDs:any;class_id:any;activity:any;activity_id:any;sno1:any;type: any;
  view_students:any;
  masterCheck:any;
  isIndeterminate:any;
  student_id:any;
  checked:any;
  constructor(
    private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController,
    private router: Router) { 
        this.checked=0;
          //get stored sno no
          this.storageService.get('sno').then((sno) => {
            if (sno !== false) {
              this.sno1=sno;
              this.storageService.get('type').then((type) => {
                this.type = type;
                this.http.post('https://baobabsports.com/baosport/ios/get_curriculum_classes.php', {
                  "sno": sno,
                  "type": type
                }).subscribe((res:any=[]) =>{
                    this.curriculum_classes=res['curriculum_classes'];
                    this.levelIDs=res['levelIDs'];
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

  getActivity(){
    this.presentLoading();

      this.http.post('https://baobabsports.com/baosport/ios/get_class_activities.php', {
        "classid": this.class_id,
        "trainerID": this.sno1,
        "type": this.type,
        "levelIDs": this.levelIDs.toString()
      }).subscribe((res:any=[]) => {
          this.activity=res['activity'];
        
        },
        err => {
          console.log(err);
        }
      );
      this.http.post('https://baobabsports.com/baosport/ios/get_students.php', {
        "class_id": this.class_id,
        "sno":this.sno1
      }).subscribe((res:any=[]) => {
          this.view_students=res['view_students'];
        
        },
        err => {
          console.log(err);
        }
      );

   
  }

  checkMaster() {
    setTimeout(()=>{
      this.view_students.forEach((obj: { isChecked: any; }) => {
        obj.isChecked = this.masterCheck;
      });
    });
  }
  checkEvent() {
    const totalItems = this.view_students.length;
     this.checked = 0;
    this.view_students.map((obj: { isChecked: any; }) => {
      if (obj.isChecked) this.checked++;
    });
    if (this.checked > 0 && this.checked < totalItems) {
      //If even one item is checked but not all
      this.isIndeterminate = true;
      this.masterCheck = false;
    } else if (this.checked == totalItems) {
      //If all are checked
      this.masterCheck = true;
      this.isIndeterminate = false;
    } else {
      //If none is checked
      this.isIndeterminate = false;
      this.masterCheck = false;
    }
  }

  apiUrl: string = 'https://baobabsports.com/baosport/ios/insert_log_book.php';
  validateInputs() {
    
    return (
    this.class_id.length > 0 &&
    this.activity_id.length > 0 &&
    this.checked>0
    );
    }
  saveData() {
    
    if (this.validateInputs()) {
      //set studentids 
      this.view_students.map((obj: { isChecked: any; id: string; }) => {
        if (obj.isChecked){
          if(this.student_id){
            this.student_id=this.student_id+",,"+obj.id;
          }else{
            this.student_id=obj.id;
          }
         
        }
      });
      //end students

      this.presentLoading();
    this.http.post(this.apiUrl,{'sno':this.sno1,'class_id':this.class_id,'student_ids':this.student_id,'activity_id':this.activity_id}).subscribe((res:any=[]) => {
 
        if(res['status']=='true'){
          console.log(res);
          this.toastSevice.presentToast("Log Book Added Successfully");
    
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
    this.toastSevice.presentToast('Please select data.');
    }
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
}
