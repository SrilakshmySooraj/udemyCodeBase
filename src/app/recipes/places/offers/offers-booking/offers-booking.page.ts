import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers-booking',
  templateUrl: './offers-booking.page.html',
  styleUrls: ['./offers-booking.page.scss'],
})
export class OffersBookingPage implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }
  place : Places;
  private placeSub :Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private navCtrl: NavController,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    if(this.route.snapshot.paramMap.get('placeId')){
      this.placeSub = this.placesService.retrive(this.route.snapshot.paramMap.get('placeId')).subscribe(place=>{
        this.place = place;
      });
      console.log(this.place);
    }else{
      this.navCtrl.navigateBack('/places/tabs/offers');
    }
    console.log(this.place);
  }

}
