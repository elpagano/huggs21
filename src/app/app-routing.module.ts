import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo  } from '@angular/fire/compat/auth-guard';

//modulos
import { NotfoundComponent } from './global/notfound/notfound.component';
import { AlertasComponent } from './alertas/alertas.component';
import { AlertasNotifComponent } from './alertas/alertas-notif/alertas-notif.component';
import { LoginComponent } from './login/login.component';

import { InicioComponent } from './inicio/inicio.component';
import { OpcionesComponent } from './opciones/opciones.component';
import { TomaDatosComponent } from './toma-datos/toma-datos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoAdminUsuarioComponent } from './grupo/grupo-admin-usuario/grupo-admin-usuario.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ProgramacionComponent } from './programacion/programacion.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToItems = () => redirectLoggedInTo(['alertas']);
//const belongsToAccount = (next) => hasCustomClaim(`account-${next.params.id}`);

const routes: Routes = [
  { path: '', pathMatch: 'full',    component: InicioComponent  },
  { path: 'login', component: LoginComponent,        canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToItems }},
  { path: 'alertas', component: AlertasComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'TomaDatos', component: TomaDatosComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'documentacion', component: DocumentacionComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'grupos', component: GrupoComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'mensajes', component: MensajesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'metricas', component: MetricasComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: 'opciones', component: OpcionesComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'permisos', component: PermisosComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'programacion', component: ProgramacionComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin }  },
  { path: 'adminUsuario', component: GrupoAdminUsuarioComponent , canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin } },
  { path: '**', component: NotfoundComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
