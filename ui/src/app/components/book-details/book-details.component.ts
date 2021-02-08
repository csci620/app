import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-details',
  template: `
  <div style="width: 400px; margin: auto;">
  <div *ngIf="currentBook" class="edit-form">
    <h4>Book</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          class="form-control"
          id="title"
          [(ngModel)]="currentBook.title"
          name="title"
        />
      </div>
      <div class="form-group">
        <label for="author">Author</label>
        <input
          type="text"
          class="form-control"
          id="author"
          [(ngModel)]="currentBook.author"
          name="author"
        />
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          id="description"
          [(ngModel)]="currentBook.description"
          name="description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentBook.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
      class="badge badge-primary mr-2"
      *ngIf="currentBook.published"
      (click)="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      *ngIf="!currentBook.published"
      class="badge badge-primary mr-2"
      (click)="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" (click)="deleteBook()">
      Delete
    </button>

    <button
      type="submit"
      class="badge badge-success"
      (click)="updateBook()"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div *ngIf="!currentBook">
    <br />
    <p>Cannot access this Book...</p>
  </div>
</div>  `,
  styles: [
  ]
})
export class BookDetailsComponent implements OnInit {
  currentBook = null;
  message = '';

  constructor(
    private bookService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  getBook(id): void {
    this.bookService.get(id)
      .subscribe(
        data => {
          this.currentBook = data;
          console.log(data);
        },
        error => {
          console.log(error);
        });
  }

  updatePublished(status): void {
    const data = {
      title: this.currentBook.title,
      description: this.currentBook.description,
      published: status
    };

    this.bookService.update(this.currentBook._id, data)
      .subscribe(
        response => {
          this.currentBook.published = status;
          console.log(response);
        },
        error => {
          console.log(error);
        });
  }

  updateBook(): void {
    this.bookService.update(this.currentBook._id, this.currentBook)
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The book was updated successfully!';
        },
        error => {
          console.log(error);
        });
  }

  deleteBook(): void {
    this.bookService.delete(this.currentBook._id)
      .subscribe(
        response => {
          console.log(response);
          this.router.navigate(['/books']);
        },
        error => {
          console.log(error);
        });
  }
}