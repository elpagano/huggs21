import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/compat/auth-guard';

import { NotfoundComponent } from './global/notfound/notfound.component';
import { AlertasComponent } from './alertas/alertas.component';
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
  { path: 'alertas', component: AlertasComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'TomaDatos', component: TomaDatosComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'documentacion', component: DocumentacionComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'grupos', component: GrupoComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'mensajes', component: MensajesComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'metricas', component: MetricasComponent , canActivate: [AngularFireAuthGuard] },
  { path: 'opciones', component: OpcionesComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'permisos', component: PermisosComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'programacion', component: ProgramacionComponent, canActivate: [AngularFireAuthGuard]  },
  { path: 'adminUsuario', component: GrupoAdminUsuarioComponent , canActivate: [AngularFireAuthGuard] },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
