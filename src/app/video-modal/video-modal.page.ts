import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-video-modal',
  templateUrl: './video-modal.page.html',
  styleUrls: ['./video-modal.page.scss'],
})
export class VideoModalPage implements OnInit {
url:any;
  constructor(private actrouter:ActivatedRoute) { }

  ngOnInit() {
    this.url=this.actrouter.snapshot.paramMap.get("url");
  }

}
