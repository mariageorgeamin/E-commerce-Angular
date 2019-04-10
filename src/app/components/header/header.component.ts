import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { StreamService } from "src/app/services/stream.service";
import { AuthService } from "src/app/services/auth.service";
import { CartService } from "src/app/services/cart.service";
import { WishlistService } from "src/app/services/wishlist.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public name;
  cartCount: any;
  wishListCount: any;
  show: boolean = false;
  authenticated: any;
  constructor(
    private router: Router,
    private stream: StreamService,
    private auth: AuthService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.stream.getName().subscribe(res => (this.name = res));
    this.stream.getcartCount().subscribe(res => (this.cartCount = res));
    this.stream.getwishListCount().subscribe(res => (this.wishListCount = res));
    this.stream.getAuthenticated().subscribe(res => (this.authenticated = res));
    this.authenticated = this.authenticated == "true";
  }

  ngOnInit() {
    if (this.cartCount > 0) {
      this.show = true;
    }
  }
  logout() {
    this.stream.setAuthenticated("false");
    this.authenticated = false;
    localStorage.removeItem("name");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    this.stream.setcartCount(this.cartService.calculateTotalItems().toString());
    this.stream.setwishListCount(
      this.wishlistService.calculateTotal().toString()
    );
    this.stream.setName(localStorage.getItem("name"));
    this.router.navigate([""]);
  }
}
