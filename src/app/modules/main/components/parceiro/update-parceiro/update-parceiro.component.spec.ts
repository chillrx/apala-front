import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateParceiroComponent } from './update-parceiro.component';

describe('UpdateParceiroComponent', () => {
  let component: UpdateParceiroComponent;
  let fixture: ComponentFixture<UpdateParceiroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateParceiroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateParceiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
