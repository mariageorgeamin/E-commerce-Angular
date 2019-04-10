import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Item } from "../item";
import { CartService } from "./cart.service";
import { AuthService } from "./auth.service";
import { WishlistService } from "./wishlist.service";

@Injectable({
  providedIn: "root"
})
export class StreamService {
  private name: BehaviorSubject<string> = new BehaviorSubject("");
  private authenticated: BehaviorSubject<string> = new BehaviorSubject("");
  private cartCount: BehaviorSubject<string> = new BehaviorSubject("");
  private wishListCount: BehaviorSubject<string> = new BehaviorSubject("");

  constructor(
    private cartService: CartService,
    private auth: AuthService,
    private wishlistService: WishlistService
  ) {
    this.name.next(localStorage.getItem("name"));
    this.cartCount.next(this.cartService.calculateTotalItems().toString());
    this.wishListCount.next(this.wishlistService.calculateTotal().toString());
    this.authenticated.next(this.auth.getIsAuthenticated().toString());
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

  setAuthenticated(val?: string): void {
    this.authenticated.next(val);
  }

  getAuthenticated() {
    return this.authenticated.asObservable();
  }
}
