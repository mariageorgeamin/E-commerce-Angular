import { Component, OnInit } from "@angular/core";
import { Router, RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  public name;
  constructor(private router: Router) {
    this.name = localStorage.getItem("name");
    console.log(this.name);
  }

  ngOnInit() {}

  logout() {
    localStorage.removeItem("name");
    this.router.navigate([""]);
  }
}
