import { Component, OnInit } from "@angular/core";
import { Router, RouterLink, ActivatedRoute } from "@angular/router";
import { Item } from "src/app/item";
import { ProductService } from "src/app/services/product.service";
import { StreamService } from "src/app/services/stream.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public name;
  public cartCount;
  public wishListCount;
  private items: Item[] = [];
  private total: number = 0;
  private totalQty: number = 0;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService,
    private stream: StreamService
  ) {
    this.stream.getName().subscribe(res => (this.name = res));
    this.stream.getcartCount().subscribe(res => (this.cartCount = res));
    this.stream.getwishListCount().subscribe(res => (this.wishListCount = res));
    console.log(this.name);
  }

  ngOnInit() {}
  logout() {
    localStorage.removeItem("name");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    this.stream.setName(localStorage.getItem("name"));
    this.router.navigate([""]);
  }
}
