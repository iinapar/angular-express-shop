import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnDestroy {
  login = false;
  subscription: Subscription;
  customid!: String;

  constructor(private authService: AuthService) {
    this.subscription = this.authService.loginTrue().subscribe((message) => {
      this.login = message;
    });
    /* varmistetaan että login -tila säilyy myös kun sivu reffataan
       varmistus tehdään katsomalla onko token sessionstoragessa.
       Yllä oleva observablen tilaus silti tarvitaan, sillä sessionstoragen
       tarkistus vaatii aina reffauksen koska sitä ei voi kutsua asynkronisesti. */
    const atoken = sessionStorage.getItem('accesstoken');
    if (atoken) {
      this.login = true;
    } else {
      this.login = false;
    }
  }

  doLogout() {
    this.login = false;
  }

  ngOnDestroy() {
    // lopetetaan tilaus kun komponentti tuhotaan
    this.subscription.unsubscribe();
  }
}
