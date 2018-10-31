import { Collection } from './../models/Collection';
import { Subject } from 'rxjs/Subject';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import DataSnapshot = firebase.database.DataSnapshot

@Injectable()
export class BookAndCdServices {

  book$ = new Subject<Collection[]>();
  cd$ = new Subject<Collection[]>();

  bookList: Collection[] = [
    {
      name: "Le Bruit et la Fureur",
      description: "Le Bruit et la Fureur est le quatrième roman de l'auteur américain William Faulkner, publié en 1929.",
      isLend: false,
      username: ''
    },
    {
      name: "Madame Bovary",
      description: "Madame Bovary. Mœurs de province, couramment abrégé en Madame Bovary, est un roman réaliste de Gustave Flaubert paru en 1857 chez Michel Lévy frères, après une préparution en 1856 dans le journal La Revue de Paris",
      isLend: false,
      username: '',
    },
    {
      name: "Éducation",
      description: "L'éducation est, étymologiquement de « guider hors de », c'est-à-dire développer, faire produire. Il signifie maintenant plus couramment l'apprentissage",
      isLend: false,
      username: ''
    }
  ];

  cdList: Collection[] = [
    {
      name: "Amigo",
      description: "Kendji Girac.",
      username: '',
      isLend: false
    },
    {
      name: "Mi Corazon",
      description: "Multi-Artistes",
      username: '',
      isLend: false
    },
    {
      name: "Je me dis que toi aussi",
      description: "Boulevard des Airs",
      username: '',
      isLend: false
    }
  ];

  addBooks(book: Collection){
    this.bookList.push(book);
    console.log("book",book.username)
    this.emitBooks();
  }

  emitBooks() {
    this.book$.next(this.bookList.slice());
    console.log("book",this.bookList.slice())
  }

  saveData(){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('books').set(this.bookList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  retrieveData(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('books').once('value').then(
        (data: DataSnapshot) => {
          this.bookList = data.val();
          this.emitBooks();
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }

  addCd(cd: Collection){
    this.cdList.push(cd);
    console.log("cd",cd.username)
    this.emitCds();
  }


  emitCds() {
    this.cd$.next(this.cdList.slice());
  }

  saveDataCD(){
    return new Promise((resolve, reject)=>{
      firebase.database().ref('cd').set(this.cdList).then(
        (data: DataSnapshot) => {
          resolve(data);
        },
        (error) => {
          reject(error);
        }
      );
    })
  }

  retrieveDataCD(){
    return new Promise((resolve, reject) => {
      firebase.database().ref('cd').once('value').then(
        (data: DataSnapshot) => {
          this.cdList = data.val();
          if(this.cdList !=null){this.emitCds()}
          //this.emitCds();          
          resolve('Données récupérées avec succès !');
        }, (error) => {
          reject(error);
        }
      );
    });
  }


}

