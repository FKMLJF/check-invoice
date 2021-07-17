import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  isLoggedIn = false;
  username?: string;
  isMenuCollapsed = true;

  constructor(private tokenStorageService: TokenStorageService) { }

  ngOnInit(): void {
    this.check();
  }

  check(): void{
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      this.username = this.tokenStorageService.getUser().username;
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.check();
  }
}
