import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {
  products: object[];
  public name;
  constructor(private router: Router, private http: HttpClient) {
    this.name = localStorage.getItem("name");
  }

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }
  ngOnInit() {
    this.http.get("../../../assets/products.json").subscribe(data => {
      this.products = data["arrayOfProducts"];
    });
  }
}
