import { Component, OnInit, Input } from '@angular/core';
import { Places } from '../../places/places.model';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.scss'],
})
export class CreateBookingComponent implements OnInit {

  @Input() selectedPlace : Places;
  @Input() selectedMode : 'select' | 'random';
  startDate: string;
  endDate: string;
  constructor(private modal:ModalController) { }

  ngOnInit() {
    const available = new Date(this.selectedPlace.available);
    const to = new Date(this.selectedPlace.to);
    if(this.selectedMode == 'random'){
      this.startDate = new Date(available.getTime() + Math.random() * (to.getTime() - 7*24*60*60*1000 - available.getTime())).toISOString();
      this.endDate = new Date(new Date(this.startDate).getTime() + Math.random() * (new Date(this.startDate).getTime() + 6*24*60*60*1000 - new Date(this.startDate).getTime())).toISOString();
    }
  }

  book() {
    this.modal.dismiss({message : "This is a dummy message"}, "Confirm");
  }

  cancel() {
    this.modal.dismiss(null, "Cancel");
  }

  onBookPlace(){
    console.log('asdas')
  }
}
