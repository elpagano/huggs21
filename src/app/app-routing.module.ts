import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//modulos
import { NotfoundComponent } from './global/notfound/notfound.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AlertasNotifComponent } from './alertas/alertas-notif/alertas-notif.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { MenuComponent } from './global/menu/menu.component';
import { InicioComponent } from './global/inicio/inicio.component';
import { OpcionesComponent } from './global/opciones/opciones.component';
import { TomaDatosComponent } from './toma-datos/toma-datos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoAdminUsuarioComponent } from './grupo/grupo-admin-usuario/grupo-admin-usuario.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ProgramacionComponent } from './programacion/programacion.component';

const routes: Routes = [
  { path: '', pathMatch: 'full',    component: InicioComponent  },
  { path: 'alertas', component: AlertasComponent },
  { path: 'TomaDatos', component: TomaDatosComponent },
  { path: 'documentacion', component: DocumentacionComponent },
  { path: 'grupos', component: GrupoComponent },
  { path: 'mensajes', component: MensajesComponent },
  { path: 'metricas', component: MetricasComponent },
  { path: 'opciones', component: OpcionesComponent },
  { path: 'permisos', component: PermisosComponent },
  { path: 'programacion', component: ProgramacionComponent },
  { path: 'adminUsuario', component: GrupoAdminUsuarioComponent },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
