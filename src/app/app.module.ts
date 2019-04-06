import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./components/app/app.component";
import { CartComponent } from "./components/cart/cart.component";
import { HomeComponent } from "./components/home/home.component";
import { LoginComponent } from "./components/login/login.component";
import { NotfoundComponent } from "./components/notfound/notfound.component";
import { SignupComponent } from "./components/signup/signup.component";
import { SingleproductComponent } from "./components/singleproduct/singleproduct.component";
import { WishlistComponent } from "./components/wishlist/wishlist.component";
import { HeaderComponent } from "./components/header/header.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { HttpClientModule } from "@angular/common/http";
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    HomeComponent,
    LoginComponent,
    NotfoundComponent,
    SignupComponent,
    SingleproductComponent,
    WishlistComponent,
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
