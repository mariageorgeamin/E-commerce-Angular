import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/product";
import { ProductService } from "src/app/services/product.service";
import { Item } from "src/app/item";
import { StreamService } from "src/app/services/stream.service";
import { CartService } from "src/app/services/cart.service";
import { WishlistService } from "src/app/services/wishlist.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: Product[];
  public name;
  public id;
  private totalQty: number = 0;
  constructor(
    private router: Router,
    private productService: ProductService,
    private stream: StreamService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {
    this.name = localStorage.getItem("name");
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  ngOnInit() {
    this.products = this.productService.findAll();
  }

  addToCart(id) {
    if (this.isUserLoggedIn()) {
      this.cartService.addToCart(id);
      this.stream.setcartCount(
        this.cartService.calculateTotalItems().toString()
      );
    } else {
      this.router.navigate(["login"]);
    }
  }

  wishlist(id) {
    if (this.isUserLoggedIn()) {
      this.wishlistService.addToWishlist(id);
      this.stream.setwishListCount(
        this.wishlistService.calculateTotal().toString()
      );
    } else {
      this.router.navigate(["login"]);
    }
  }

  isUserLoggedIn() {
    let loggedin: any;
    this.stream.getAuthenticated().subscribe(res => (loggedin = res));
    return loggedin == "true";
  }
}
