import { HttpErrorResponse } from '@angular/common/http';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Persona } from 'src/app/servicios/persona';
import { PersonaService } from 'src/app/servicios/persona.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css']
})

export class AcercaDeComponent implements OnInit {
  public personas: Persona[] | undefined;
  public editPersona: Persona | undefined;

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

  public onUpdatePersona(persona: Persona): void{
    this.personaService.updatePersona(persona).subscribe(
      (response: Persona)=> {
        console.log(response);
        this.getPersonas();
      },
      (error: HttpErrorResponse)=> {
        alert(error.message);
      }
    );
  }

  public onOpenModal(persona: Persona, mode: string): void {
    const container = document.getElementById('contenedor-persona');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {
      button.setAttribute('data-target', '#addPersonaModal');
    }
  if (mode === 'edit') {
    this.editPersona = persona;
    button.setAttribute('data-target', '#updatePersonaModal');
  }
  if (mode === 'delete') {
    button.setAttribute('data-target', '#deletePersonaModal');
  }
  container?.appendChild(button);
  button.click();
  }
}

