import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { StreamService } from "src/app/services/stream.service";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private stream: StreamService,
    private auth: AuthService
  ) {}

  public navigateTo(path: string): void {
    this.router.navigate([path]);
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      firstName: ["", Validators.required],
      password: ["", [Validators.required, Validators.minLength(6)]]
    });
  }
  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.stream.setAuthenticated("true");
    localStorage.setItem("name", this.loginForm.value["firstName"]);
    this.stream.setName(localStorage.getItem("name"));
    this.router.navigate(["home"]);
    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.loginForm.value));
  }
}
