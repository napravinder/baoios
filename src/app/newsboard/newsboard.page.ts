import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from '../storage.service';
import { AuthService } from '../services/auth.service';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-newsboard',
  templateUrl: './newsboard.page.html',
  styleUrls: ['./newsboard.page.scss'],
})
export class NewsboardPage implements OnInit {
  sno1: any;
 
  newsboard: any;
  type: any;

  constructor(private http: HttpClient,
    private storageService: StorageService,
    private authService: AuthService,
    private loadingCtrl: LoadingController, 
    private router: Router,
    public alertController: AlertController
    ) {

    //get stored sno no
    this.storageService.get('sno').then((sno) => {
      if (sno !== false) {
        this.storageService.get('type').then((type) => {
          this.sno1 = sno;
          this.type=type;
          this.news(sno,type);

        });
        
      
      } else {
        this.authService.logout();
      }

    });
  }
  ngOnInit() {
  }
  news(sno: any,type: any) {
    this.http.post('https://baobabsports.com/baosport/ios/news.php', {
      "sno": sno,
      "type": type
    }).subscribe((res2:any=[]) => {
        this.newsboard=res2['ticker'];

      },
      err => {
        console.log(err);
      }
    );
  }
  async presentAlert(msg: string) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'News Board',
      subHeader: 'News',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }
}
