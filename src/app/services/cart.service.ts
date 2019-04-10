import { Injectable } from "@angular/core";
import { Item } from "../item";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class CartService {
  private items: Item[] = [];

  constructor(private productService: ProductService) {}

  loadCart(): Item[] {
    this.items = [];
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      this.items = cart;
    }
    return this.items;
  }

  calculateTotalPrice(): number {
    let total: number = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      cart.map(function(item: Item) {
        total += item.product.price * item.quantity;
      });
    }
    return total;
  }

  calculateTotalItems(): number {
    let totalQty: number = 0;
    let cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      cart.map(function(item: Item) {
        totalQty += item.quantity;
      });
    }
    return totalQty;
  }

  remove(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem("cart"));
    cart.map(function(item: Item) {
      if (item.product.id == id) {
        if (item.quantity <= 1) {
          cart.splice(item, 1);
        } else {
          item.quantity -= 1;
        }
      }
    });
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  addToCart(id: string): void {
    let cart: any = JSON.parse(localStorage.getItem("cart")) || [];
    if (id) {
      var item: Item = {
        product: this.productService.find(id),
        quantity: 1
      };
      if (!cart || !cart.length) {
        cart.push(item);
      } else {
        let found: boolean = false;
        cart.map(function(item: Item) {
          if (item.product.id == id) {
            found = true;
            item.quantity += 1;
          }
        });
        if (!found) {
          cart.push(item);
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }
}
