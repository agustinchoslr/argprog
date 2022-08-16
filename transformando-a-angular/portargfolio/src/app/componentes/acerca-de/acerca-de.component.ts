import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/servicios/persona';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {
  public personas: Persona[] | undefined;

  constructor(private personaService: PersonaService) {}

  ngOnInit() {
    this.getPersonas();
    
  }

  public getPersonas(): void {
    this.personaService.getPersonas().subscribe(
    (response: Persona[]) => {
      this.personas = response;
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
}



