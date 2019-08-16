import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipesService } from './recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss']
})
export class RecipesPage implements OnInit {
  recipe: Recipe[];

  constructor(private recipesService: RecipesService) {}

  ngOnInit() {
    console.log('Here' + this.recipe);
  }

  ionViewDidEnter() {
    console.log('ionViewDidEnter');
  }

  ionViewDidLeave() {
    console.log('ionViewDidLeave');
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.recipe = this.recipesService.getAllRecipes();
  }

  ionViewWillLeave() {
    console.log('ionViewWillLeave');
  }

}
