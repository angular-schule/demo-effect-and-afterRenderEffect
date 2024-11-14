import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { BookFormComponent } from '../book-form/book-form.component';
import { BookComponent } from '../book/book.component';
import { Book } from '../shared/book';
import { BookStoreService } from '../shared/book-store.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  imports: [BookFormComponent, BookComponent]
})
export class DashboardComponent {
  private bookStore = inject(BookStoreService);

  booksResource = rxResource({
    loader: () => this.bookStore.getAllBooks()
  });

  currentBook = signal<Book | undefined>(undefined);

  changeToEditMode(book: Book) {
    this.currentBook.set(book)
  }

  addBook(newBook: Book) {
    this.booksResource.value.update(books => [...(books || []), newBook]);
    this.currentBook.set(undefined);
  }

  changeBook(changedBook: Book) {
    this.booksResource.value.update(books => (books || [])
      .map(b => b.isbn === changedBook.isbn ? changedBook : b));

    this.currentBook.set(undefined);
  }
}
