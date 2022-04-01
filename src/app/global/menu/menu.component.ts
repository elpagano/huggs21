import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(public router: Router,) { }
  
  selected = '';
  alertas = [
    { text: 'Inicio',         url: '/',             icon: 'home',               color: '#008293' },
    { text: 'Grupos',         url: '/grupos',       icon: 'supervisor_account', color: '#48C' },
    { text: 'Programación',   url: '/programacion', icon: 'dashboard',          color: '#25f'/*disabled: true*/ },
    { text: 'Documentación',  url: 'documentacion', icon: 'snippet_folder',     color: '#5500ff' },
    { text: 'Alertas',        url: 'alertas',       icon: 'crisis_alert',       color: '#ff0064' },
    { text: 'Metricas',       url:'metricas',       icon: 'pie_chart',          color: '#00bad4'},
    { text: 'Datos',          url:'TomaDatos',      icon: 'assignment',         color: '#0000d4'},
    { text: 'Opciones',       url: 'opciones',      icon: 'settings_suggest',   color: '#00d49f' },
  ];

  dropdown = [
    { text: 'Diagnostico', url: '/TomaDatos', icon: './assets/icon/home.svg' },
    { text: 'CIA', url: '/TomaDatos', icon: './assets/icon/grupos.svg' },
    { text: 'Form', url: '/TomaDatos', icon: './assets/icon/programacion.svg'/*disabled: true*/ },
  ];
}


