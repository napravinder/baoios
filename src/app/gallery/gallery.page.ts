import { Component, OnInit,ChangeDetectorRef, ViewChild  } from '@angular/core';
import { GalleryModalPage } from '../gallery-modal/gallery-modal.page';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../storage.service';
import { ToastService } from '../services/toast.service';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { LoadingController } from '@ionic/angular';
import { IonAccordionGroup } from '@ionic/angular';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.page.html',
  styleUrls: ['./gallery.page.scss'],
})

export class GalleryPage implements OnInit {

  @ViewChild('accordionGroup', { static: true })
  accordionGroup!: IonAccordionGroup;
  sliderOpts = {
    zoom: false,
    slidesPerView: 1.5,
    spaceBetween: 20,
    centeredSlides: true
  };
  resClass:any;
  selectedNumber:any;
  croppedImagepath = "";
  className:any;
  public images:any; res:any;
  constructor(private modalController: ModalController, 
    private changeDetectorRef: ChangeDetectorRef,
    private authService:AuthService,
    private storageService:StorageService,
    private toastSevice:ToastService,
    private http: HttpClient,
    private storage:Storage,
    private loadingCtrl:LoadingController) { 
    this.presentLoading();
    //get stored sno no
    this.storageService.get('sno').then((sno) => {
     if (sno !== false) {
       this.loadingCtrl.dismiss();
       this.storageService.get('type').then((type) => {
       this.http.post('https://baobabsports.com/baosport/ios/get_gallery.php', {
         "sno": sno,
         "type": type
       }).subscribe(
         res => {
          this.res=res;
          
           this.images=this.res['view_images'];
         },
         err => {
           console.log(err);
         }
       );

       this.http.post('https://baobabsports.com/baosport/ios/get_classes.php', {
        "sno": sno,
        "type": 'className',
        "type2":type,
        "select":""
      }).subscribe(
        response => {
          this.resClass=response;
          this.className=this.resClass['className'];
           
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

  filterImagesByClass(classId: string): any[] {
    return this.images.filter((img: { classId: string; }) => img.classId === classId);
  }

  toggleAccordion = () => {
    const nativeEl = this.accordionGroup;
    if (nativeEl.value === 'second') {
      nativeEl.value = undefined;
    } else {
      nativeEl.value = 'second';
    }
  };

  async openPreview(img:any) {
    const modal = await this.modalController.create({
      component: GalleryModalPage,
      cssClass: 'transparent-modal',
      componentProps: {
        img
      }
    });
    modal.present();
  }
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 5000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

  }
}
