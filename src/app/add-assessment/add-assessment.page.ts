import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-assessment',
  templateUrl: './add-assessment.page.html',
  styleUrls: ['./add-assessment.page.scss'],
})
export class AddAssessmentPage implements OnInit {
  class_id : any;
  curriculum_classes : any;
  constructor() { }

  ngOnInit() {
  }
  getActivity(){
    return this.class_id;
  }
}
