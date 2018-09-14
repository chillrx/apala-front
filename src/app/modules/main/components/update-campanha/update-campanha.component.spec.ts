import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCampanhaComponent } from './update-campanha.component';

describe('AddCampanhaComponent', () => {
  let component: AddCampanhaComponent;
  let fixture: ComponentFixture<AddCampanhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCampanhaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCampanhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
