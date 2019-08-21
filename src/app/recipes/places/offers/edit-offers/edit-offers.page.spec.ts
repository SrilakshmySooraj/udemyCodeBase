import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditOffersPage } from './edit-offers.page';

describe('EditOfferPage', () => {
  let component: EditOffersPage;
  let fixture: ComponentFixture<EditOffersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditOffersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditOffersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
