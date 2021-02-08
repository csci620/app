import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  template: `
  <div style="width: 400px; margin: auto;">
  <div class="submit-form">
    <div *ngIf="!submitted">
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          [(ngModel)]="book.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input
          type="text"
          class="form-control"
          id="author"
          required
          [(ngModel)]="book.author"
          name="author"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          [(ngModel)]="book.description"
          name="description"
        />
      </div>
      <div class="form-group">
        <label for="published">Published</label>
        <input
          type="checkbox"
          class="form-control"
          id="published"
          [(ngModel)]="book.published"
          name="published"
        />
      </div>

      <button (click)="saveBook()" class="btn btn-success">Submit</button>
    </div>

    <div *ngIf="submitted">
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" (click)="newBook()">Add</button>
    </div>
  </div>
</div>
  `,
  styles: [
  ]
})
export class AddBookComponent implements OnInit {

  book = {
    title: '',
    description: '',
    author: '',
    published: false
  };
  submitted = false;

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
  }

  saveBook(): void {
    const data = {
      title: this.book.title,
      description: this.book.description,
      author: this.book.author,
      published: this.book.published
    };

    this.bookService.create(data)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
        },
        error => {
          console.log(error);
        });
  }

  newBook(): void {
    this.submitted = false;
    this.book = {
      title: '',
      description: '',
      author: '',
      published: false
    };
  }

}
