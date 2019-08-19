import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../places.model';
import { MenuController, IonItemSliding } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  loadedOffers: Places[];

  constructor(private placeService: PlacesService,private menuCtrl:MenuController, private router: Router) { }

  ngOnInit() {
    this.loadedOffers = this.placeService.Places;
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  onEdit(id,slidingItem :IonItemSliding){
    console.log('Inside 99999');
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs' ,'offers', 'edit', id]);
    console.log('Editing the offer for ' +id);
  }
}
