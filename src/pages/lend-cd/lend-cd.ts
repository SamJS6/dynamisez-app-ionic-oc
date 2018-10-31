import { BookAndCdServices } from './../../sevices/collection.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Collection } from '../../models/Collection';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the LendCdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-lend-cd',
  templateUrl: 'lend-cd.html',
})
export class LendCdPage implements OnInit {

  cdForm: FormGroup;
  name: string;
  index: number;
  cd: Collection;

  constructor(
    public navParams: NavParams,
    public navCtrl: NavController,  
    public cdService: BookAndCdServices,
    public toastCtrl: ToastController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController
    ) { }

  ngOnInit() {
    this.index = this.navParams.get('index');
    this.cd = this.cdService.cdList[this.index];
    this.initForm();
  }

  close() {
    this.navCtrl.pop();
  }

  onToggleCd(position:string) {
    this.cd.isLend = !this.cd.isLend;
    let cdIsLend = this.cd.isLend === true ? 'prêté' : 'rendu'
    let toast = this.toastCtrl.create({
      message:`Le Cd \"${this.cd.name}\" est ${cdIsLend}`,
      duration: 2000,
      position: position
    });
  
    toast.present(toast);
    this.onSaveList();
    this.navCtrl.pop();
  }

  initForm() {
    this.cdForm = this.formBuilder.group({
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
    this.cdService.saveDataCD().then(
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
    this.cdService.retrieveDataCD().then(
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
    this.cdForm.reset();
  }

}
