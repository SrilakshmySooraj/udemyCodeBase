import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlacesPage } from './places.page';

const routes: Routes = [
    {
      path : 'tabs',
      component : PlacesPage,
      children: [
        {
          path: 'discover',
          children: [
            {
              path: '',
              loadChildren: './discover/discover.module#DiscoverPageModule',
            },
            {
              path: ':placeId',
              loadChildren: './discover/place-detail/place-detail.module#PlaceDetailPageModule',
            }
          ]
        },
        {
          path: 'offers',
          children: [
            {
              path: '',
              loadChildren: './offers/offers.module#OffersPageModule'
            },
            {
              path: 'new',
              loadChildren: './offers/new-offers/new-offers.module#NewOffersPageModule'
            },
            {
              path: 'edit/:placeId',
              loadChildren: './offers/edit-offers/edit-offers.module#EditOffersPageModule'
            },
            {
              path: ':placeId',
              loadChildren: './offers/offers-booking/offers-booking.module#OffersBookingPageModule'
            }
          ]
        },
        {
          path: 'bookings',
          children: [
            {
              path: '',
              loadChildren: '../bookings/bookings.module#BookingsPageModule'
            }
          ]
        },
        {
          path: '',
          redirectTo: '/places/tabs/discover',
          pathMatch: 'full'
        }
      ]
    },
    {
      path: '',
      redirectTo: '/places/tabs/discover',
      pathMatch: 'full'
    }
];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class PlacesRoutingModule {}
