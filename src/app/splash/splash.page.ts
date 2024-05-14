import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(  private router: Router,private storageService: StorageService) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.setPage();
    }, 6000);
  }
  setPage(){
    this.storageService.get('sno').then((sno) => {
      if (sno !== null ) {
        this.storageService.get('type').then((type) => {
          if(type == 'parent'){
            this.router.navigate(['/home']);
          }else if(type=='business'){
            this.router.navigate(['/business-home']);
          }else if(type=='trainer'){
            this.router.navigate(['/trainer-home']);
          }else{
            this.router.navigate(['/trainer-home']);
          }
        });
      }else{
        this.router.navigate(['/login']);
      }
    });
  }
}
