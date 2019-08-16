import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-offers-booking',
  templateUrl: './offers-booking.page.html',
  styleUrls: ['./offers-booking.page.scss'],
})
export class OffersBookingPage implements OnInit {
  place : Places;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('placeId')){
      this.place = this.placesService.retrive(this.route.snapshot.paramMap.get('placeId'));
      console.log(this.place);
    }else{
      this.navCtrl.navigateBack('/places/tabs/offers');
    }
    console.log(this.place);
  }

}
