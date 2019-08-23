import { Injectable } from '@angular/core';
import { Places } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';
import {  HttpClient } from '@angular/common/http';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

interface PlaceData {
  available: string;
  description: string;
  imageUrl: string;
  price: number;
  title: string;
  to: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  private places = new BehaviorSubject<Places[]>([
    new Places(
      'p1',
      'Manhattan Mansion',
      'In the heart of New York City.',
      'https://lonelyplanetimages.imgix.net/mastheads/GettyImages-538096543_medium.jpg?sharp=10&vib=20&w=1200',
      149.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Places(
      'p2',
      'L Amour Toujours',
      'A romantic place in Paris!',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Paris_Night.jpg/1024px-Paris_Night.jpg',
      189.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    ),
    new Places(
      'p3',
      'The Foggy Palace',
      'Not your average city trip!',
      'https://upload.wikimedia.org/wikipedia/commons/0/01/San_Francisco_with_two_bridges_and_the_fog.jpg',
      99.99,
      new Date('2019-01-01'),
      new Date('2019-12-31'),
      'abc'
    )
  ]);

  get Places() {
    return this.places.asObservable();
  }
  
  constructor(private authservice: AuthService,private httpclient:HttpClient) { }
  
  retrive(id: string){

    return this.httpclient.get<PlaceData>(`https://ionic-angular-c2176.firebaseio.com/offered-places/${id}.json`).pipe(
      map(resData => {
        return new Places(id,resData.title,
          resData.description,
          resData.imageUrl,
          resData.price,
          new Date(resData.available),
          new Date(resData.to),
          resData.userId)
      })
    )

    // return this.places.pipe(take(1),map(places => {
    //   return {...places.find(p => p.id === id)}
    // }));
  }

  fetchPlaces(){
    return this.httpclient.get<{[key:string] : PlaceData}>('https://ionic-angular-c2176.firebaseio.com/offered-places.json'
    ).pipe(map( resData => {
      const placeData = []; 
      for(const key in resData){
        if(resData.hasOwnProperty(key)) {
          placeData.push(new Places(key, 
            resData[key].title,
            resData[key].description,
            resData[key].imageUrl,
            resData[key].price,
            new Date(resData[key].available),
            new Date(resData[key].to),
            resData[key].userId)
        );
        }
      }
      return placeData;
    }),
    tap(places => {
      this.places.next(places);
    })
    );
  }

  addPlace(title: string, description : string, price:number, DateFrom:Date, DateTo: Date){
    let generatedId : string;
    const newPlace = new Places(Math.random().toString(),title,description,
    'https://s19623.pcdn.co/wp-content/uploads/2018/01/new-york-film-locations.jpg',
    price,DateFrom,DateTo,this.authservice.userId);
    return this.httpclient.post<{name:string}>('https://ionic-angular-c2176.firebaseio.com/offered-places.json',{... newPlace,id:null})
    .pipe(
     switchMap(resData => {
       generatedId = resData.name;
       return this.places
     }),
     take(1),
     tap(places => {
       newPlace.id == generatedId;
       this.places.next(places.concat(newPlace));
     })
    )
  }

  updatePlace(id:string,title:string,description:string){
    let updatedPlace : Places [];
    return this.places.pipe(take(1), switchMap(places => {
      const updatePlaceIndex = places.findIndex(upPlace => 
      upPlace.id === id);
      updatedPlace = [...places] ;
      const oldPlace = updatedPlace[updatePlaceIndex];
      updatedPlace[updatePlaceIndex] = new Places(oldPlace.id,
        title,
        description,
        oldPlace.
        imageUrl,
        oldPlace.price,oldPlace.available,oldPlace.to,oldPlace.userId);
        return this.httpclient.put(`https://ionic-angular-c2176.firebaseio.com/offered-places/${id}.json` , {...updatedPlace[updatePlaceIndex], id : null});
      }),tap (() => {
        this.places.next(updatedPlace);
      }));
  }
}
