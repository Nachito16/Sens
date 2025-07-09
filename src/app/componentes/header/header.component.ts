import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isMobileMenuOpen: boolean = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToPropiedades() {
    // Navegar al componente "propiedades"
    this.router.navigateByUrl('/propiedades');
    // Esperar un breve momento antes de desplazarse al comienzo de la página
    setTimeout(() => {
      const element = document.getElementById('inicioProp');
      if (element) {
        const offset = 950; // Ajusta el valor según sea necesario
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, -offset);
      }
    }); // Puedes ajustar este tiempo según sea necesario

    // Cerrar el menú móvil después de seleccionar una opción
    this.toggleMenu();
  }

  goToInicio() {
    this.router.navigateByUrl('/');

    // Ajusta el tiempo del setTimeout para que sea lo más rápido posible, 50ms en este ejemplo
    setTimeout(() => {
      const element = document.getElementById('inicioIndex');
      if (element) {
        const offset = 1650; // Ajusta el valor según sea necesario

        // Utiliza 'scrollIntoView' con 'behavior: 'smooth'' para el desplazamiento suave
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, -offset);
      }
    }, 50); // Puedes ajustar este tiempo según sea necesario

    // Cerrar el menú móvil después de seleccionar una opción
    this.toggleMenu();
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

  toggleMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }
}
