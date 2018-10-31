import { BookAndCdServices } from './../../sevices/collection.service';
import { LendBookPage } from '../lend-book/lend-book';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuController, ModalController, LoadingController} from 'ionic-angular';
import { Collection } from '../../models/Collection';
import { Subscription } from 'rxjs/Subscription';

/**
 * Generated class for the BookListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-book-list',
  templateUrl: 'book-list.html',
})

export class BookListPage implements OnInit, OnDestroy {

  bookList: Collection[];
  bookSubscription: Subscription;
 

  constructor(
    public menuCtrl: MenuController,
    public modalCtrl: ModalController,
    public bookService: BookAndCdServices,
    public loadingCtrl: LoadingController
    ) {
  }

  ngOnInit(){
    this.bookList = this.bookService.bookList.slice();
    
    this.bookSubscription = this.bookService.book$.subscribe(
      (books: Collection[]) =>{
        this.bookList = books.slice();
      }
    );
    
    this.onFetchList(); 

  }

  onToggleMenu() {
    this.menuCtrl.open();
  }

  openModal(index: number) {
    let modal = this.modalCtrl.create(LendBookPage, { index: index });
    modal.present();
  }

  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.bookService.retrieveData().then(
      () => {
        loader.dismiss();
      },
      (error) => {
        loader.dismiss();
      }
    );
  }

  ngOnDestroy(){
    this.bookSubscription.unsubscribe();
  }

}
