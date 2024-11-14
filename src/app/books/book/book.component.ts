import { Component, input, output } from '@angular/core';

import { Book } from '../shared/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html'
})
export class BookComponent {
  book = input.required<Book>();
  edit = output<Book>();
}
