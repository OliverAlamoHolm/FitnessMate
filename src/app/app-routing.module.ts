import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from '../app/guards/common/auth.guard'
import {NologinGuard} from '../app/guards/common/nologin.guard'
import {CoachGuard} from '../app/guards/coaches/coach.guard'
import {AthleteGuard} from '../app/guards/athletes/athlete.guard'
import { DeviceGuard } from './guards/common/device.guard';

const routes: Routes = [
  
  {
    path: '',
    loadChildren: () => import('./pages/common/tabs/tabs.module').then(m => m.TabsPageModule), canActivate : [AuthGuard, DeviceGuard]
  },
  
  {
    path: 'login',
    loadChildren: () => import('./pages/common/login/login.module').then( m => m.LoginPageModule), canActivate : [NologinGuard, DeviceGuard]
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/common/register/register.module').then( m => m.RegisterPageModule), canActivate : [NologinGuard, DeviceGuard]
  },
  {
    path: 'athlete-home',
    loadChildren: () => import('./pages/athletes/athlete-home/athlete-home.module').then( m => m.AthleteHomePageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'athlete-profile',
    loadChildren: () => import('./pages/athletes/athlete-profile/athlete-profile.module').then( m => m.AthleteProfilePageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'home-coach',
    loadChildren: () => import('./pages/coaches/home-coach/home-coach.module').then( m => m.HomeCoachPageModule), canActivate : [CoachGuard, DeviceGuard]
  },

  {
    path: 'messages',
    loadChildren: () => import('./pages/coaches/messages/messages.module').then( m => m.MessagesPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'plannings',
    loadChildren: () => import('./pages/athletes/plannings/plannings.module').then( m => m.PlanningsPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'my-coach',
    loadChildren: () => import('./pages/athletes/my-coach/my-coach.module').then( m => m.MyCoachPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'exercises',
    loadChildren: () => import('./pages/common/exercises/exercises.module').then( m => m.ExercisesPageModule)
  },
  {
    path: 'food',
    loadChildren: () => import('./pages/common/food/food.module').then( m => m.FoodPageModule)
  },
  {
    path: 'diet',
    loadChildren: () => import('./pages/athletes/diet/diet.module').then( m => m.DietPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'routine',
    loadChildren: () => import('./pages/athletes/routine/routine.module').then( m => m.RoutinePageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'profile-maker',
    loadChildren: () => import('./pages/common/profile-maker/profile-maker.module').then( m => m.ProfileMakerPageModule)
  },
  {
    path: 'coach-profile/:uid',
    loadChildren: () => import('./pages/athletes/coach-profile/coach-profile.module').then( m => m.CoachProfilePageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'food-details/:name',
    loadChildren: () => import('./pages/common/food-details/food-details.module').then( m => m.FoodDetailsPageModule)
  },
  {
    path: 'exercise-details/:name',
    loadChildren: () => import('./pages/common/exercise-details/exercise-details.module').then( m => m.ExerciseDetailsPageModule)
  },
  {
    path: 'coach-messaging/:id/:uid/:name/:avatar',
    loadChildren: () => import('./pages/athletes/coach-messaging/coach-messaging.module').then( m => m.CoachMessagingPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'client-profile/:uid',
    loadChildren: () => import('./pages/coaches/client-profile/client-profile.module').then( m => m.ClientProfilePageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'logout',
    loadChildren: () => import('./pages/common/logout/logout.module').then( m => m.LogoutPageModule)
  },
  {
    path: 'fee-modal',
    loadChildren: () => import('./pages/coaches/fee-modal/fee-modal.module').then( m => m.FeeModalPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'trainer-fee',
    loadChildren: () => import('./pages/athletes/trainer-fee/trainer-fee.module').then( m => m.TrainerFeePageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'trainingplan-modal',
    loadChildren: () => import('./pages/coaches/trainingplan-modal/trainingplan-modal.module').then( m => m.TrainingplanModalPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  
  {
    path: 'chat/:id/:name/:avatar',
    loadChildren: () => import('./pages/common/chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'messages',
    loadChildren: () => import('./pages/athletes/messages/messages.module').then( m => m.MessagesPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'athlete-messages',
    loadChildren: () => import('./pages/athletes/athlete-messages/athlete-messages.module').then( m => m.AthleteMessagesPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'athlete-chat/:id/:day',
    loadChildren: () => import('./pages/athletes/athlete-chat/athlete-chat.module').then( m => m.AthleteChatPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'dietplan-modal',
    loadChildren: () => import('./pages/coaches/dietplan-modal/dietplan-modal.module').then( m => m.DietplanModalPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'client-messaging/:id/:uid/:name/:avatar',
    loadChildren: () => import('./pages/coaches/client-messaging/client-messaging.module').then( m => m.ClientMessagingPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'ex-modal',
    loadChildren: () => import('./pages/athletes/ex-modal/ex-modal.module').then( m => m.ExModalPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'progress-modal',
    loadChildren: () => import('./pages/athletes/progress-modal/progress-modal.module').then( m => m.ProgressModalPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'notes-modal',
    loadChildren: () => import('./pages/common/notes-modal/notes-modal.module').then( m => m.NotesModalPageModule)
  },
  {
    path: 'macros-modal',
    loadChildren: () => import('./pages/common/macros-modal/macros-modal.module').then( m => m.MacrosModalPageModule)
  },
  {
    path: 'imc-calculator',
    loadChildren: () => import('./pages/athletes/imc-calculator/imc-calculator.module').then( m => m.ImcCalculatorPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'progress-modal',
    loadChildren: () => import('./pages/coaches/progress-modal/progress-modal.module').then( m => m.ProgressModalPageModule), canActivate : [CoachGuard, DeviceGuard]
  },
  {
    path: 'progressimage-modal',
    loadChildren: () => import('./pages/common/progressimage-modal/progressimage-modal.module').then( m => m.ProgressimageModalPageModule)
  },
  {
    path: 'payment-modal',
    loadChildren: () => import('./pages/athletes/payment-modal/payment-modal.module').then( m => m.PaymentModalPageModule), canActivate : [AthleteGuard, DeviceGuard]
  },
  {
    path: 'verification',
    loadChildren: () => import('./pages/common/verification/verification.module').then( m => m.VerificationPageModule)
  },
  {
    path: 'whoweare',
    loadChildren: () => import('./pages/common/whoweare/whoweare.module').then( m => m.WhowearePageModule)
  },
  {
    path: 'terms',
    loadChildren: () => import('./pages/common/terms/terms.module').then( m => m.TermsPageModule)
  },
  {
    path: 'devicealert',
    loadChildren: () => import('./pages/common/devicealert/devicealert.module').then( m => m.DevicealertPageModule)
  },
  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
