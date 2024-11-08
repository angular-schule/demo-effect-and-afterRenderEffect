import { Component, inject, linkedSignal } from '@angular/core';

import { BookComponent } from '../book/book.component';
import { BookStoreService } from '../shared/book-store.service';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'dashboard.component.html',
  imports: [BookComponent]
})
export class DashboardComponent {
  private bookStore = inject(BookStoreService);

  booksResource = rxResource({
    loader: () => this.bookStore.getAllBooks()
  });
}
