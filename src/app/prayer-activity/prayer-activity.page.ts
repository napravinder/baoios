import { Component, OnInit } from '@angular/core';

import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-prayer-activity',
  templateUrl: './prayer-activity.page.html',
  styleUrls: ['./prayer-activity.page.scss'],
})
export class PrayerActivityPage implements OnInit {
  prayer:any
  constructor(private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private router: Router) { 

         //get stored sno no
         this.storageService.get('sno').then((sno) => {
          if (sno !== false) {
            this.storageService.get('type').then((type) => {
              this.http.post('https://baobabsports.com/baosport/ios/view_prayer_activity.php', {
                "sno": sno,
                "type": type
              }).subscribe((res:any=[]) => {
                  this.prayer=res['view_prayer_activity'];
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

  public funDetail(id:any,untilUsed:any,schedule:any) {
   
    this.router.navigate(['/prayer-detail',{id:id,untilUsed:untilUsed,schedule:schedule}]);
  }

}
