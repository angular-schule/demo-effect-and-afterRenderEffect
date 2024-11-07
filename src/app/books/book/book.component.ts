import { Component, computed, input, linkedSignal, output } from '@angular/core';

import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  book = input.required<Book>();
  ratingChange = output<{ isbn: string, newRating: number }>();

  title = computed(() => this.book().title);

  rating = linkedSignal({
    source: this.book,
    computation: book => book.rating,
  });

  // this also works:
  // rating = linkedSignal(() => this.book().rating);

  doRateUp() {
    const newRating = this.rating() + 1;
    this.rating.set(newRating);

    this.ratingChange.emit({
      isbn: this.book().isbn,
      newRating
    });
  }

  doRateDown() {
    const newRating = this.rating() - 1;
    this.rating.set(newRating);

    this.ratingChange.emit({
      isbn: this.book().isbn,
      newRating
    });
  }
}
