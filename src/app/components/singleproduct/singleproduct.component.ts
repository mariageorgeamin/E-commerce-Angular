import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "src/app/product";
import { ProductService } from "src/app/services/product.service";
import { StreamService } from "src/app/services/stream.service";
import { CartService } from "src/app/services/cart.service";
import { WishlistService } from "src/app/services/wishlist.service";

@Component({
  selector: "app-singleproduct",
  templateUrl: "./singleproduct.component.html",
  styleUrls: ["./singleproduct.component.scss"]
})
export class SingleproductComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private stream: StreamService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit() {
    this.product = this.productService.find(this.route.snapshot.params.id);
    if (!this.product) {
      this.router.navigate(["notfound"]);
    }
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
