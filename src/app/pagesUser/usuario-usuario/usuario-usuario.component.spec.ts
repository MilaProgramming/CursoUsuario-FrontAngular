import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUsuarioComponent } from './usuario-usuario.component';

describe('UsuarioUsuarioComponent', () => {
  let component: UsuarioUsuarioComponent;
  let fixture: ComponentFixture<UsuarioUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuarioUsuarioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UsuarioUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
