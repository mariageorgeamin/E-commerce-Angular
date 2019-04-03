import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./components/app/app.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { CartComponent } from "./components/cart/cart.component";
import { SignupComponent } from "./components/signup/signup.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { SingleproductComponent } from "./components/singleproduct/singleproduct.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";

const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "login", component: LoginComponent },
  { path: "cart", component: CartComponent },
  { path: "signup", component: SignupComponent },
  { path: "wishlist", component: WishlistComponent },
  { path: "singleproduct", component: SingleproductComponent },
  { path: "**", component: NotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
