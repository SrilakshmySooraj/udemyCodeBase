import { Component, OnInit, OnDestroy } from '@angular/core';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  
  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

  loadedPlaces: Places[];
  listedloadedPlaces: Places[];
  private placesSub : Subscription
  constructor(private placesService: PlacesService) { }

  ngOnInit() {
    
    this.placesSub = this.placesService.Places.subscribe(places => {
      this.loadedPlaces = places;
      this.listedloadedPlaces = this.loadedPlaces.slice(1);
    })
  }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }
}
