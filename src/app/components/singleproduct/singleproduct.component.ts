import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-singleproduct",
  templateUrl: "./singleproduct.component.html",
  styleUrls: ["./singleproduct.component.scss"]
})
export class SingleproductComponent implements OnInit {
  products: object[];
  product: object;
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.http.get("../../../assets/products.json").subscribe(data => {
      this.products = data["arrayOfProducts"];
      this.products.forEach((product: Object) => {
        if (product["id"] == this.route.snapshot.params.id) {
          this.product = product;
        }
      });
    });
  }
}
