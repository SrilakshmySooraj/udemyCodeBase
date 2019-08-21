import { Injectable } from '@angular/core';
import { Places } from './places.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { take, map, tap, delay } from 'rxjs/operators';


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
  
  constructor(private authservice: AuthService) { }
  
  retrive(id: string){
    return this.places.pipe(take(1),map(places => {
      return {...places.find(p => p.id === id)}
    }));
  }

  addPlace(title: string, description : string, price:number, DateFrom:Date, DateTo: Date){
    const newPlace = new Places(Math.random().toString(),title,description,
    'https://s19623.pcdn.co/wp-content/uploads/2018/01/new-york-film-locations.jpg',
    price,DateFrom,DateTo,this.authservice.userId);
    
    return this.places.pipe(take(1),tap(places => {
      setTimeout(() => {
        this.places.next(places.concat(newPlace));
      },1000);
    }));
  }

  updatePlace(title:string,description:string){
    
  }
}
