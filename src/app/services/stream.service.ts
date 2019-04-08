import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Item } from "../item";

@Injectable({
  providedIn: "root"
})
export class StreamService {
  private items: Item[] = [];
  private total: number = 0;
  private totalQty: number;
  private name: BehaviorSubject<string> = new BehaviorSubject("");
  private cartCount: BehaviorSubject<string> = new BehaviorSubject("");
  private wishListCount: BehaviorSubject<string> = new BehaviorSubject("");
  constructor() {
    this.name.next(localStorage.getItem("name"));

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
    this.cartCount.next(this.totalQty.toString());
    let wishListproducts = JSON.parse(localStorage.getItem("wishlist")) || [];
    this.wishListCount.next(wishListproducts.length);
  }
  setName(val?: string): void {
    this.name.next(val);
  }
  setcartCount(val?: string): void {
    this.cartCount.next(val);
  }
  setwishListCount(val?: string): void {
    this.wishListCount.next(val);
  }

  getName() {
    return this.name.asObservable();
  }
  getcartCount() {
    return this.cartCount.asObservable();
  }
  getwishListCount() {
    return this.wishListCount.asObservable();
  }
}
