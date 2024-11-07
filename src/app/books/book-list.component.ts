import { Component, linkedSignal, signal } from '@angular/core';

@Component({
  selector: 'app-book-list',
  template: `
    <p>First book in list: {{ firstBook() }}</p>
    <button (click)="changeBookList()" class="btn btn-primary">Change Book List</button>
  `,
})
export class BookListComponent {
  books = signal(['Angular', 'React', 'Vue']);

  firstBook = linkedSignal({
    source: this.books,
    computation: books => books[0]
  });

  // this also works (shorthand version)
  // firstBook = linkedSignal(() => this.books()[0]);

  overrideFirstBook() {
    // Manually updating `firstBook`, which now returns 'jQuery'
    this.firstBook.set('jQuery');
  }

  changeBookList() {
    // Changing `books` causes `firstBook` to reset, now returning 'Next.js'
    this.books.set(['Next.js', 'Svelte', 'Nuxt']);
  }
}
