import { Component, OnInit, OnDestroy } from '@angular/core';
import { BookingService } from './booking.service';
import { Booking } from './booking.model';
import { Subscription } from 'rxjs';
import { IonItemSliding, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.page.html',
  styleUrls: ['./bookings.page.scss'],
})
export class BookingsPage implements OnInit,OnDestroy {
  
  ngOnDestroy(): void {
    if(this.bookingSub){
      this.bookingSub.unsubscribe();
    }
  }
  
  bookings : Booking[];
  private bookingSub : Subscription
  constructor(private bookService: BookingService,private loadingCtrl:LoadingController) { }

  ngOnInit() {
    this.bookingSub = this.bookService.Bookings.subscribe(bookings =>{
      this.bookings = bookings;
    });
  }

  cancel(id:string,slidingEl:IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({message:'Cancelling the booking'}).then(loadinEl => {
      loadinEl.present();
      this.bookService.cancelBooking(id).subscribe(
        () => {
          loadinEl.dismiss();
        }
      );

    })
  }

}
