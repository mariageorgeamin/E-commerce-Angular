import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Item } from "src/app/item";
import { ProductService } from "src/app/services/product.service";
import { StreamService } from "src/app/services/stream.service";

@Component({
  selector: "app-cart",
  templateUrl: "./cart.component.html",
  styleUrls: ["./cart.component.scss"]
})
export class CartComponent implements OnInit {
  private items: Item[] = [];
  private total: number = 0;
  private totalQty: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private stream: StreamService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  loadCart(): void {
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
    }
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    let index: number = -1;
    for (var i = 0; i < cart.length; i++) {
      let item: Item = cart[i];
      if (item.product.id == id) {
        if (item.quantity <= 1) {
          cart.splice(i, 1);
          break;
        } else {
          cart[i]["quantity"] -= 1;
          break;
        }
      }
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    this.quantity();
    this.loadCart();
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
}
