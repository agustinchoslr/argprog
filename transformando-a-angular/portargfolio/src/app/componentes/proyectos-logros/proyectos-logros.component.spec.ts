import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProyectosLogrosComponent } from './proyectos-logros.component';

describe('ProyectosLogrosComponent', () => {
  let component: ProyectosLogrosComponent;
  let fixture: ComponentFixture<ProyectosLogrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProyectosLogrosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProyectosLogrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
