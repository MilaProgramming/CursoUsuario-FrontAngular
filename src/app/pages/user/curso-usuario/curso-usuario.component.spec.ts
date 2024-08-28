import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursoUsuarioComponent } from './curso-usuario.component';

describe('CursoUsuarioComponent', () => {
  let component: CursoUsuarioComponent;
  let fixture: ComponentFixture<CursoUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CursoUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CursoUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
