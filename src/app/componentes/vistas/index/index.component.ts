import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseMongo } from '../../../servicios/baseMongo';
import { tipoNegocio } from 'src/app/dataTypes/enums';

declare var bootstrap: any; // Necesario para usar Bootstrap JS

interface Card {
  id: any | string;
  title: string;
  description: string;
  tipoNegocio: tipoNegocio;
  price: number;
  imagenes: string[];
}

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements AfterViewInit {
  currentCardData: Card[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private router: Router, private baseMongo: baseMongo) { }

 ngAfterViewInit(): void {
  // Inicializar todos los carruseles Bootstrap clásicos
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    new bootstrap.Carousel(carousel, {
      interval: 4000,
      ride: 'carousel',
      pause: false
    });
  });

  // Pausar animaciones por clic en carruseles personalizados
  const customCarousels = document.querySelectorAll('.carousel-wrapper');

  customCarousels.forEach((carouselWrapper) => {
    const track = carouselWrapper.querySelector('.carousel-track');
    let isPaused = false;
    let resumeTimeout: number | undefined;

    carouselWrapper.addEventListener('click', () => {
      // Limpiamos cualquier timeout anterior
      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }

      // Toggle de pausa/reanudación
      isPaused = !isPaused;

      if (track instanceof HTMLElement) {
        track.style.animationPlayState = isPaused ? 'paused' : 'running';
      }

      // Si se pausó, programamos la reanudación automática en 3 segundos
      if (isPaused) {
        resumeTimeout = window.setTimeout(() => {
          isPaused = false;
          if (track instanceof HTMLElement) {
            track.style.animationPlayState = 'running';
          }
        }, 3000);
      }
    });
  });
}


  
}
