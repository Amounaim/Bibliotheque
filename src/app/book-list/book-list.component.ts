import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BooksService } from '../services/books.service';
import { Router } from '@angular/router';
//import "datatables.net";
declare var $;
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit, OnDestroy {

  //DataTable

  //DataTable

  books: Book[];
  booksSubscription: Subscription;

  constructor(private booksService: BooksService, private router: Router) {}

  ngOnInit() {
    this.booksSubscription = this.booksService.booksSubject.subscribe(
      (books: Book[]) => {
        this.books = books;
      }
    );
    this.booksService.emitBooks();

    //DataTable
    
    //DataTable
  }

  onNewBook() {
    this.router.navigate(['/books', 'new']);
  }

  onDeleteBook(book: Book) {
    if(confirm('Etes-vous sûr de vouloir supprimer ce book la ?')) {
      this.booksService.removeBook(book);
    } else {
      return null;
    }

  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'view', id]);
  }
  updateBook(id: number){
    this.router.navigate(['/books', 'update', id]);
  }
  
  ngOnDestroy() {
    this.booksSubscription.unsubscribe();
  }

}
