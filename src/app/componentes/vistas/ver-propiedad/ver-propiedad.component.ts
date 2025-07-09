import { Component, OnDestroy, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { baseMongo } from '../../../servicios/baseMongo';
import { tipoPropiedad } from 'src/app/dataTypes/enums';
import { tipoNegocio } from 'src/app/dataTypes/enums';
import { trigger, style, animate, transition } from '@angular/animations';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface propiedad {
  id: any | string;
  title: string;
  description: string;
  price: number;
  location: string;
  tipoPropiedad: tipoPropiedad;
  tipoNegocio: tipoNegocio;
  direccion: string;
  esquina: string;
  imagenes: string[];
}

@Component({
  selector: 'app-ver-propiedad',
  templateUrl: './ver-propiedad.component.html',
  styleUrls: ['./ver-propiedad.component.css'],
  animations: [
    trigger('carouselAnimation', [
      transition('hidden <=> visible', [
        style({ opacity: 0 }),
        animate('500ms', style({ opacity: 1 })),
      ]),
    ]),
  ],
})

export class VerPropiedadComponent implements OnDestroy {
  currentPropiedad: propiedad = {
    id: '',
    title: '',
    description: '',
    price: 0,
    location: '',
    tipoPropiedad: tipoPropiedad.APARTAMENTO,
    tipoNegocio: tipoNegocio.ALQUILER,
    direccion: '',
    esquina: '',
    imagenes: [],
  };

  propiedadesDisponibles: propiedad[] = [];

  userQuestion: string = '';
  private destroy$ = new Subject<void>();

  currentImageIndex: number = 0;
  private interval: any;

  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;

  constructor(
    private activatedRoute: ActivatedRoute,
    private baseMongo: baseMongo,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }

    this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.baseMongo.getListing();
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (propiedadesDesdeBackend: any) => {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        const propiedadActual = propiedadesDesdeBackend.find(
          (propiedad: { _id: any }) => propiedad._id === id
        );

        this.currentPropiedad = {
          id: propiedadActual._id,
          title: propiedadActual.title,
          description: propiedadActual.description,
          price: propiedadActual.price,
          location: propiedadActual.location,
          tipoPropiedad: propiedadActual.tipoPropiedad,
          tipoNegocio: propiedadActual.tipoNegocio,
          direccion: propiedadActual.direccion,
          esquina: propiedadActual.esquina,
          imagenes: propiedadActual.imagenes,
        };

        this.propiedadesDisponibles = propiedadesDesdeBackend.filter(
          (propiedad: { _id: any }) => propiedad._id !== id
        ).map((propiedad: any) => {
          return {
            ['id']: propiedad._id,
            title: propiedad.title,
            description: propiedad.description,
            price: propiedad.price,
            location: propiedad.location,
            tipoPropiedad: propiedad.tipoPropiedad,
            direccion: propiedad.direccion,
            esquina: propiedad.esquina,
            imagenes: propiedad.imagenes,
          };
        });
      },
      (error) => {
        console.error(error);
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    clearInterval(this.interval);
  }

  showNextImage() {
    this.currentImageIndex =
      (this.currentImageIndex + 1) % this.currentPropiedad.imagenes.length;
    if (this.currentImageIndex === 0) {
      this.currentImageIndex = 0;
    }
  }

  sendWhatsAppMessage() {
    const phoneNumber = '+59898470393'; // Replace with your WhatsApp phone number
    const message = `Consulta sobre la propiedad "${this.currentPropiedad.title}":\n\n${this.userQuestion}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
  }

  previousImage() {
    if (this.currentImageIndex > 0) {
      this.currentImageIndex--;
    }
    else {
      this.currentImageIndex = this.currentPropiedad.imagenes.length - 1;
    }
  }

  nextImage() {
    if (this.currentImageIndex < this.currentPropiedad.imagenes.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0;
    }
  }


  formatCurrencyValue(value: number): string {
    return `${value.toFixed(0)}`;
  }

  navigateToProperty(id: any) {
    this.router.navigate(['/ver-propiedad', id]);
    window.scrollTo(0, 0);
  }
}