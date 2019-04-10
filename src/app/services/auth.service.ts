import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  isAuthenticated: boolean = false;

  constructor() {}
  setIsAuthenticated(state: boolean): void {
    this.isAuthenticated = state;
  }

  getIsAuthenticated(): boolean {
    return this.isAuthenticated;
  }
}
