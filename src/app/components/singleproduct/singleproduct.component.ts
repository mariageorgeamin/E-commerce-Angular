import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";
import { Product } from "src/app/product";
import { ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-singleproduct",
  templateUrl: "./singleproduct.component.html",
  styleUrls: ["./singleproduct.component.scss"]
})
export class SingleproductComponent implements OnInit {
  product: Product;
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.product = this.productService.find(this.route.snapshot.params.id);
  }
}
