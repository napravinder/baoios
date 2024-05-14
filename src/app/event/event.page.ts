import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { LoadingController } from '@ionic/angular';
import { ToastService } from '../services/toast.service';
@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
})
export class EventPage implements OnInit {
  view_user_events:any;
  res:any;
  constructor(private http: HttpClient, private router: Router,
    private authService: AuthService,
    private storageService: StorageService, private toastSevice:ToastService, private loadingCtrl: LoadingController) {
     //get stored sno no
     this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.storageService.get('type').then((type) => {
        this.http.post('https://baobabsports.com/baosport/ios/view_user_events.php', {
          "sno": sno,
          "type": type
        }).subscribe(
          res => {
            this.res=res;
            this.view_user_events=this.res['view_user_events'];
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
  addEvent(){
    this.router.navigate(['/add-event']);
  }
  eventDetail(id:any,type:any){
    this.presentLoading();
    this.router.navigate(['/event-detail',{id:id,type:type}]);
  }

  deleteEvent(id:any,index:any){

    this.http.post('https://baobabsports.com/baosport/ios/delete_event.php', {
      "id": id
    }).subscribe(
      res => {
        this.view_user_events.splice(index, 1);
        this.toastSevice.presentToast("Event has been deleted");
      },
      err => {
        console.log(err);
        this.toastSevice.presentToast("Something went wrong");
      }
    );
 
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 100
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
}
