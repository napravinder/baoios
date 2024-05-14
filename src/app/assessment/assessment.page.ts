import { Component, OnInit } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { HttpClient } from '@angular/common/http';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
const { Browser } = Plugins;
@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.page.html',
  styleUrls: ['./assessment.page.scss'],
})
export class AssessmentPage implements OnInit {
  month:any;
  res:any;
  zone:any;
  checkdata:boolean;
  student_id:any;
  constructor( private authService:AuthService,
    private storageService:StorageService,
    private iab: InAppBrowser,
    private http: HttpClient) {
      this.checkdata=false;
       //get stored sno no
       this.storageService.get('sno').then((sno) => {
        if (sno !== false) {
            this.student_id=sno;
          this.http.post('https://baobabsports.com/baosport/ios/get_stu_month.php', {
            "sno": sno,
            "type": 'parent'
          }).subscribe(
            res => {
              this.res=res;
              this.month=this.res['months'];
              if(this.month.length>0){
                this.checkdata=true;
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
  assessmentDetail(month:any){
    const browser = this.iab.create('https://baobabsports.com/baosport/view-assesment-school.php?student_id='+this.student_id+'&month='+month,"_blank");

  }
}
