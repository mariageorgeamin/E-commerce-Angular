import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { Item } from "src/app/item";
import { ProductService } from "src/app/services/product.service";
import { StreamService } from "src/app/services/stream.service";
import { CartService } from "src/app/services/cart.service";

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
    private stream: StreamService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.items = this.cartService.loadCart();
    this.total = this.cartService.calculateTotalPrice();
    this.totalQty = this.cartService.calculateTotalItems();
  }

  remove(id: string): void {
    this.cartService.remove(id);
    this.items = this.cartService.loadCart();
    this.total = this.cartService.calculateTotalPrice();
    this.totalQty = this.cartService.calculateTotalItems();
    this.stream.setcartCount(this.cartService.calculateTotalItems().toString());
  }
}
