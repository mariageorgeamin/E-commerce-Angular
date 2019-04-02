import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleproductComponent } from './components/singleproduct/singleproduct.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

@NgModule({
  declarations: [AppComponent, CartComponent, HomeComponent, LoginComponent, NotfoundComponent, SignupComponent, SingleproductComponent, WishlistComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
