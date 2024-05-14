import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
@Component({
  selector: 'app-upcomingevent',
  templateUrl: './upcomingevent.page.html',
  styleUrls: ['./upcomingevent.page.scss'],
})
export class UpcomingeventPage implements OnInit {
  sno1: any;
  my: boolean = false;
  upcomingcard: any;
  event: boolean = true;
  constructor(private http: HttpClient,
    private storageService: StorageService,
    private authService: AuthService,
    private loadingCtrl: LoadingController, 
    private router: Router
    ) {

    //get stored sno no
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.sno1 = sno;

        this.storageService.get('type').then((type) => {
          this.upcoming(sno,type);
        });
      } else {
        this.authService.logout();
      }

    });
  }
  ngOnInit() {
  }
  upcoming(sno: any,type: any) {
    this.http.post('https://baobabsports.com/baosport/ios/get_upcoming_events.php', {
      "sno": sno,
      "type": type
    }).subscribe((res2:any=[]) => {
        console.log(res2['upcoming_events']);
        this.upcomingcard = res2['upcoming_events'];
        
        if (res2['upcoming_events'][0].type == "my") {
          this.my = true;
          this.event = false;

        } else {
          
          this.event = true;
          this.my = false;
        }



      },
      err => {
        console.log(err);
      }
    );
  }


  eventDetail(id: any, type: any) {
    this.presentLoading();
    this.router.navigate(['/event-detail', { id: id, type: type }]);
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 4000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
}
