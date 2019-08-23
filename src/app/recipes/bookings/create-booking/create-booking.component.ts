import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Places } from '../../places/places.model';
import { ModalController } from '@ionic/angular';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace : Places;
  @Input() selectedMode : 'select' | 'random';
  @ViewChild('f') form: NgForm;
  startDate: string;
  endDate: string;


  constructor(private modal:ModalController) { }

  ngOnInit() {
    console.log(this.selectedPlace.available);
    const available = new Date(this.selectedPlace.available);
    const to = new Date(this.selectedPlace.to);
    if(this.selectedMode == 'random'){
      this.startDate = new Date(
        available.getTime() +
          Math.random() *
            (to.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              available.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }

  book() {
    this.modal.dismiss({message : "This is a dummy message"}, "Confirm");
  }

  onCancel() {
    this.modal.dismiss(null, "Cancel");
  }

  onBookPlace(){
    if (!this.form.valid || !this.datesValid) {
      return;
    }

    this.modal.dismiss(
      {
        bookingData: {
          firstName: this.form.value['first-name'],
          lastName: this.form.value['last-name'],
          guestNumber: +this.form.value['guest-number'],
          startDate: new Date(this.form.value['date-from']),
          endDate: new Date(this.form.value['date-to'])
        }
      },
      'confirm'
    );
  }


  datesValid() {
    const startDate = new Date(this.form.value['date-from']);
    const endDate = new Date(this.form.value['date-to']);
    return endDate > startDate;
  }
}
