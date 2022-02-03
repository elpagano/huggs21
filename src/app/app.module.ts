import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { SETTINGS as AUTH_SETTINGS } from '@angular/fire/compat/auth';
import { USE_DEVICE_LANGUAGE } from '@angular/fire/compat/auth';
import { PERSISTENCE } from '@angular/fire/compat/auth';

import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertasComponent } from './alertas/alertas.component';
import { AlertasNotifComponent } from './alertas/alertas-notif/alertas-notif.component';
import { BienvenidaComponent } from './bienvenida/bienvenida.component';
import { MenuComponent } from './global/menu/menu.component';
import { InicioComponent } from './global/inicio/inicio.component';
import { UsuariosComponent } from './global/usuarios/usuarios.component';
import { OpcionesComponent } from './global/opciones/opciones.component';
import { UserProfileComponent } from './global/user-profile/user-profile.component';
import { DirectivesComponent } from './commons/directives/directives.component';
import { InterfacesComponent } from './commons/interfaces/interfaces.component';
import { NotfoundComponent } from './commons/notfound/notfound.component';
import { ProvidersComponent } from './commons/providers/providers.component';
import { UploadsComponent } from './commons/uploads/uploads.component';
import { TomaDatosComponent } from './toma-datos/toma-datos.component';
import { DocumentacionComponent } from './documentacion/documentacion.component';
import { GrupoComponent } from './grupo/grupo.component';
import { GrupoAdminUsuarioComponent } from './grupo/grupo-admin-usuario/grupo-admin-usuario.component';
import { LoginComponent } from './login/login.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { MetricasComponent } from './metricas/metricas.component';
import { PermisosComponent } from './permisos/permisos.component';
import { ProgramacionComponent } from './programacion/programacion.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from "@angular/forms"; //this to use ngModule

@NgModule({
  declarations: [
    AppComponent,
    AlertasComponent,
    AlertasNotifComponent,
    BienvenidaComponent,
    MenuComponent,
    InicioComponent,
    UsuariosComponent,
    OpcionesComponent,
    UserProfileComponent,
    DirectivesComponent,
    InterfacesComponent,
    NotfoundComponent,
    ProvidersComponent,
    UploadsComponent,
    TomaDatosComponent,
    DocumentacionComponent,
    GrupoComponent,
    GrupoAdminUsuarioComponent,
    LoginComponent,
    MensajesComponent,
    MetricasComponent,
    PermisosComponent,
    ProgramacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [{ provide: AUTH_SETTINGS, useValue: { appVerificationDisabledForTesting: true } },
  { provide: USE_DEVICE_LANGUAGE, useValue: true },
  { provide: PERSISTENCE, useValue: 'session' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
