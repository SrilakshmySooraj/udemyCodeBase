import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {

  constructor(private route: ActivatedRoute, private navctrl: NavController) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (! paramMap.has('placeId')){
        //this.
      }
    });
  }

}
