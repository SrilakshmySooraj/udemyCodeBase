import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlacesService } from '../places.service';
import { Places } from '../places.model';
import { MenuController, IonItemSliding, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit, OnDestroy {
  
  ngOnDestroy(): void {
    if(this.placesSub){
      this.placesSub.unsubscribe();
    }
  }
  loadedOffers: Places[];
  private placesSub : Subscription;
  
  constructor(private placeService: PlacesService,private menuCtrl:MenuController, private router: Router,private loadingCtrl:LoadingController) { }

  ngOnInit() {
     this.placesSub = this.placeService.Places.subscribe(places =>{ 
      this.loadedOffers = places;
    });
  }

  ionViewWillEnter() {
    this.loadingCtrl.create({message:'Fetching places ...'}).then(loadingEl => {
      loadingEl.present();
      this.placeService.fetchPlaces().subscribe( () => {
        this.loadingCtrl.dismiss();
      });
    })
   
  }

  openMenu() {
    this.menuCtrl.toggle();
  }

  onEdit(id:string,slidingItem :IonItemSliding){
    slidingItem.close();
    this.router.navigate(['/', 'places', 'tabs', 'offers', 'edit', id]);
  }
}
