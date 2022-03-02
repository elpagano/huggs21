import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent{

  constructor() { }
selected = '';
  alertas = [
    {text: 'Inicio',        url:'/',              icon: './assets/icon/home.svg'},
    {text: 'Grupos',        url:'/grupos',        icon: './assets/icon/grupos.svg'},
    {text: 'Programa',      url:'/programacion',  icon: './assets/icon/programacion.svg'/*disabled: true*/},
    {text: 'Documentacion', url:'documentacion',  icon: './assets/icon/documentacion.svg'},
    {text: 'Alertas',       url:'alertas',        icon: './assets/icon/alertas.svg'},
  // {text: 'Mensajes',      url:'mensajes',       icon: './assets/icon/mensajes.svg'},
  // {text: 'Metricas',      url:'metricas',       icon: './assets/icon/metricas.svg'},
  // {text: 'Datos',         url:'TomaDatos',      icon: './assets/icon/datos.svg'},
    {text: 'Opciones',      url:'opciones',       icon: './assets/icon/opciones.svg'},
  ];

  dropdown = [
    {text: 'Diagnostico',        url:'/TomaDatos',              icon: './assets/icon/home.svg'},
    {text: 'CIA',                url:'/TomaDatos',        icon: './assets/icon/grupos.svg'},
    {text: 'Form',               url:'/TomaDatos',  icon: './assets/icon/programacion.svg'/*disabled: true*/},
  ];
}
 

