import { Component, inject, linkedSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { BookStoreService } from '../shared/book-store.service';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  imports: [BookComponent]
})
export class DashboardComponent {
  private bookStore = inject(BookStoreService);

  books = linkedSignal(
    toSignal(this.bookStore.getAllBooks(), { initialValue: [] })
  );

  changeOrder() {
    this.books.update(books => books.toReversed());
  }

  handleRatingChange(isbn: string, newRating: number) {
    this.books.update(books =>
      books.map(b => {
        // if this is the book we want to update, set the new rating
        if (b.isbn === isbn) {
          return { ...b, rating: newRating };
        } else {
          // leave all other books in the list unchanged
          return b;
        }
      })
    );
  }
}
