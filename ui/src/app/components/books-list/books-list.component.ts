import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-books-list',
  template: `
    <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title"
          [(ngModel)]="title"
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary"
            type="button"
            (click)="searchTitle()"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Books List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          *ngFor="let book of books; let i = index"
          [class.active]="i == currentIndex"
          (click)="setActiveBook(book, i)"
        >
          {{ book.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" (click)="removeAllBooks()">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div *ngIf="currentBook">
        <h4>Book</h4>
        <div>
          <label><strong>Title:</strong></label> {{ currentBook.title }}
        </div>
        <div>
          <label><strong>Description:</strong></label>
          {{ currentBook.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentBook.published ? "Published" : "Pending" }}
        </div>

        <a class="badge badge-warning" routerLink="/books/{{ currentBook._id }}">
          Edit
        </a>
      </div>

      <div *ngIf="!currentBook">
        <br />
        <p>Please click on a Book...</p>
      </div>
    </div>
  </div>
  `,
  styles: [
  ]
})
export class BooksListComponent implements OnInit {

  books: any;
  currentBook = null;
  currentIndex = -1;
  title = '';

  constructor(private bookService: BooksService) { }

  ngOnInit(): void {
    this.retrieveBooks();
  }

  retrieveBooks(): void {
    this.bookService.getAll()
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  refreshList(): void {
    this.retrieveBooks();
    this.currentBook = null;
    this.currentIndex = -1;
  }

  setActiveBook(book, index): void {
    this.currentBook = book;
    this.currentIndex = index;
  }

  removeAllBooks(): void {
    this.bookService.deleteAll()
      .subscribe(
        response => {
          console.log(response);
          this.retrieveBooks();
        },
        error => {
          console.log(error);
        });
  }

  searchTitle(): void {
    this.bookService.findByTitle(this.title)
      .subscribe(
        data => {
          this.books = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

}
