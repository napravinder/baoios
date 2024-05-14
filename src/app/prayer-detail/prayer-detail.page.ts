import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-prayer-detail',
  templateUrl: './prayer-detail.page.html',
  styleUrls: ['./prayer-detail.page.scss'],
})
export class PrayerDetailPage implements OnInit {
  untilUsed:any;schedule:any;
  constructor(private actrouter: ActivatedRoute) { }

  ngOnInit() {
    this.untilUsed=this.actrouter.snapshot.paramMap.get("untilUsed");
    this.schedule=this.actrouter.snapshot.paramMap.get("schedule");
  }

}
