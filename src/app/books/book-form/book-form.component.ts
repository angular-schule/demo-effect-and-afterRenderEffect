import { Component, effect, input, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Book } from '../shared/book';

@Component({
  selector: 'app-book-form',
  imports: [ReactiveFormsModule],
  templateUrl: './book-form.component.html'
})
export class BookFormComponent {

  currentBook = input<Book | undefined>();

  bookForm = new FormGroup({

    isbn: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),

    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required]
    }),

    description: new FormControl('', {
      nonNullable: true
    }),

    rating: new FormControl(1, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1), Validators.max(5)]
    })
  });

  isEditMode = signal(false);

  constructor() {
    effect(() => {
      const book = this.currentBook();
      if (book) {
        this.bookForm.patchValue(book);
        this.bookForm.controls.isbn.disable();
        this.isEditMode.set(true);
      } else {
        this.bookForm.controls.isbn.enable();
        this.isEditMode.set(false);
      }
    });
  }

  create = output<Book>();
  edit = output<Book>();

  submitForm() {

    const book = this.bookForm.getRawValue();
    if (this.isEditMode()) {
      this.edit.emit(book);
    } else {
      this.create.emit(book);
    }
    this.bookForm.reset();
  }
}
