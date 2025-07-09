import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SnackBarStatus } from 'src/app/dataTypes/enums';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
@Component({
  selector: 'app-dialog',
  templateUrl: './dialogAlta.component.html',
  styleUrls: ['./dialogAlta.component.css'],
})
export class DialogAltaComponent {
  keyword: string = ''; // Variable para almacenar la palabra clave ingresada por el usuario

  constructor(
    public dialogRef: MatDialogRef<DialogAltaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { question: string },
    private snackBar: MatSnackBar
  ) { }

  checkKeyword() {
    if (this.keyword === 'StevenPinker') {
      this.dialogRef.close(true);
      this.showSnackBar('Palabra clave correcta', SnackBarStatus.SUCCESS);
    } else {
      this.keyword = '';
      this.showSnackBar('Palabra clave incorrecta, intente de nuevo', SnackBarStatus.ERROR);
    }
  }

  closeDialog(): void {
    this.dialogRef.close(false);
  }

  showSnackBar(message: string, status: SnackBarStatus): void {
    const config: MatSnackBarConfig = {
      duration: 3000, // Duración de la notificación en milisegundos
      horizontalPosition: 'end',
      verticalPosition: 'top',
    };
    this.snackBar.open(message, 'Cerrar', config);
  }
}
