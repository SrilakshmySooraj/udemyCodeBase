import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewOffersPage } from './new-offers.page';

describe('NewOffersPage', () => {
  let component: NewOffersPage;
  let fixture: ComponentFixture<NewOffersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewOffersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
