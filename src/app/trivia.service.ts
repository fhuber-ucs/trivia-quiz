import { Injectable } from '@angular/core';
import {map, Observable} from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';

export interface TriviaCategoriesResponse {
  trivia_categories: TriviaCategory[];
}
export interface TriviaCategory {
  id: number,
  name: string
}

export interface TriviaQuestionsResponse {
  response_code: number,
  results: TriviaQuestion[]
}
export interface TriviaQuestion {
  category: string,
  type: string,
  difficulty: string,
  question: string,
  correct_answer: string,
  incorrect_answers: string[],
  all_answers: string[],
  selectedAnswer: string
}
@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private categoriesUrl = 'https://opentdb.com/api_category.php';
  private getQuizBaseUrl = 'https://opentdb.com/api.php';

  constructor(private http: HttpClient) {}

  getCategories(): Observable<TriviaCategoriesResponse> {
    return this.http.get<TriviaCategoriesResponse>(this.categoriesUrl);
  }

  getQuiz(category: number, difficulty: string) : Observable<TriviaQuestion[]> {
    const options = { params: new HttpParams().set('amount', 5).set('category', category).set('difficulty', difficulty).set('type', 'multiple') };
    return this.http.get<TriviaQuestionsResponse>(this.getQuizBaseUrl, options).pipe(map(result => {
      for (let question of result.results) {
        question.question = this.decodeHtml(question.question);
        question.correct_answer = this.decodeHtml(question.correct_answer);
        question.incorrect_answers = question.incorrect_answers.map(answer => {
          return this.decodeHtml(answer);
        });
        question.all_answers = this.getPossibleAnswers(question);
        question.selectedAnswer = "";
      }
      return result.results;
    }));
  }

  getPossibleAnswers(question: TriviaQuestion): string[] {
    const answers = question.incorrect_answers.concat(question.correct_answer);
    return this.shuffleArray(answers.slice(0));
  }

  shuffleArray(array: string[]){
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const current = array[i];
      array[i] = array[j];
      array[j] = current;
    }
    return array;
  }

  decodeHtml(html: string) {
    let txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  }
}
