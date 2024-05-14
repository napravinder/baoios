import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { NavController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';
import { StorageService } from './storage.service';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { Plugins } from '@capacitor/core';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { LoadingController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { SplashScreen } from '@capacitor/splash-screen';

// eslint-disable-next-line @typescript-eslint/naming-convention
const { Browser } = Plugins;

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  sno1: any;
  navigate: any;
  chckuser: boolean; isLoggedIn: boolean;
  username: any;
  fname: any;
  pimage = "https://ionicframework.com/docs/demos/api/avatar/avatar.svg";
  constructor(
    private router: Router,
    private menu: MenuController,
    private storage: Storage,
    private authService: AuthService,
    private storageService: StorageService,
    public platform: Platform,
    private iab: InAppBrowser,
    private loadingCtrl: LoadingController,
    private http: HttpClient
    

  ) {
    SplashScreen.hide();
    //   SplashScreen.show({
    //    showDuration: 5000,
    //    autoHide: false,
    //  });
   
    this.chckuser = false;
    this.isLoggedIn = false;
  
    
    //  this.platform.ready().then(async () => {
   
    //   this.router.navigate(['/splash']);
    //  });
 
    this.storageService.get('sno').then((sno) => {
     
      if (sno !== false) {
        this.isLoggedIn = true;
        this.menu.enable(true, 'first');
        this.menu.enable(true, 'custom');
        this.storageService.get('type').then((type) => {
         
        
          //get userdata
          this.http.post('https://baobabsports.com/baosport/ios/single_user_data.php', {
            "sno": sno,
            "type": type
          }).subscribe(
            res1 => {
              
              // this.username = res1['name'];
              // this.fname = res1['father_name'];
              // if (res1['profile_pic']) {
              //   this.pimage = res1['profile_pic'];
              // }
              console.log(this.username);
            },
            err => {
              console.log(err);

            }
          );
          //get userdata
          if (type == 'business') {
            this.chckuser = true;
          }
        });
        this.storageService.get('username').then((username) => {

          this.username = username;

        });
        this.sno1 = sno;




      } else {

        this.isLoggedIn = false;
        this.username = "";
        this.authService.logout();
      }
    });
    this.sideMenu();
 
  }
  ionViewDidEnter() {
  }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.username
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }
  sideMenu() {
    this.navigate =
      [
        {
          title: "Home",
          url: "/home",
          icon: "home"
        }, {
          title: "Business Home",
          url: "/business-home",
          icon: "home"
        }, {
          title: "Trainer Home",
          url: "/trainer-home",
          icon: "home"
        }
      ]
  }
  logoutapp() {
    this.username = ""
    this.menu.enable(false);
    this.isLoggedIn = false;
    this.authService.logout();

  }
  noti() {
    this.menu.enable(false);
    this.presentLoading();
    this.router.navigate(['/notifications']);

  }
  openurl(url1: any) {

    const browser = this.iab.create(url1, "_blank");

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
