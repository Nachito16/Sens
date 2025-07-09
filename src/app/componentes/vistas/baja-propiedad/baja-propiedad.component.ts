import { Component, OnInit } from '@angular/core';
import { baseMongo } from '../../../servicios/baseMongo';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/dataTypes/enums';
import { MatDialog } from '@angular/material/dialog';
import { EditPropertyModalComponent } from './edit-property-modal/edit-property-modal.component';
import { Router } from '@angular/router';
import { DialogBajaComponent } from './dialogBaja.component';

@Component({
  selector: 'app-baja-propiedad',
  templateUrl: './baja-propiedad.component.html',
  styleUrls: ['./baja-propiedad.component.css']
})
export class BajaPropiedadComponent implements OnInit {
  properties: any[] = [];

  constructor(private baseMongo: baseMongo, private snackBar: MatSnackBar, private dialog: MatDialog, private router: Router, ) { }

  ngOnInit() {
    this.fetchProperties();

    // Mostrar el cuadro de diálogo al cargar la página
    const dialogRef = this.dialog.open(DialogBajaComponent, {
      width: '300px',
      data: { question: 'Ingresa la palabra clave para acceder:' },
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        // El usuario ha ingresado la palabra clave correcta, redirige a la página deseada
        this.router.navigate(['baja-propiedad']); // Reemplaza '/ruta-deseada' con la ruta real
      } else {
        // El usuario ha ingresado una palabra clave incorrecta o ha cancelado, redirige al índice
        this.router.navigate(['']); // Reemplaza '/index' con la ruta real de tu índice
      }
    });
  }

  fetchProperties() {
    this.baseMongo.getListing().subscribe(
      (data: any) => {
        this.properties = data;
        console.log(this.properties);
      },
      (error) => {
        console.error(error);
        this.showSnackBar('Error fetching properties', SnackBarStatus.ERROR);
      }
    );
  }
  
  deleteListing(propertyId: string) {
    const isConfirmed = confirm('¿Está seguro de que desea eliminar esta propiedad?');
  
    if (isConfirmed) {
      // El usuario ha confirmado la eliminación, procede a eliminar la propiedad
      this.properties.splice(this.properties.findIndex(property => property._id === propertyId), 1);
      console.log(this.properties);
      console.log(propertyId);
      this.baseMongo.deleteListing(propertyId).subscribe(
        () => {
          this.showSnackBar('Property deleted successfully', SnackBarStatus.SUCCESS);
          this.fetchProperties(); // Fetch properties again to update the list
        },
        (error) => {
          console.error(error);
          this.showSnackBar('Error deleting property', SnackBarStatus.ERROR);
        }
      );
    }
  }

  editListing(propertyId: string) {
    const property = this.properties.find(p => p._id === propertyId);
    if (property) {
      const dialogRef = this.dialog.open(EditPropertyModalComponent, {
        width: '700px',
        height: '600px',
        data: { property: property }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.fetchProperties();
      });
    }
  }

  showSnackBar(message: string, status: SnackBarStatus): void {
    const config: MatSnackBarConfig = {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Cerrar', config);
  }
}
