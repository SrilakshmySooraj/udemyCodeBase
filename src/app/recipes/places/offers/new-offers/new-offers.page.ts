import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;

  constructor(private route: ActivatedRoute, private navctrl: NavController) { }

  ngOnInit() {
    this.form = new FormGroup ({
      title : new FormControl (null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      description : new FormControl (null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      price : new FormControl (null, {
        updateOn : 'blur',
        validators : [Validators.required,Validators.min(1)]
      }),
      availableFrom : new FormControl (null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
      availableTo : new FormControl (null, {
        updateOn : 'blur',
        validators : [Validators.required]
      }),
    });

    this.route.paramMap.subscribe(paramMap => {
      if (! paramMap.has('placeId')){
        //this.
      }
    });
  }

  onCreateForm(){
    console.log(this.form);
  }
}
