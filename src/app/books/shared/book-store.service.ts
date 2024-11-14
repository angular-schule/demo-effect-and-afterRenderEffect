import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Book } from './book';

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  http = inject(HttpClient);

  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('https://api.angular.schule/books').pipe(
      map(x => x.slice(0,3))
    );
  }

  getSingleBook(isbn: string): Observable<Book> {
    return this.http.get<Book>(`https://api.angular.schule/books/${isbn}`);
  }
}
