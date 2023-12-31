import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeComponent } from './college/college.component';
import { StudentComponent } from './student/student.component';
import { ProgramComponent } from './program/program.component';

const routes: Routes = [
  { path: '', component: StudentComponent},
  { path: 'college', component: CollegeComponent},
  { path: 'program', component: ProgramComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
