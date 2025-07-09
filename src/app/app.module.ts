import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { IndexComponent } from './componentes/vistas/index/index.component';
import { PropiedadesComponent } from './componentes/vistas/propiedades/propiedades.component';
import { AltaPropiedadComponent } from './componentes/vistas/alta-propiedad/alta-propiedad.component';
import { BajaPropiedadComponent } from './componentes/vistas/baja-propiedad/baja-propiedad.component';
import { VerPropiedadComponent } from './componentes/vistas/ver-propiedad/ver-propiedad.component';
import { EditPropertyModalComponent } from './componentes/vistas/baja-propiedad/edit-property-modal/edit-property-modal.component';
import { DialogAltaComponent } from './componentes/vistas/alta-propiedad/dialogAlta.component';
import { DialogBajaComponent } from './componentes/vistas/baja-propiedad/dialogBaja.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    IndexComponent,
    PropiedadesComponent,
    AltaPropiedadComponent,
    BajaPropiedadComponent,
    VerPropiedadComponent,
    EditPropertyModalComponent,
    DialogAltaComponent,
    DialogBajaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSliderModule,
    MatCardModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDialogModule,
    MatInputModule,
    FontAwesomeModule,   
    

  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
