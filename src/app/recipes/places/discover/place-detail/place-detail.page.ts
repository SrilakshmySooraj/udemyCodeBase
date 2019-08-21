import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController } from '@ionic/angular';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/recipes/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-place-detail',
  templateUrl: './place-detail.page.html',
  styleUrls: ['./place-detail.page.scss'],
})
export class PlaceDetailPage implements OnInit,OnDestroy {
  
  ngOnDestroy(): void {
    if(this.placeSub){
      this.placeSub.unsubscribe();
    }
  }

  placesDetail : Places;
  private placeSub : Subscription;

  constructor(private route:ActivatedRoute, 
    private placesService: PlacesService,
    private mdalCtrl : ModalController,
    private actionSheet:ActionSheetController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (! paramMap.has('placeId')){
        return ;
      }
      this.placeSub = this.placesService.retrive(paramMap.get('placeId')).subscribe(places => {
        this.placesDetail = places;
      });
    })
  }

  book() {
    this.actionSheet.create({
      header: 'Options',
      buttons : [{
        text : 'Select Date',
        handler : () => {
          this.openModal('select');
        }
      },{
        text : 'Random Date',
        handler : () => {
          this.openModal('random');
        }
      },
      {
        text : 'Cancel',
        role: 'cancel',
      }]
      }).then(action => {
      action.present();
    });  
  }

  openModal(mode: 'random' | 'select'){
    console.log(mode);
    this.mdalCtrl.create({component : CreateBookingComponent, componentProps : {selectedPlace : this.placesDetail }} ).then(modalEl => {
         modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultData => {
          console.log(resultData.data, resultData.role);
          if(resultData.role == "Confirm"){
            console.log('Booked !!');
          }
        })
  }
}
