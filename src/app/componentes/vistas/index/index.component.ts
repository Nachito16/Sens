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
    document.querySelectorAll('.carousel').forEach(carousel => {
      new (window as any).bootstrap.Carousel(carousel, {
        interval: 4000,
        ride: 'carousel',
        pause: false
      });
    });

    const wrappers = document.querySelectorAll<HTMLElement>('.carousel-wrapper');

    wrappers.forEach(wrapper => {
      const track = wrapper.querySelector<HTMLElement>('.carousel-track, .carousel-track-jugadores');
      if (!track) return;

      const isJugadores = track.classList.contains('carousel-track-jugadores');
      const isReverse = track.classList.contains('reverse');

      const speedFor = () => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isJugadores) return isMobile ? 130 : 160;   // px/s
        if (isReverse) return isMobile ? 105 : 135;
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
        const distance = Math.max(1, track.scrollWidth - wrapperW); // px a recorrer
        const speed = speedFor(); // px/s
        const durationSec = Math.max(8, Math.round(distance / speed)); // no menos de 8s

        track.style.setProperty('--distance', distance + 'px');
        track.style.setProperty('--duration', durationSec + 's');

        track.style.animation = 'none';
        // forcing reflow
        track.offsetHeight;
        track.style.animation = '';
      };

      // Primera aplicación y on-resize
      applyDistanceAndDuration();
      window.addEventListener('resize', applyDistanceAndDuration, { passive: true });

      // Tap/click: pausar 3s y retomar (mobile-friendly)
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
