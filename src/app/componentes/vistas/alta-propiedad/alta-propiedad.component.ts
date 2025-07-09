import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { baseMongo } from '../../../servicios/baseMongo';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarStatus, departamentos, tipoPropiedad, tipoNegocio } from 'src/app/dataTypes/enums';
import { MatDialog } from '@angular/material/dialog';
import { DialogAltaComponent } from './dialogAlta.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-alta-propiedad',
  templateUrl: './alta-propiedad.component.html',
  styleUrls: ['./alta-propiedad.component.css']
})
export class AltaPropiedadComponent implements OnInit {
  altaPropiedadForm!: FormGroup;
  tipoPropiedad: string[] = Object.values(tipoPropiedad);
  location: string[] = Object.values(departamentos);
  tipoNegocio: string[] = Object.values(tipoNegocio);
  propiedadSeleccionada: number = 0;

  constructor(private baseMongo: baseMongo, private formBuilder: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router) { }

  ngOnInit() {
    this.altaPropiedadForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      location: ['', Validators.required],
      tipoPropiedad: ['', Validators.required],
      tipoNegocio: ['', Validators.required],
      direccion: ['', Validators.required],
      esquina: ['', Validators.required],
      imagenes: new FormControl([]),
    });

    // Mostrar el cuadro de diálogo al cargar la página
    const dialogRef = this.dialog.open(DialogAltaComponent, {
      width: '300px',
      data: { question: 'Ingresa la palabra clave para acceder:' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // El usuario ha ingresado la palabra clave correcta, redirige a la página deseada
        this.router.navigate(['alta-propiedad']); // Reemplaza '/ruta-deseada' con la ruta real
      } else {
        // El usuario ha ingresado una palabra clave incorrecta o ha cancelado, redirige al índice
        this.router.navigate(['']); // Reemplaza '/index' con la ruta real de tu índice
      }
    });

  }

  validateImageUrls(control: AbstractControl) { // Use AbstractControl instead of FormControl
    const value = control.value;
    if (!Array.isArray(value)) {
      return { invalidFormat: true };
    }

    const validUrls = value.every(url => typeof url === 'string' && url.trim() !== '');

    return validUrls ? null : { invalidUrls: true };
  }


  submitForm() {
    if (this.altaPropiedadForm.valid) {
      const formData = this.altaPropiedadForm.value;

      // Convert the comma-separated URLs to an array
      formData.imagenes = formData.imagenes.split(',').map((url: string) => url.trim());

      this.baseMongo.postListing(formData).subscribe(
        (data: any) => {
          this.showSnackBar('Propiedad agregada con éxito', SnackBarStatus.SUCCESS);
          this.altaPropiedadForm.reset();
        },
        (error: any) => {
          this.showSnackBar('Error al agregar propiedad', SnackBarStatus.ERROR);
          console.log(error);
        }
      );
    }
  }

  seleccionarPropiedad(value: number) {
    this.propiedadSeleccionada = value;
  }

  showSnackBar(message: string, status: SnackBarStatus): void {
    const config: MatSnackBarConfig = {
      duration: 5000, // Duración de la notificación en milisegundos
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Cerrar', config);
  }
}
