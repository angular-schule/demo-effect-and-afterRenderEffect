import { Component, input, linkedSignal } from '@angular/core';

import { Book } from './shared/book';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shopping-cart',
  template: `
    <p>Book: {{ selectedBook().title }}</p>
    <input [(ngModel)]="amount">`,
  imports: [FormsModule]
})
export class ShoppingCartComponent {
  selectedBook = input.required<Book>();
  amount = linkedSignal({
    source: this.selectedBook,
    computation: () => 1 // Resets to 1 when selectedBook changes
  });
}
