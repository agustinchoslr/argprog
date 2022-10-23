import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Skill } from 'src/app/servicios/skill';
import { SkillService } from 'src/app/servicios/skill.service';
import { TokenService } from 'src/app/user-security/servicios/token.service';

@Component({
  selector: 'app-aptitudes',
  templateUrl: './aptitudes.component.html',
  styleUrls: ['./aptitudes.component.css']
})
export class AptitudesComponent implements OnInit {
  public skills: Skill[] | undefined;
  public editSkill: Skill | undefined;  
  public deleteSkill: Skill | undefined;

  isLogged = false;

  constructor(private skillService: SkillService,
     private tokenService: TokenService) {}

  ngOnInit() {
    this.getSkills();
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }    
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

  
  public onOpenModal(skill: Skill, mode:string): void {
    const container = document.getElementById('skills-button-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    if (mode === 'add') {      
    button.setAttribute('data-target', '#addSkillModal');
    }
    if (mode === 'edit') {      
      this.editSkill = skill;
      button.setAttribute('data-target', '#updateSkillModal');
      }
      if (mode === 'delete') {     
        this.deleteSkill = skill; 
        button.setAttribute('data-target', '#deleteSkillModal');
        }
    container?.appendChild(button);
    button.click();
  }

  public onAddSkill(addform: NgForm): void  {
    document.getElementById('skill-button-close')?.click();
    this.skillService.addSkill(addform.value).subscribe(
      (response : Skill) => {
        console.log(response);
        this.getSkills();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onUpdateSkill(skill: Skill): void  {
    this.skillService.updateSkill(skill).subscribe(
      (response : Skill) => {
        console.log(response);
        this.getSkills();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public onDeleteSkill(skillId: number): void  {
    this.skillService.deleteSkill(skillId).subscribe(
      (response : void) => {
        console.log(response);
        this.getSkills();
      },
      (error : HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
  
}