import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { baseMongo } from '../../../../servicios/baseMongo';
import { MatSnackBarConfig, MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarStatus } from 'src/app/dataTypes/enums';

@Component({
  selector: 'app-edit-property-modal',
  templateUrl: './edit-property-modal.component.html',
  styleUrls: ['./edit-property-modal.component.css']
})
export class EditPropertyModalComponent {
  property: any;
  newImageLink: string = ''; 
  tempImagenes: string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditPropertyModalComponent>,
    private baseMongo: baseMongo,
    private snackBar: MatSnackBar
  ) {
    this.property = { ...data.property };
    this.tempImagenes = [...this.property.imagenes];
  }
  

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    // Asignar tempImagenes a property.imagenes
    this.property.imagenes = [...this.tempImagenes];
  
    this.baseMongo.updateListing(this.property._id, this.property).subscribe(
      () => {
        this.showSnackBar('Propiedad actualizada', SnackBarStatus.SUCCESS);
        this.dialogRef.close();
      },
      (error) => {
        this.showSnackBar('Error al actualizar la propiedad', SnackBarStatus.ERROR);
        console.error(error);
      }
    );
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
