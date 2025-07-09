import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { baseMongo } from '../../../servicios/baseMongo';
import { tipoNegocio } from 'src/app/dataTypes/enums';

interface Card{
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
export class IndexComponent implements OnInit {
  currentCardData: Card[] = [];
  loading: boolean = true;
  error: boolean = false;

  constructor(private router: Router, private baseMongo: baseMongo) { }

  ngOnInit(): void {
    this.baseMongo.getListing().subscribe(
      (propiedadesDesdeBackend: any) => {
        this.currentCardData = propiedadesDesdeBackend.map(
          (property: {
            _id: any;
            title: any;
            description: any;
            tipoNegocio: any;
            price: any;
            imagenes: any;
          }) => {
            return {
              id: property._id,
              title: property.title,
              description: property.description,
              tipoNegocio: property.tipoNegocio,
              price: property.price,
              imagenes: property.imagenes,
            };
          }
        );
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.error = true;
      }
    );
    setTimeout(() => {
      const contactEmail = document.querySelector('.contact-email');
      if (contactEmail) {
        contactEmail.classList.add('fade-in');
      }
    }, 300); 
  }

  goToPropiedades() {
    this.router.navigateByUrl('/propiedades');
    setTimeout(() => {
      const element = document.getElementById('inicioProp');
      if (element) {
        const offset = 950;
        element.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
        window.scrollBy(0, -offset);
      }
    });
  }

}

