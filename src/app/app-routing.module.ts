import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './componentes/vistas/index/index.component';
import { PropiedadesComponent } from './componentes/vistas/propiedades/propiedades.component';
import { AltaPropiedadComponent } from './componentes/vistas/alta-propiedad/alta-propiedad.component';
import { BajaPropiedadComponent } from './componentes/vistas/baja-propiedad/baja-propiedad.component';
import { VerPropiedadComponent } from './componentes/vistas/ver-propiedad/ver-propiedad.component';
const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'propiedades', component: PropiedadesComponent },
  { path: 'alta-propiedad', component: AltaPropiedadComponent },
  { path: 'baja-propiedad', component: BajaPropiedadComponent },
  { path: 'ver-propiedad/:id', component: VerPropiedadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponents = [IndexComponent];