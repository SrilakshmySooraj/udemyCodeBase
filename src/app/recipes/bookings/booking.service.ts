import { Injectable } from '@angular/core';
import { Booking } from './booking.model';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { take, tap, delay } from 'rxjs/operators';
import { IonItemSliding } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  constructor(private authService:AuthService,private bookingService:BookingService) { }

  private _bookings = new BehaviorSubject<Booking[]>([]);

  addBooking(placeId:string,
    title:string,
    imageUrl:string,
    firstName:string,
    lastName:string,
    guestNumber:number,
    available:Date,
    to:Date) {
      const newBooking = new Booking(Math.random().toString(),placeId,this.authService.userId,title,imageUrl,firstName,lastName,guestNumber,available,to);
     return  this._bookings.pipe(take(1),
      delay(1000),
      tap(bookings => {
        this._bookings.next(bookings.concat(newBooking));
      }))
  }

  cancelBooking(id:string) {
    return this._bookings.pipe(take(1), delay(1000), tap(booking => {
      this._bookings.next(booking.filter(b=> b.id !== id));
    }))
  }

  get Bookings() {
    return this._bookings.asObservable();
  }
  

}
