import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { loadLContext } from '@angular/core/src/render3/discovery_utils';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  isLoading = false;
  constructor(private authservice:AuthService, private route: Router,private LoadingCtrl:LoadingController) { }

  ngOnInit() {
  }

  login() {
    this.authservice.login();
    this.isLoading = true;
    this.LoadingCtrl.create({
      keyboardClose:true, message:'Loading'
    }).then(load =>{
      load.present();
      setTimeout( () => {
        load.dismiss();
        this.route.navigateByUrl('/places/tabs/discover');
      },1500)
    })   
  }


  onSubmit(form: NgForm){
    console.log(form);
  }
}
