import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

//Material
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';


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
    MatGridListModule,
    MatButtonModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
