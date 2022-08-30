import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Proyecto } from 'src/app/servicios/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos-logros',
  templateUrl: './proyectos-logros.component.html',
  styleUrls: ['./proyectos-logros.component.css']
})
export class ProyectosLogrosComponent implements OnInit {
  public proyectos: Proyecto[] | undefined;

  constructor(private proyectoService: ProyectoService) {}

  ngOnInit() {
    this.getProyectos();
    
  }

  public getProyectos(): void {
    this.proyectoService.getProyectos().subscribe(
    (response: Proyecto[]) => {
      this.proyectos = response;
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
}