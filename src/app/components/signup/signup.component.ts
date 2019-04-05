import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MustMatch } from "src/app/_helpers/must-match.validators";
import { Router } from "@angular/router";

// import custom validator to validate that password and confirm password fields match

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.scss"]
})
export class SignupComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        firstName: ["", Validators.required],
        email: ["", [Validators.required, Validators.email]],
        password: ["", [Validators.required, Validators.minLength(6)]],
        confirmPassword: ["", Validators.required]
      },
      {
        validator: MustMatch("password", "confirmPassword")
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // alert("SUCCESS!! :-)\n\n" + JSON.stringify(this.registerForm.value));
    localStorage.setItem("name", this.registerForm.value["firstName"]);
    this.router.navigate(["home"]);
  }
}
