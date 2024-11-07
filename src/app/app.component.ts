import { Component, signal } from '@angular/core';

import { BookListComponent } from './books/book-list.component';
import { DashboardComponent } from './books/dashboard/dashboard.component';
import { Book } from './books/shared/book';
import { ShoppingCartComponent } from './books/shopping-cart.component';

const sampleBooks: Book[] = [
  {
    isbn: '123',
    title: 'Angular',
    description: 'The big practice book – basics, advanced topics and best practices.',
    price: 36.9,
    rating: 5
  },
  {
    isbn: '456',
    title: 'Vue.js',
    description: 'The green framework',
    price: 32.9,
    rating: 3
  }
];

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [DashboardComponent, BookListComponent, ShoppingCartComponent]
})
export class AppComponent {
  title = 'Book Rating';

  // for the ShoppingCartComponent example
  selectedBook = signal<Book>(sampleBooks[0]);  
  toggleBook() {
    this.selectedBook.update(b => b === sampleBooks[0] ? sampleBooks[1] : sampleBooks[0]);
  }
}
