import { Component, OnInit, OnDestroy } from '@angular/core';
import { Places } from '../places.model';
import { PlacesService } from '../places.service';
import { SegmentChangeEventDetail } from '@ionic/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit,OnDestroy {
  
  private choosenFilter='all' ;

  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }

  loadedPlaces: Places[];
  listedloadedPlaces: Places[];
  relevantPlaces: Places[];
  private placesSub : Subscription
  constructor(private placesService: PlacesService,private authservice:AuthService) { }

  ngOnInit() {
    
    this.placesSub = this.placesService.Places.subscribe(places => {
      this.loadedPlaces = places;
      if (this.choosenFilter === 'all') {
        this.relevantPlaces = this.loadedPlaces;
        this.listedloadedPlaces = this.relevantPlaces.slice(1);
      }else{
        this.relevantPlaces = this.loadedPlaces.filter(
          place => place.userId !== this.authservice.userId
        );
        this.listedloadedPlaces = this.relevantPlaces.slice(1);
      }
    })
  }


  onFilterUpdate(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
    if(event.detail.value =='all'){
      this.relevantPlaces = this.loadedPlaces;
      this.listedloadedPlaces = this.relevantPlaces.slice(1);
      this.choosenFilter == 'all';
    }else{
      this.relevantPlaces = this.loadedPlaces.filter(place=> {
        place.userId !== this.authservice.userId
      });
      this.listedloadedPlaces = this.relevantPlaces.slice(1);
      this.choosenFilter == 'bookable';
    }
  }
}
