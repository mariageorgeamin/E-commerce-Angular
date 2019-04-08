import { Injectable } from "@angular/core";
import { Product } from "../product";
import { HttpClient } from "@angular/common/http";
import ProductsFile from "../../assets/products.json";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  private products: Product[];

  constructor(private http: HttpClient) {
    // this.http.get("../../assets/products.json").subscribe(data => {
    //   this.products = data["arrayOfProducts"];
    //   console.log(this.products);
    // });
    this.products = ProductsFile["arrayOfProducts"];
    // console.log(this.products);
  }

  findAll(): Product[] {
    return this.products;
  }

  find(id: string): Product {
    return this.products[this.getSelectedIndex(id)];
  }

  private getSelectedIndex(id: string) {
    for (var i = 0; i < this.products.length; i++) {
      if (this.products[i].id == id) {
        return i;
      }
    }
    return -1;
  }
}
