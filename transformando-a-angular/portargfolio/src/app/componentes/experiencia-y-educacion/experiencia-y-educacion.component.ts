import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core'
import { ExperienciaService } from 'src/app/servicios/experiencia.service';
import { Experiencia } from 'src/app/servicios/experiencia';
import { Educacion } from 'src/app/servicios/educacion';
import { EducacionService } from 'src/app/servicios/educacion.service';

@Component({
  selector: 'app-experiencia-y-educacion',
  templateUrl: './experiencia-y-educacion.component.html',
  styleUrls: ['./experiencia-y-educacion.component.css']
})
export class ExperienciaYEducacionComponent implements OnInit {
  public experiencias: Experiencia[] | undefined;
    public educaciones: Educacion[] | undefined;

  constructor(
    private experienciaService: ExperienciaService, 
    private educacionService: EducacionService) {}

  ngOnInit() {
    this.getExperiencias();
    this.getEducaciones();
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
}