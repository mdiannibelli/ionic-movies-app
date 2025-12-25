import { Component, inject, Input, signal } from '@angular/core';
import { MovieApiResponse } from '../shared/interfaces/movies-response.interfaces';
import { MoviesService } from '../shared/services/movies.service';
import {
  IonIcon,
  IonItem,
  IonAvatar,
  IonLabel,
  IonHeader,
  IonToolbar,
  IonButton,
  IonBackButton,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonCardContent,
} from '@ionic/angular/standalone';
import { DatePipe } from '@angular/common';
import { addIcons } from 'ionicons';
import { arrowBack, calendarOutline, starOutline } from 'ionicons/icons';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [
    IonItem,
    IonLabel,
    DatePipe,
    IonHeader,
    IonToolbar,
    IonButton,
    IonBackButton,
    IonTitle,
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonCardContent,
    IonIcon,
  ],
  templateUrl: './details.component.html',
})
export class DetailsComponent {
  private readonly moviesService = inject(MoviesService);
  private readonly route = inject(ActivatedRoute);
  readonly imgBaseUrl = 'https://media.themoviedb.org/t/p/';
  readonly imgSize = '/w300_and_h450_face';

  readonly movie = signal<MovieApiResponse | null>(null);

  constructor() {
    addIcons({ arrowBack, calendarOutline, starOutline });

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.moviesService.getMovieDetails(id).subscribe((res) => {
        console.log(res);
        this.movie.set(res);
      });
    }
  }
}
