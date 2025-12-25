import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { finalize, Observable, tap } from 'rxjs';
import { CONFIG_CONSTANTS } from '../constants';
import { GetMoviesApiResponse, MovieApiResponse } from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private readonly http = inject(HttpClient);
  private readonly _currentPage = signal(1);
  private readonly _movies = signal<MovieApiResponse[]>([]);
  private readonly _isLoading = signal(false);
  private readonly _error = signal<string | null>(null);
  private readonly _totalPages = signal(0);

  readonly movies = computed(() => this._movies());
  readonly currentPage = computed(() => this._currentPage());
  readonly isLoading = computed(() => this._isLoading());
  readonly error = computed(() => this._error());
  readonly totalPages = computed(() => this._totalPages());

  getPopularMovies(): Observable<GetMoviesApiResponse> {
    return this.http
      .get<GetMoviesApiResponse>(
        `${CONFIG_CONSTANTS.BASE_URL}/movie/popular?api_key=${
          CONFIG_CONSTANTS.API_KEY
        }&page=${this.currentPage()}`
      )
      .pipe(
        tap((response) => {
          this._movies.set([...this._movies(), ...response.results]);
          this._totalPages.set(response.total_pages);
        }),
        finalize(() => {
          this._isLoading.set(false);
        })
      );
  }

  getMovieDetails(id: string): Observable<MovieApiResponse> {
    return this.http
      .get<MovieApiResponse>(
        `${CONFIG_CONSTANTS.BASE_URL}/movie/${id}?api_key=${CONFIG_CONSTANTS.API_KEY}`
      )
      .pipe(
        finalize(() => {
          this._isLoading.set(false);
        })
      );
  }

  setPage(page: number) {
    this._currentPage.set(page);
  }

  setIsLoading(isLoading: boolean) {
    this._isLoading.set(isLoading);
  }

  setError(error: string | null) {
    this._error.set(error);
  }

  setTotalPages(totalPages: number) {
    this._totalPages.set(totalPages);
  }
}
