import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BooksService } from 'src/app/services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-book-update',
  templateUrl: './book-update.component.html',
  styleUrls: ['./book-update.component.scss']
})
export class BookUpdateComponent implements OnInit {

  bookForm: FormGroup;
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;
  book : Book ;
  
  constructor(private formBuilder: FormBuilder, private booksService: BooksService
    ,private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.initForm();
  }
  
  initForm() {
    //return the book
    this.book = new Book('', '');
    const id = this.route.snapshot.params['id'];
    this.booksService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );
      //remplir le formulaire
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      price : 0 ,
      synopsis:'' 
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const author = this.bookForm.get('author').value;
    const price = this.bookForm.get('price').value;
    const synopsis = this.bookForm.get('synopsis').value;
    const newBook = new Book(title, author);
    newBook.price =price ;
    newBook.synopsis = synopsis;
    if(this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }else if(this.book.photo!=null){
      newBook.photo = this.book.photo ;
    }
    const id = this.route.snapshot.params['id'];
    this.booksService.updateBook(id,newBook);
    this.router.navigate(['/books']);
  }

  // la méthode qui déclenchera  uploadFile()  et qui en récupérera l'URL
  onUploadFile(file: File) {
    this.fileIsUploading = true; 
    this.booksService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      });//pour désactiver le bouton  submit  du template pendant le chargement du fichier afin d'éviter toute erreur
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }


}
