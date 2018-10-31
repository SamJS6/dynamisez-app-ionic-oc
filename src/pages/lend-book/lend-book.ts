import { BookAndCdServices } from './../../sevices/collection.service';
import { Collection } from './../../models/Collection';
import { Component, OnInit } from '@angular/core';
import { NavParams, NavController, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


/**
 * Generated class for the LendBookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-book',
  templateUrl: 'lend-book.html',
})
export class LendBookPage implements OnInit {

  bookForm: FormGroup;
  name: string;
  index: number;
  book: Collection;
  
  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,
    public bookService: BookAndCdServices,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.book = this.bookService.bookList[this.index];
    this.initForm();
  }

  close() {
    this.navCtrl.pop();
  }

  onToggleBook(position: string) {
    this.book.isLend = !this.book.isLend;
    let bookIsLend = this.book.isLend === true ? 'prêté' : 'rendu'
    let toast = this.toastCtrl.create({
      message: `Le livre \"${this.book.name}\" est ${bookIsLend}`,
      duration: 2000,
      position: position
    });

    toast.present(toast);
    this.onSaveList();
    //this.onFetchList();
    this.navCtrl.pop();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: this.formBuilder.array([]),
      username: ['', Validators.required]
    });
  }

  onSaveList() {
    let loader = this.loadingCtrl.create({
      content: 'Sauvegarde en cours…'
    });
    loader.present();
    this.bookService.saveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données sauvegardées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }


  onFetchList() {
    let loader = this.loadingCtrl.create({
      content: 'Récuperation en cours…'
    });
    loader.present();
    this.bookService.retrieveData().then(
      () => {
        loader.dismiss();
        this.toastCtrl.create({
          message: 'Données récupérées !',
          duration: 3000,
          position: 'bottom'
        }).present();
      },
      (error) => {
        loader.dismiss();
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }


  clearForm() {
    this.bookForm.reset();
   }

}
