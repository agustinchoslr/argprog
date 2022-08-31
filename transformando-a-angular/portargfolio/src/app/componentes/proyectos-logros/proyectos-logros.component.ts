import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proyecto } from 'src/app/servicios/proyecto';
import { ProyectoService } from 'src/app/servicios/proyecto.service';

@Component({
  selector: 'app-proyectos-logros',
  templateUrl: './proyectos-logros.component.html',
  styleUrls: ['./proyectos-logros.component.css']
})
export class ProyectosLogrosComponent implements OnInit {
  public proyectos: Proyecto[] | undefined;  
  public editProyecto: Proyecto | undefined;  
  public deleteProyecto: Proyecto | undefined;

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

  
  
  public onOpenModal(proyecto: Proyecto, mode:string): void {
    const container = document.getElementById('proyectos-button-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {      
    button.setAttribute('data-target', '#addProyectoModal');
    }
    if (mode === 'edit') {      
      this.editProyecto = proyecto;
      button.setAttribute('data-target', '#updateProyectoModal');
      }
      if (mode === 'delete') {     
        this.deleteProyecto = proyecto; 
        button.setAttribute('data-target', '#deleteProyectoModal');
        }
    container?.appendChild(button);
    button.click();
  }

  public onAddProyecto(addform: NgForm): void  {
    document.getElementById('proyecto-button-close')?.click();
    this.proyectoService.addProyecto(addform.value).subscribe(
      (response : Proyecto) => {
        console.log(response);
        this.getProyectos();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateProyecto(proyecto: Proyecto): void  {
    this.proyectoService.updateProyecto(proyecto).subscribe(
      (response : Proyecto) => {
        console.log(response);
        this.getProyectos();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteProyecto(proyectoId: number): void  {
    this.proyectoService.deleteProyecto(proyectoId).subscribe(
      (response : void) => {
        console.log(response);
        this.getProyectos();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

}