import { Component, OnInit } from '@angular/core';
import { baseMongo } from '../../../servicios/baseMongo';
import { departamentos, tipoPropiedad, tipoNegocio } from 'src/app/dataTypes/enums';

interface Card {
  id: any | string;
  title: string;
  price: number;
  location: departamentos;
  tipoPropiedad: tipoPropiedad;
  tipoNegocio: tipoNegocio;
  direccion: string;
  imagenes: string[];
}

@Component({
  selector: 'app-propiedades',
  templateUrl: './propiedades.component.html',
  styleUrls: ['./propiedades.component.css']
})
export class PropiedadesComponent implements OnInit {
  originalCardData: Card[] = []; // Store the original data
  currentCardData: Card[] = []; // Store the filtered data
  loading: boolean = true;
  error: boolean = false;
  selectedTipoPropiedad: tipoPropiedad | null = null;
  selectedDepartamento: departamentos | null = null;
  selectedTipoNegocio: tipoNegocio | null = null;
  tipoPropiedadValues = Object.values(tipoPropiedad);
  departamentosValues = Object.values(departamentos);
  tipoNegocioValues = Object.values(tipoNegocio);

  constructor(private baseMongo: baseMongo) { }

  ngOnInit() {
    this.baseMongo.getListing().subscribe(
      (propiedadesDesdeBackend: any) => {
        this.originalCardData = propiedadesDesdeBackend.map(
          (property: {
            _id: any;
            title: any;
            price: any;
            tipoPropiedad: any;
            tipoNegocio: any;
            imagenes: any;
            location: departamentos;
            direccion: any;
          }) => {
            return {
              id: property._id,
              title: property.title,
              price: property.price,
              tipoPropiedad: property.tipoPropiedad,
              tipoNegocio: property.tipoNegocio,
              location: property.location,
              direccion: property.direccion,
              imagenes: property.imagenes,
            };
          }
        );
        this.filterCards();
        this.loading = false;
      },
      (error) => {
        console.error(error);
        this.loading = false;
        this.error = true;
      }
    );
  }

  onTipoPropiedadChange() {
    this.filterCards();
  }

  onDepartamentoChange() {
    this.filterCards();
  }

  onNegocioChange() {
    this.filterCards();
  }

  filterCards() {
    let filteredData = [...this.originalCardData]; // Start with a copy of the original data

    if (this.selectedTipoPropiedad !== null) {
      filteredData = filteredData.filter((property) =>
        property.tipoPropiedad === this.selectedTipoPropiedad
      );
    }

    if (this.selectedDepartamento !== null) {
      filteredData = filteredData.filter((property) =>
        property.location === this.selectedDepartamento
      );
    }

    if (this.selectedTipoNegocio !== null) {
      filteredData = filteredData.filter((property) =>
        property.tipoNegocio === this.selectedTipoNegocio
      );
    }

    this.currentCardData = filteredData; // Update currentCardData with the filtered results
  }

  formatCurrencyValue(value: number): string {
    return `${value.toFixed(0)}`;
  }
}
