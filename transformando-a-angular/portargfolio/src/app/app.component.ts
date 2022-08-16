import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Persona } from './servicios/persona';
import { PersonaService } from './servicios/persona.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
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
