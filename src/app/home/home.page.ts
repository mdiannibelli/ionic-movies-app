import { Component, computed, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  InfiniteScrollCustomEvent,
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonAlert,
  IonLabel,
  IonBadge,
} from '@ionic/angular/standalone';
import { MoviesService } from '../shared/services/movies.service';
import { catchError, finalize, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonAvatar,
    IonSkeletonText,
    IonAlert,
    IonLabel,
    DatePipe,
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
  ],
})
export class HomePage {
  private readonly moviesService = inject(MoviesService);
  private readonly router = inject(Router);

  readonly movies = computed(() => this.moviesService.movies());
  readonly isLoading = computed(() => this.moviesService.isLoading());
  readonly error = computed(() => this.moviesService.error());

  readonly skeletonArray = Array(10).fill(0);
  readonly imgBaseUrl = 'https://media.themoviedb.org/t/p/';
  readonly imgSize = '/w300_and_h450_face';

  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    if (!event) {
      this.moviesService.setIsLoading(true);
    }

    this.moviesService
      .getPopularMovies()
      .pipe(
        finalize(() => {
          if (event) {
            event.target.complete();
          }
        }),
        catchError((error) => {
          this.moviesService.setError(error.error.status_message);
          return throwError(() => error);
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
          if (event) {
            event.target.disabled =
              this.moviesService.totalPages() <=
              this.moviesService.currentPage();
          }
        },
      });
  }

  loadMoreMovies(event: InfiniteScrollCustomEvent) {
    this.moviesService.setPage(this.moviesService.currentPage() + 1);
    this.loadMovies(event);
  }

  getDetailMovie(id: number) {
    const activeElement = document.activeElement as HTMLElement;
    if (activeElement) {
      activeElement.blur();
    }
    this.router.navigate(['/movies/details', id]);
  }
}
