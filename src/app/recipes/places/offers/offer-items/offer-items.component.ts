import { Component, OnInit, Input } from '@angular/core';
import { Places } from '../../places.model';

@Component({
  selector: 'app-offer-items',
  templateUrl: './offer-items.component.html',
  styleUrls: ['./offer-items.component.scss'],
})
export class OfferItemsComponent implements OnInit {
  @Input() place: Places;

  constructor() { }

  ngOnInit() {
    console.log('inside offer item');
  }

}
