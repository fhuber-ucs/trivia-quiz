import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const quizGuard: CanActivateFn = () => {
  const router = inject(Router);
  return (router.getCurrentNavigation()?.extras.state && router.getCurrentNavigation()?.extras.state!['quiz']) ? true : router.parseUrl('');
};
