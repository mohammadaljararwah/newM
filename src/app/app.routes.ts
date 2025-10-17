import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { VisionComponent } from './pages/vision/vision.component';
import { GoalsComponent } from './pages/goals/goals.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'vision', component: VisionComponent },
  { path: 'goals', component: GoalsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  // THE FIX IS HERE: We added the options object below
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }