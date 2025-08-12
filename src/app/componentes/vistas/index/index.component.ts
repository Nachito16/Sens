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
        interval: 4000,
        ride: 'carousel',
        pause: false
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

      // --- CLONAR SOLO UNA VEZ DESDE EL HTML ORIGINAL ---
      const ORIGINAL_HTML = track.innerHTML;  // snapshot inicial
      let clonesDone = false;
      const MIN_FACTOR = 2; // al menos 2x el ancho del wrapper

      const ensureClones = () => {
        if (clonesDone) return;
        const wrapperW = wrapper.clientWidth;

        // Preparar plantilla con el contenido original
        const template = document.createElement('template');
        template.innerHTML = ORIGINAL_HTML.trim();

        // Clonar hasta tener suficiente ancho total (sin duplicar infinito)
        while (track.scrollWidth < wrapperW * MIN_FACTOR) {
          track.appendChild(template.content.cloneNode(true));
        }
        clonesDone = true;
      };

      const applyDistanceAndDuration = () => {
        ensureClones();

        const wrapperW = wrapper.clientWidth;
        const distance = Math.max(1, track.scrollWidth - wrapperW);
        const durationSec = Math.max(8, Math.round(distance / speedFor()));

        track.style.setProperty('--distance', distance + 'px');
        track.style.setProperty('--duration', durationSec + 's');

        // Reinicio duro de animación (necesario en iOS)
        track.style.animation = 'none';
        // @ts-ignore forzar reflow
        track.offsetHeight;
        track.style.animation = '';

        // Asegurar que esté corriendo (por si quedó pausado)
        track.classList.remove('is-paused');
        (track.style as any).animationPlayState = 'running';
      };

      // Recalcular cuando cargan las imágenes
      const imgs = Array.from(track.querySelectorAll<HTMLImageElement>('img'));
      imgs.forEach(img => {
        if (!img.complete) {
          img.addEventListener('load', applyDistanceAndDuration, { once: true });
          img.addEventListener('error', applyDistanceAndDuration, { once: true });
        }
      });

      // Observar cambios reales de tamaño del track y wrapper
      const ro = new ResizeObserver(() => applyDistanceAndDuration());
      ro.observe(track);
      ro.observe(wrapper);

      // Primera pasada + fallback por demoras en iOS
      applyDistanceAndDuration();
      setTimeout(applyDistanceAndDuration, 600);

      // Pausa por tap (3s) y retoma
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
