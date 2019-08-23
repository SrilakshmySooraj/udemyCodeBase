import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController, ModalController, ActionSheetController, LoadingController } from '@ionic/angular';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';
import { CreateBookingComponent } from 'src/app/recipes/bookings/create-booking/create-booking.component';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/recipes/bookings/booking.service';
import { AuthService } from 'src/app/recipes/auth/auth.service';

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
  isbookable = false;
  placesDetail : Places;
  private placeSub : Subscription;

  constructor(private route:ActivatedRoute, 
    private placesService: PlacesService,
    private mdalCtrl : ModalController,
    private actionSheet:ActionSheetController,private bookingService: BookingService,
    private loadingControl:LoadingController,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (! paramMap.has('placeId')){
        return ;
      }
      this.placeSub = this.placesService.retrive(paramMap.get('placeId')).subscribe(places => {
        this.placesDetail = places;
        this.isbookable = places.userId !== this.authservice.userId;
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
    this.mdalCtrl.create({component : CreateBookingComponent, componentProps : {selectedPlace : this.placesDetail }} ).then(modalEl => {
         modalEl.present();
          return modalEl.onDidDismiss();
        })
        .then(resultData => {
          if(resultData.role == 'confirm'){
            this.loadingControl.create({ message:'Creating a new Booking' }).then( loadingEl =>{
              loadingEl.present();
              const data = resultData.data.bookingData;
              this.bookingService.addBooking(this.placesDetail.id,
                this.placesDetail.title,
                this.placesDetail.imageUrl,
                data.firstName,
                data.lastName,
                data.guestNumber,
                data.startDate,
                data.endDate)
                .subscribe(() => {
                  loadingEl.dismiss();
                });
            })
          }
        });
      
  }
}
