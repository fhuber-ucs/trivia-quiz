import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {TriviaQuestion} from "../trivia.service";

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
})
export class ResultsComponent implements OnInit {
  quiz: TriviaQuestion[] = [];
  numberOfCorrectAnswers = 0;
  resultsClass = "";
  resultsText = "";

  constructor(
    private router: Router
  ) {
    this.quiz = router.getCurrentNavigation()?.extras?.state!['quiz'];
  }

  ngOnInit() {
    for (const question of this.quiz) {
      if (question.selectedAnswer === question.correct_answer) {
        this.numberOfCorrectAnswers++;
      }
    }
    this.resultsText = "You scored " + this.numberOfCorrectAnswers + " out of 5";
    if (this.numberOfCorrectAnswers < 2) {
      this.resultsClass = "bg-danger text-white text-center";
    } else if (this.numberOfCorrectAnswers < 4) {
      this.resultsClass = "bg-warning text-white text-center";
    } else{
      this.resultsClass = "bg-success text-white text-center";
    }
  }


  getButtonClass(question: TriviaQuestion, answer: string) {
    if (answer != question.correct_answer && answer === question.selectedAnswer) {
      return "inactive btn btn-danger"
    } else if (answer === question.correct_answer) {
    return "inactive btn btn-success"
    } else {
      return "inactive btn btn-outline-primary"
    }
  }

  goBackToCategorySelection() {
    this.router.navigate(["/"])
  }
}
