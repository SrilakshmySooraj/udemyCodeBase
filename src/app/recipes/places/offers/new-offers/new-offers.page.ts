import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlacesService } from '../../places.service';

@Component({
  selector: 'app-new-offers',
  templateUrl: './new-offers.page.html',
  styleUrls: ['./new-offers.page.scss'],
})
export class NewOffersPage implements OnInit {
  form: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private navctrl: NavController,private placeService: PlacesService,private loadingCtrl:LoadingController) { }

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
    if( ! this.form.valid) {
      return ;
    }
    this.loadingCtrl.create({
      message:'Creating a new place...'
    }).then(loadingEl => {
      loadingEl.present();
      this.placeService.addPlace(this.form.value.title,this.form.value.description,
        +this.form.value.price,new Date(this.form.value.availableFrom),
        new Date(this.form.value.availableTo)).subscribe( () => {
          loadingEl.dismiss();
          this.form.reset();
          this.router.navigate(['/places/tabs/offers']);
        });
    });
  }
}
