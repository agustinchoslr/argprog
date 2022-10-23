import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Experiencia } from 'src/app/servicios/experiencia';
import { Educacion } from 'src/app/servicios/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/user-security/servicios/token.service';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {
  public experiencias: Experiencia[] | undefined;
  public editExperiencia: Experiencia | undefined;  
  public deleteExperiencia: Experiencia | undefined;
    public educaciones: Educacion[] | undefined;
    public editEducacion: Educacion | undefined;  
    public deleteEducacion: Educacion | undefined;
    
    isLogged = false;

  constructor(
    private experienciaService: ExperienciaService, 
    private educacionService: EducacionService,
    private tokenService: TokenService) {}

  ngOnInit() {
    this.getExperiencias();
    this.getEducaciones();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }
    else {
      this.isLogged =false;
    }
    
  }

  public getExperiencias(): void {
    this.experienciaService.getExperiencias().subscribe(
(response: Experiencia[]) => {
  this.experiencias = response;
},
(error:HttpErrorResponse) => {
  alert(error.message);
},
    );
  }
 

  public getEducaciones(): void {
    this.educacionService.getEducaciones().subscribe(
(response: Educacion[]) => {
  this.educaciones = response;
},
(error:HttpErrorResponse) => {
  alert(error.message);
}
    );
  }

  public onOpenModal(experiencia: Experiencia, mode:string): void {
    const container = document.getElementById('experiencias-button-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {      
    button.setAttribute('data-target', '#addExperienciaModal');
    }
    if (mode === 'edit') {      
      this.editExperiencia = experiencia;
      button.setAttribute('data-target', '#updateExperienciaModal');
      }
      if (mode === 'delete') {     
        this.deleteExperiencia = experiencia; 
        button.setAttribute('data-target', '#deleteExperienciaModal');
        }
    container?.appendChild(button);
    button.click();
  }

  
  public onOpenModalEduc(educacion: Educacion, mode:string): void {
    const container = document.getElementById('educaciones-button-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {      
    button.setAttribute('data-target', '#addEducacionModal');
    }
    if (mode === 'edit') {      
      this.editEducacion = educacion;
      button.setAttribute('data-target', '#updateEducacionModal');
      }
      if (mode === 'delete') {     
        this.deleteEducacion = educacion; 
        button.setAttribute('data-target', '#deleteEducacionModal');
        }
    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addform: NgForm): void  {
    document.getElementById('exp-button-close')?.click();
    this.experienciaService.addExperiencia(addform.value).subscribe(
      (response : Experiencia) => {
        console.log(response);
        this.getExperiencias();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onAddEducacion(addform: NgForm): void  {
    document.getElementById('educ-button-close')?.click();
    this.educacionService.addEducacion(addform.value).subscribe(
      (response : Educacion) => {
        console.log(response);
        this.getEducaciones();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateExperiencia(experiencia: Experiencia): void  {
    this.experienciaService.updateExperiencia(experiencia).subscribe(
      (response : Experiencia) => {
        console.log(response);
        this.getExperiencias();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onUpdateEducacion(educacion: Educacion): void  {
    this.educacionService.updateEducacion(educacion).subscribe(
      (response : Educacion) => {
        console.log(response);
        this.getEducaciones();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteExperiencia(experienciaId: number): void  {
    this.experienciaService.deleteExperiencia(experienciaId).subscribe(
      (response : void) => {
        console.log(response);
        this.getExperiencias();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  
  public onDeleteEducacion(educacionId: number): void  {
    this.educacionService.deleteEducacion(educacionId).subscribe(
      (response : void) => {
        console.log(response);
        this.getEducaciones();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}