import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    this.isMenuOpen = false; 
  }


  isMobileMenuOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


  goToInicioDirectly() {
    this.router.navigateByUrl('/');
    setTimeout(() => {
      const element = document.getElementById('inicioIndex');
      if (element) {
        const offset = 1650; // Ajusta el valor según sea necesario

        // Utiliza 'scrollIntoView' con 'behavior: 'smooth'' para el desplazamiento suave
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, -offset);
      }
    }, 50); // Puedes ajustar este tiempo según sea necesario
    this.isMobileMenuOpen = false;
  }

  isMenuOpen = false;

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }


}
