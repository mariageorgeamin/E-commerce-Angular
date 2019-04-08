import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "src/app/product";
import { ProductService } from "src/app/services/product.service";
import { Item } from "src/app/item";
import { StreamService } from "src/app/services/stream.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: Product[];
  public name;
  public id;
  private items: Item[] = [];
  private total: number = 0;
  private totalQty: number = 0;
  constructor(
    private router: Router,
    private productService: ProductService,
    private stream: StreamService
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
    if (id) {
      var item: Item = {
        product: this.productService.find(id),
        quantity: 1
      };
      if (localStorage.getItem("cart") == null) {
        let cart: any = [];
        cart.push(item);
        localStorage.setItem("cart", JSON.stringify(cart));
      } else {
        let cart: any = JSON.parse(localStorage.getItem("cart"));
        let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
          let item: Item = cart[i];
          if (item.product.id == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          cart.push(item);
          localStorage.setItem("cart", JSON.stringify(cart));
        } else {
          let item: Item = cart[index];
          item.quantity += 1;
          cart[index] = item;
          localStorage.setItem("cart", JSON.stringify(cart));
        }
      }
    }
    this.quantity();
  }

  quantity(): void {
    this.total = 0;
    this.items = [];
    this.totalQty = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      for (var i = 0; i < cart.length; i++) {
        let item = cart[i];
        this.items.push({
          product: item.product,
          quantity: item.quantity
        });
        this.total += item.product.price * item.quantity;
        this.totalQty += item.quantity;
      }
    } else {
      this.totalQty = 0;
    }
    this.stream.setcartCount(this.totalQty.toString());
  }

  wishlist(id) {
    if (id) {
      var item: Object = {
        itemid: id,
        quantity: 1
      };
      if (localStorage.getItem("wishlist") == null) {
        let wish: any = [];
        wish.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wish));
        this.stream.setwishListCount(wish.length);
      } else {
        let wish: any = JSON.parse(localStorage.getItem("wishlist"));
        let index: number = -1;
        for (var i = 0; i < wish.length; i++) {
          let item = wish[i];
          if (item.itemid == id) {
            index = i;
            break;
          }
        }
        if (index == -1) {
          wish.push(item);
          localStorage.setItem("wishlist", JSON.stringify(wish));
          this.stream.setwishListCount(wish.length);
        } else {
          let item = wish[index];
          item.quantity += 1;
          wish[index] = item;
          localStorage.setItem("wishlist", JSON.stringify(wish));
          this.stream.setwishListCount(wish.length);
        }
      }
    }
  }
}
