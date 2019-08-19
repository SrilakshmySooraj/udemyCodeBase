import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Places } from '../../places.model';
import { PlacesService } from '../../places.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-offers',
  templateUrl: './edit-offers.page.html',
  styleUrls: ['./edit-offers.page.scss'],
})
export class EditOffersPage implements OnInit {
  offerPlaces : Places;
  form : FormGroup;
  constructor(private route:ActivatedRoute, private placesService: PlacesService) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      console.log( paramMap.has('placeId'));

      if (! paramMap.has('placeId')){
        return ;
      }
      this.offerPlaces = this.placesService.retrive(paramMap.get('placeId'));  
      console.log("1" +this.offerPlaces);    
    })
    console.log("2" +this.offerPlaces);
    this.form = new FormGroup({
      title : new FormControl(null, {
        updateOn :'blur',
        validators: [Validators.required]
      }),
      description : new FormControl(null, {
        updateOn :'blur',
        validators: [Validators.required]
      })
    });
   
  }


  onEditForm(){
    console.log(this.form);
  }
}
