import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadFolderPage } from './load-folder.page';

describe('LoadFolderPage', () => {
  let component: LoadFolderPage;
  let fixture: ComponentFixture<LoadFolderPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadFolderPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadFolderPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
