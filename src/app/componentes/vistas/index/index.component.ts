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
  // Bootstrap carousels clásicos
  document.querySelectorAll('.carousel').forEach(carousel => {
    new (window as any).bootstrap.Carousel(carousel, {
      interval: 4000, ride: 'carousel', pause: false
    });
  });

  // Carruseles custom
  const wrappers = document.querySelectorAll<HTMLElement>('.carousel-wrapper');

  wrappers.forEach(wrapper => {
    const track = wrapper.querySelector<HTMLElement>('.carousel-track, .carousel-track-jugadores');
    if (!track) return;

    const isJugadores = track.classList.contains('carousel-track-jugadores');
    const isReverse   = track.classList.contains('reverse');

    const speedFor = () => {
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (isJugadores) return isMobile ? 130 : 160;  // px/s
      if (isReverse)   return isMobile ? 105 : 135;
      return isMobile ? 90 : 120;
    };

    const ensureClones = () => {
      const wrapperW = wrapper.clientWidth;
      const MIN_FACTOR = 2;
      while (track.scrollWidth < wrapperW * MIN_FACTOR) {
        track.innerHTML += track.innerHTML;
      }
    };

    const applyDistanceAndDuration = () => {
      ensureClones();
      const wrapperW = wrapper.clientWidth;
      const distance = Math.max(1, track.scrollWidth - wrapperW);
      const durationSec = Math.max(8, Math.round(distance / speedFor()));
      track.style.setProperty('--distance', distance + 'px');
      track.style.setProperty('--duration', durationSec + 's');

      // iOS: para reverse, arrancá ya al final para evitar "aire"
      if (isReverse) {
        track.style.transform = `translate3d(calc(-1 * ${distance}px),0,0)`;
      }

      // Reinicio duro de animación (iOS Safari)
      track.style.animation = 'none';
      // @ts-ignore forzar reflow
      track.offsetHeight;
      track.style.animation = '';
    };

    // --- NEW: recalcular cuando cargan las imágenes ---
    const imgs = Array.from(track.querySelectorAll<HTMLImageElement>('img'));
    imgs.forEach(img => {
      if (!img.complete) {
        img.addEventListener('load', applyDistanceAndDuration, { once: true });
        img.addEventListener('error', applyDistanceAndDuration, { once: true });
      }
    });

    // --- NEW: observar cambios de tamaño reales del track/wrapper ---
    const ro = new ResizeObserver(() => applyDistanceAndDuration());
    ro.observe(track);
    ro.observe(wrapper);

    // Primera pasada + fallback por si iOS demora imágenes
    applyDistanceAndDuration();
    setTimeout(applyDistanceAndDuration, 600);

    // Pausa por tap (como ya tenías)
    let resumeTimeout: number | undefined;
    wrapper.addEventListener('click', () => {
      if (resumeTimeout) clearTimeout(resumeTimeout);
      track.classList.toggle('is-paused');
      if (track.classList.contains('is-paused')) {
        resumeTimeout = window.setTimeout(() => track.classList.remove('is-paused'), 3000);
      }
    }, { passive: true });
  });
}



}
