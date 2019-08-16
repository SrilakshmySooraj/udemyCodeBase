import { Component, OnInit } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit {
  bookings : Booking[];
  constructor(private bookService: BookingService) { }

  ngOnInit() {
    this.bookings = this.bookService.Bookings;
  }

  cancel(id){
    console.log("Cancelling id : " +id);
  }

}
