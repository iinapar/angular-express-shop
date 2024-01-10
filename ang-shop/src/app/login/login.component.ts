import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  error = '';
  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // aina kun login-komponentti ladataan, poistetaan token
    this.authService.logout();
  }

  // lomakkeen lähetys
  // authService palauttaa observablen jossa on joko true tai false
  onSubmit(formData: any) {
    this.authService.login(formData.tunnus, formData.salasana).subscribe((result) => {
      if (result === true) {
        this.router.navigate(['/admin']);
      } else {
        this.error = 'Sisäänkirjautuminen epäonnistui';
      }
    });
  }
}
