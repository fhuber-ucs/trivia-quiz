import { Component, OnInit } from '@angular/core';
import {TriviaCategory, TriviaQuestion, TriviaService} from '../trivia.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from "@angular/router";
import {from, map, Observable} from "rxjs";

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  categories$: Observable<TriviaCategory[]> = from([]);
  difficulties = ['easy', 'medium', 'hard'];
  quiz$: Observable<TriviaQuestion[]> = from([]);

  form = new FormGroup({
    category: new FormControl<number | null>(null, Validators.required),
    difficulty: new FormControl<string | null>(null, Validators.required),
  });

  allAnswersSelected = false;

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
    this.categories$ = this.triviaService
      .getCategories()
      .pipe(
        map(response => {
          return response.trivia_categories
        }));
  }

  onSubmitSelectQuiz() {
    this.quiz$ = this.triviaService.getQuiz(this.form?.get("category")?.value!, this.form.get("difficulty")?.value!);
  }

  onSubmitQuizAnswers(quiz: TriviaQuestion[]) {
    this.router.navigate(['/results'], {state: {quiz:quiz}})
  }

  selectAnswer(answerToSelect: number, question: TriviaQuestion, quiz: TriviaQuestion[]) {
      question.selectedAnswer = question.all_answers[answerToSelect];
      this.checkAllAnswersSelected(quiz);
  }

  checkAllAnswersSelected(quiz: TriviaQuestion[]) {
    for (let question of quiz) {
      if (question.selectedAnswer === "") {
        return;
      }
    }
    this.allAnswersSelected = true;
  }

}
