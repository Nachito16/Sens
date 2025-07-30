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
  const carouselTrack = document.querySelector('.carousel-track') as HTMLElement;
  const carouselWrapper = document.querySelector('.carousel-wrapper') as HTMLElement;

  if (!carouselTrack || !carouselWrapper) return;

  // Clonamos el contenido (loop real)
  carouselTrack.innerHTML += carouselTrack.innerHTML;

  let position = 0;
  const speed = 1; // pixeles por frame

  function animate() {
    position -= speed;
    const totalWidth = carouselTrack.scrollWidth / 2;

    if (Math.abs(position) >= totalWidth) {
      position = 0; // reinicia sin parpadeo
    }

    carouselTrack.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
  }

  animate();
}


}
