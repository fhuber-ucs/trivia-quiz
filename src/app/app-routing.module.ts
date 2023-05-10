import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from './quiz/quiz.component';
import { ResultsComponent } from './results/results.component';
import {quizGuard} from "./quiz.guard";

const routes: Routes = [
  { path: '', component: QuizComponent },
  { path: 'results', component: ResultsComponent, canActivate: [quizGuard]},
  { path: '**', component: QuizComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
