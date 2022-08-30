import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/app/servicios/skill';
import { SkillService } from 'src/app/servicios/skill.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  public skills: Skill[] | undefined;

  constructor(private skillService: SkillService) {}

  ngOnInit() {
    this.getSkills();
    
  }

  public getSkills(): void {
    this.skillService.getSkills().subscribe(
    (response: Skill[]) => {
      this.skills = response;
    },
    (error:HttpErrorResponse) => {
      alert(error.message);
    }
    );
  }
}