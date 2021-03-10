import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styles: [`
    h4 {
      color: red;
    }
  `
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
