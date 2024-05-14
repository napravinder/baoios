import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { MenuController, Platform } from '@ionic/angular';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { Keyboard } from '@awesome-cordova-plugins/keyboard/ngx';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  public topColor: string;
  response: any;
  heading: string; colors: string; colorb: string; colort: string;
  type: any;activeBtns:string; activeBtnb: any; activeBtnt: any;
  isKeyboardHide=true;
  deviceHeight="729px";
  private _storage: Storage | null = null;
  
  postData = {
    "username": '',
    "password": '',
    "type": 'parent'
  }
  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastSevice: ToastService,
    private http: HttpClient,
    private storage: Storage,
    private loadingCtrl: LoadingController,
    private menu: MenuController,
    private iab: InAppBrowser,
    private keyboard: Keyboard,
    private platform: Platform

  ) {
    this.postData.password='';

    this.topColor='#0C2F55';
    this.menu.enable(false);
    this.activeBtns="active-button";
    this.storageService.get('sno').then((sno) => {
      console.log(sno);
      if (sno !== null) {
        this.menu.enable(true);
        this.storageService.get('type').then((type) => {
          this.type=type;
          if(this.type == 'parent'){
            this.router.navigate(['/home']);
          }else if(this.type=='business'){
            this.router.navigate(['/business-home']);
          }else if(this.type=='trainer'){
            this.router.navigate(['/trainer-home']);
          }
        });
       
        
      }
    });
    this.colors = "light";
    this.colorb = "success";
    this.colort = "success";
    this.heading = "Welcome To Parent Panel";
    platform.ready().then(() => {
      this.deviceHeight= (this.platform.height()-40).toString()+"px";
    });
  }

  apiUrl: string = 'https://baobabsports.com/baosport/ios/login.php';
  ngOnInit() {
  }
  ionViewDidEnter() {
    
    this.platform.backButton.subscribeWithPriority(1, () => {
      // Custom logic to handle the back button press
      // For example, you can show an alert or do nothing to disable it
      // You can also navigate to another page if needed

      // To prevent the default back button behavior, use event.preventDefault()
      event?.preventDefault();
    });
  }
  ionViewWillEnter() {
    this.keyboard.onKeyboardWillShow().subscribe(()=>{
      this.isKeyboardHide=false;
       console.log('aaaSHOWK');
    });

    this.keyboard.onKeyboardWillHide().subscribe(()=>{
      this.isKeyboardHide=true;
      console.log('aaaHIDEK');
    });
  }

  validateInputs() {
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }
  loginAction() {
    if (this.validateInputs()) {
      this.presentLoading();
       this.http.post(this.apiUrl, this.postData).subscribe(
        res => {
          this.response=res;
          console.log(this.response['status']);
          if (this.response['status'] == 'true') {
          

            this.menu.enable(true, 'first');
            this.menu.enable(true, 'custom');
           
            if (this.postData.type == 'parent') {
              this.storageService.set('username', this.response['username']);
              this.storageService.set('sno', this.response['sno']);
              this.storageService.set('class_id', this.response['sno']);
              this.storageService.set('type','parent');
              this.reloadComponent();
              this.ngOnInit();
              this.router.navigateByUrl('/home');
            } else if (this.postData.type == 'business') {
              this.storageService.set('username', this.response['username']);
              this.storageService.set('sno', this.response['sno']);
              this.storageService.set('type','business');
              this.reloadComponent();
              this.ngOnInit();
              this.router.navigateByUrl('/business-home');
              
            } else {
              this.storageService.set('username', this.response['username']);
              this.storageService.set('sno', this.response['sno']);
              this.storageService.set('type','trainer');
              this.reloadComponent();
              this.ngOnInit();
              this.router.navigateByUrl('/trainer-home')
            }
          } else {
            this.toastSevice.presentToast("Incorrect username and password");
          }
          this.loadingCtrl.dismiss();
        },
        err => {
          console.log(err);
          this.toastSevice.presentToast('Network Issue.');
        }
      );
    } else {
      this.toastSevice.presentToast('Please enter email/username or password.');
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
  setloginType(type: any) {
    this.postData.type = type;
    if (type == 'parent') {
      this.heading = "Welcome To Student Panel";
      this.colors = "light";
      this.colorb = "success";
      this.colort = "success";
      this.activeBtns="active-button";
      this.activeBtnb="";
      this.activeBtnt="";
    } else if (type == 'business') {
      this.colors = "success";
      this.colorb = "light";
      this.colort = "success";
      this.activeBtns="";
      this.activeBtnb="active-button";
      this.activeBtnt="";
      this.heading = "Welcome To Business Panel";
    } else {
      this.colors = "success";
      this.colorb = "success";
      this.colort = "light";
      this.activeBtns="";
      this.activeBtnb="";
      this.activeBtnt="active-button";
      this.heading = "Welcome To Trainer Panel";
    }

  }
  openurl(url: string){
  const browser = this.iab.create(url,"_blank");
}
reloadComponent() {
  let currentUrl = this.router.url;
      this.router.routeReuseStrategy.shouldReuseRoute = () => false;
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigate([currentUrl]);
  }
}
