import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
@Component({
  selector: 'app-add-new-student',
  templateUrl: './add-new-student.page.html',
  styleUrls: ['./add-new-student.page.scss'],
})
export class AddNewStudentPage implements OnInit {
  postData={
    "name":'',
    "class":'',
    "age":'',
    "section":'',
    "fathername":'',
    "gender":'',
    "sno":'',
    "address":'',
    "dob":'',
    "height":'',
    "weight":'',
    "userid":'',
    "password":''
  }
  res:any; res1:any;
  curriculum_classes:any;
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController) {
 //get stored sno no
 this.storageService.get('sno').then((sno) => {
  if (sno !== false) {
    this.postData.sno=sno;
    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_curriculum_classes.php', {
        "sno": sno,
        "type": type
      }).subscribe(
        response => {
          this.res=response;
          this.curriculum_classes=this.res['curriculum_classes'];
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
  apiUrl: string = 'https://baobabsports.com/baosport/ios/add_new_student.php';
  validateInputs() {
    let class_id= this.postData.class.trim();
    let studentName = this.postData.name.trim();
    let fatherName = this.postData.fathername.trim();
    let userid = this.postData.userid.trim();
    let dob = this.postData.dob.trim();
    let password = this.postData.password.trim();
    let address = this.postData.address.trim();
    let weight= this.postData.weight.trim();
    let height = this.postData.height.trim();
    return (
    this.postData.class &&
    this.postData.name && 
    this.postData.fathername && 
    this.postData.height && 
    this.postData.dob && 
    this.postData.password &&
    this.postData.weight &&
    this.postData.userid &&
    this.postData.section &&
    studentName.length > 0 &&
    fatherName.length > 0 && 
    userid.length>0 &&
    password.length > 0 &&
    dob.length > 0 &&
    weight.length > 0 
    );
    }
    saveData() {
      if (this.validateInputs()) {
        this.presentLoading();
      this.http.post(this.apiUrl,this.postData).subscribe(
        response => {
          this.res1=response;
          if(this.res['status']=='true'){
            console.log(this.res);
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
