import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IntroSliderComponent } from './intro-slider/intro-slider.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full'
  },
  {
    path: 'intro',
    component: IntroSliderComponent,
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
 
  {
    path: 'playathome',
    loadChildren: () => import('./playathome/playathome.module').then( m => m.PlayathomePageModule)
  },
  {
    path: 'lesson-plan',
    loadChildren: () => import('./lesson-plan/lesson-plan.module').then( m => m.LessonPlanPageModule)
  },
  {
    path: 'gallery',
    loadChildren: () => import('./gallery/gallery.module').then( m => m.GalleryPageModule)
  },
  {
    path: 'image-modal',
    loadChildren: () => import('./image-modal/image-modal.module').then( m => m.ImageModalPageModule)
  },
  {
    path: 'admission',
    loadChildren: () => import('./admission/admission.module').then( m => m.AdmissionPageModule)
  },
  {
    path: 'timetable',
    loadChildren: () => import('./timetable/timetable.module').then( m => m.TimetablePageModule)
  },
  {
    path: 'foodandnutrition',
    loadChildren: () => import('./foodandnutrition/foodandnutrition.module').then( m => m.FoodandnutritionPageModule)
  },
  {
    path: 'fooddetail',
    loadChildren: () => import('./fooddetail/fooddetail.module').then( m => m.FooddetailPageModule)
  },
  {
    path: 'fitnessfun',
    loadChildren: () => import('./fitnessfun/fitnessfun.module').then( m => m.FitnessfunPageModule)
  },
  {
    path: 'fitness-detail',
    loadChildren: () => import('./fitness-detail/fitness-detail.module').then( m => m.FitnessDetailPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'event-detail',
    loadChildren: () => import('./event-detail/event-detail.module').then( m => m.EventDetailPageModule)
  },
  {
    path: 'skill',
    loadChildren: () => import('./skill/skill.module').then( m => m.SkillPageModule)
  },
  {
    path: 'skill-detail',
    loadChildren: () => import('./skill-detail/skill-detail.module').then( m => m.SkillDetailPageModule)
  },
  {
    path: 'assessment',
    loadChildren: () => import('./assessment/assessment.module').then( m => m.AssessmentPageModule)
  },
  {
    path: 'logbook',
    loadChildren: () => import('./logbook/logbook.module').then( m => m.LogbookPageModule)
  },
  {
    path: 'logbook-detail',
    loadChildren: () => import('./logbook-detail/logbook-detail.module').then( m => m.LogbookDetailPageModule)
  },
  {
    path: 'logactivity',
    loadChildren: () => import('./logactivity/logactivity.module').then( m => m.LogactivityPageModule)
  },
  {
    path: 'video-modal',
    loadChildren: () => import('./video-modal/video-modal.module').then( m => m.VideoModalPageModule)
  },
  {
    path: 'business-home',
    loadChildren: () => import('./business-home/business-home.module').then( m => m.BusinessHomePageModule)
  },
  {
    path: 'business-time-table',
    loadChildren: () => import('./business-time-table/business-time-table.module').then( m => m.BusinessTimeTablePageModule)
  },
  {
    path: 'prayer-activity',
    loadChildren: () => import('./prayer-activity/prayer-activity.module').then( m => m.PrayerActivityPageModule)
  },
  {
    path: 'modal',
    loadChildren: () => import('./modal/modal.module').then( m => m.ModalPageModule)
  },
  {
    path: 'prayer-detail',
    loadChildren: () => import('./prayer-detail/prayer-detail.module').then( m => m.PrayerDetailPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
  },
  {
    path: 'business-feedback',
    loadChildren: () => import('./business-feedback/business-feedback.module').then( m => m.BusinessFeedbackPageModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then( m => m.TrainingPageModule)
  },
  {
    path: 'training-detail',
    loadChildren: () => import('./training-detail/training-detail.module').then( m => m.TrainingDetailPageModule)
  },
  {
    path: 'trainer-home',
    loadChildren: () => import('./trainer-home/trainer-home.module').then( m => m.TrainerHomePageModule)
  },
  {
    path: 'add-prayer-activity',
    loadChildren: () => import('./add-prayer-activity/add-prayer-activity.module').then( m => m.AddPrayerActivityPageModule)
  },
  {
    path: 'prayer-model',
    loadChildren: () => import('./prayer-model/prayer-model.module').then( m => m.PrayerModelPageModule)
  },
  {
    path: 'curriculum',
    loadChildren: () => import('./curriculum/curriculum.module').then( m => m.CurriculumPageModule)
  },
  {
    path: 'curriculum-detail',
    loadChildren: () => import('./curriculum-detail/curriculum-detail.module').then( m => m.CurriculumDetailPageModule)
  },
  {
    path: 'logbook-trainer',
    loadChildren: () => import('./logbook-trainer/logbook-trainer.module').then( m => m.LogbookTrainerPageModule)
  },
  {
    path: 'add-new-student',
    loadChildren: () => import('./add-new-student/add-new-student.module').then( m => m.AddNewStudentPageModule)
  },
  {
    path: 'add-gallery',
    loadChildren: () => import('./add-gallery/add-gallery.module').then( m => m.AddGalleryPageModule)
  },
  {
    path: 'add-assessment',
    loadChildren: () => import('./add-assessment/add-assessment.module').then( m => m.AddAssessmentPageModule)
  },
  {
    path: 'triner-timertable',
    loadChildren: () => import('./triner-timertable/triner-timertable.module').then( m => m.TrinerTimertablePageModule)
  },
  {
    path: 'event',
    loadChildren: () => import('./event/event.module').then( m => m.EventPageModule)
  },
  {
    path: 'add-event',
    loadChildren: () => import('./add-event/add-event.module').then( m => m.AddEventPageModule)
  },
  {
    path: 'activity',
    loadChildren: () => import('./activity/activity.module').then( m => m.ActivityPageModule)
  },
  {
    path: 'add-activity',
    loadChildren: () => import('./add-activity/add-activity.module').then( m => m.AddActivityPageModule)
  },
  {
    path: 'gallery-modal',
    loadChildren: () => import('./gallery-modal/gallery-modal.module').then( m => m.GalleryModalPageModule)
  },
  {
    path: 'modal-assessment',
    loadChildren: () => import('./modal-assessment/modal-assessment.module').then( m => m.ModalAssessmentPageModule)
  },
  {
    path: 'training-request',
    loadChildren: () => import('./training-request/training-request.module').then( m => m.TrainingRequestPageModule)
  },
  {
    path: 'upcomingevent',
    loadChildren: () => import('./upcomingevent/upcomingevent.module').then( m => m.UpcomingeventPageModule)
  },
  {
    path: 'newsboard',
    loadChildren: () => import('./newsboard/newsboard.module').then( m => m.NewsboardPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    IonicStorageModule.forRoot()
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
