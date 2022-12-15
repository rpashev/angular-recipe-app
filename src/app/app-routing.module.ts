import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';
import { LoginComponent } from './modules/auth/login/login.component';
import { LogoutComponent } from './modules/auth/logout/logout.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { HomeComponent } from './modules/core/home/home.component';
import { CreateRecipeComponent } from './modules/recipe/create-recipe/create-recipe.component';
import { DetailsComponent } from './modules/recipe/details/details.component';
import { EditRecipeComponent } from './modules/recipe/edit-recipe/edit-recipe.component';
import { AuthoredComponent } from './modules/user/authored/authored.component';
import { FavoritesComponent } from './modules/user/favorites/favorites.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'authored',
    component: AuthoredComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'create-recipe',
    component: CreateRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit-recipe',
    component: EditRecipeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'details',
    component: DetailsComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
