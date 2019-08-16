import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './recipes/auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'places', pathMatch: 'full' },
  { path: 'auth', loadChildren: './recipes/auth/auth.module#AuthPageModule' },
  { path: 'places', loadChildren: './recipes/places/places.module#PlacesPageModule', canLoad :[AuthGuard] },
  { path: 'bookings', loadChildren: './recipes/bookings/bookings.module#BookingsPageModule', canLoad : [AuthGuard]  }
  // {
  //   path: 'recipes',
  //   children: [
  //     {
  //       path: '',
  //       loadChildren: './recipes/recipes.module#RecipesPageModule'
  //     },
  //     {
  //       path: ':recipeId',
  //       loadChildren:
  //         './recipes/recipe-detail/recipe-detail.module#RecipeDetailPageModule'
  //     }
  //   ]
  // },
  // {
  //   path: 'uiscreen',
  //   loadChildren: './recipes/uiscreen/uiscreen.module#UiscreenPageModule'
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
