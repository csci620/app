import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div>
  <nav class="navbar navbar-expand navbar-dark bg-dark">
    <a href="#" class="navbar-brand">Home</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <a routerLink="books" class="nav-link">List</a>
      </li>
      <li class="nav-item">
        <a routerLink="add" class="nav-link">Add</a>
      </li>
    </div>
  </nav>

  <div class="container mt-3">
    <router-outlet></router-outlet>
  </div>
</div>
  `,
  styles: []
})
export class AppComponent {
  title = 'My Books Application';
}
