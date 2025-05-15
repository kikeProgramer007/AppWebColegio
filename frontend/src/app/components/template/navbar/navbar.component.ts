import { Component, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.removeItem('token');
    this.router.navigate(['/login'])
  }
  
  toggleSidebar() {
    const body = document.body;
    if (body.classList.contains('toggle-sidebar')) {
      this.renderer.removeClass(body, 'toggle-sidebar');
    } else {
      this.renderer.addClass(body, 'toggle-sidebar');
    }
  }
}
