import { Injectable } from "@angular/core";
import { Product } from "../product";
import { ProductService } from "./product.service";

@Injectable({
  providedIn: "root"
})
export class WishlistService {
  private products: Product[] = [];

  constructor(private productService: ProductService) {}

  addToWishlist(id: string): void {
    let wish: any = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (id) {
      var item: Object = {
        itemid: id
      };
      if (localStorage.getItem("wishlist") == null) {
        wish.push(item);
        localStorage.setItem("wishlist", JSON.stringify(wish));
      } else {
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
        }
      }
    }
  }

  calculateTotal(): number {
    let totalQty: number = 0;
    let wishlist = JSON.parse(localStorage.getItem("wishlist"));

    if (wishlist) {
      totalQty = wishlist.length;
    }
    return totalQty;
  }
}
