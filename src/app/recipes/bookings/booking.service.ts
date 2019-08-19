import { Injectable } from '@angular/core';
import { Booking } from './booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private booking: Booking [] = [
     // tslint:disable-next-line: max-line-length
     new Booking('xyz', 'p1',  'abc', 'Manhatten', 2),
  ];

  get Bookings() {
    return [...this.booking];
  }
  
  constructor() { }
  
  retrive(id: string){
    console.log(id);
    return {...this.booking.find(p => p.id === id)};
  }

}
