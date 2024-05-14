import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import Swiper from 'swiper';
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.page.html',
  styleUrls: ['./image-modal.page.scss'],
})
export class ImageModalPage implements OnInit {
  swiperModules = [IonicSlides];
  @Input('img')img: any;
 
  sliderOpts = {
    zoom: true
  };
  slides: any;
 
  constructor(private modalController: ModalController) { }

  ngOnInit() {
    const mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 1,
      spaceBetween: 10,
      loop: true,
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      autoplay: {
        delay: 500, // set the delay time in milliseconds
        disableOnInteraction: false // allow autoplay to continue after user interaction
      }
    });
  }
  ionViewDidEnter(){
    this.slides.update();
  }
 
  async zoom(zoomIn: boolean) {
    const slider = await this.slides.getSwiper();
    const zoom = slider.zoom;
    zoomIn ? zoom.in() : zoom.out();
  }
 
  close() {
    this.modalController.dismiss();
  }

}
