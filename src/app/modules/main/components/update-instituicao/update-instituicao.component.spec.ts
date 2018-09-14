import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInstituicaoComponent } from './update-instituicao.component';

describe('UpdateInstituicaoComponent', () => {
  let component: UpdateInstituicaoComponent;
  let fixture: ComponentFixture<UpdateInstituicaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInstituicaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInstituicaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
