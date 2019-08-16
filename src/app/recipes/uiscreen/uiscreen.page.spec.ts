import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UiscreenPage } from './uiscreen.page';

describe('UiscreenPage', () => {
  let component: UiscreenPage;
  let fixture: ComponentFixture<UiscreenPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiscreenPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiscreenPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
