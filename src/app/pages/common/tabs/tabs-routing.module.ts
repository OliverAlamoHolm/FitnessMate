import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import {CoachGuard} from '../../../guards/coaches/coach.guard'
import {AthleteGuard} from '../../../guards/athletes/athlete.guard'

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      
      {
        path: 'coachHome',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../coaches/home-coach/home-coach.module').then(m => m.HomeCoachPageModule), canActivate : [CoachGuard]
          }
        ]
      },
      {
        path: 'coachClients',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../coaches/coach-clients/coach-clients.module').then(m => m.CoachClientsPageModule), canActivate : [CoachGuard]
          }
        ]
      },
      {
        path: 'coachProfile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../coaches/coach-profile/coach-profile.module').then(m => m.CoachProfilePageModule), canActivate : [CoachGuard]
          }
        ]
      },
      {
        path: 'athleteHome',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/athlete-home/athlete-home.module').then(m => m.AthleteHomePageModule), canActivate : [AthleteGuard]
          }
        ]
      },
      {
        path: 'athleteProfile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/athlete-profile/athlete-profile.module').then(m => m.AthleteProfilePageModule), canActivate : [AthleteGuard]
          }
        ]
      },
      {
        path: 'messages',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../coaches/messages/messages.module').then(m => m.MessagesPageModule), canActivate : [CoachGuard]
          }
        ]
      },
      {
        path: 'myCoach',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/my-coach/my-coach.module').then(m => m.MyCoachPageModule), canActivate : [AthleteGuard]
          }
        ]
      },
      {
        path: 'myCoachProfile',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/coach-profile/coach-profile.module').then(m => m.CoachProfilePageModule), canActivate : [AthleteGuard]
          }
        ]
      },
      {
        path: 'plannings',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/plannings/plannings.module').then(m => m.PlanningsPageModule), canActivate : [AthleteGuard]
          }
        ]
      },

      {
        path: 'athlete-messages',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../athletes/athlete-messages/athlete-messages.module').then(m => m.AthleteMessagesPageModule), canActivate : [AthleteGuard]
          }
        ]
      },
      
      {
        path: 'tabs',
        redirectTo: 'coachHome',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
