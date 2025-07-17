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
    // Inicializa el carrusel Bootstrap clásico (si seguís usándolo)
    const carouselElement = document.querySelector('#carouselNosotros');
    if (carouselElement) {
      new bootstrap.Carousel(carouselElement, {
        interval: 4000,
        ride: 'carousel',
        pause: false
      });
    }

    const customCarousel = document.getElementById('customCarousel');
    const track = customCarousel?.querySelector('.carousel-track');

    let isPaused = false;

    customCarousel?.addEventListener('click', () => {
      isPaused = !isPaused;
      if (track) {
        (track as HTMLElement).style.animationPlayState = isPaused ? 'paused' : 'running';
      }
    });
  }

}
