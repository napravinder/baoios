import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {
  noti: any;
  constructor(private authService: AuthService,
    private storageService: StorageService,
    private toastSevice: ToastService,
    private http: HttpClient,
    private storage: Storage) {
 //get stored sno no
 this.storageService.get('sno').then((sno) => {
  if (sno !== false) {
    this.storageService.get('type').then((type) => {
      this.http.post('https://baobabsports.com/baosport/ios/get_notification.php', {
        "sno": sno,
        "type": type
      }).subscribe((res:any=[]) => {
          this.noti=res['notification'];
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

}
