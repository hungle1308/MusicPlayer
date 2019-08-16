import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicOnlinePage } from './music-online.page';

describe('MusicOnlinePage', () => {
  let component: MusicOnlinePage;
  let fixture: ComponentFixture<MusicOnlinePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MusicOnlinePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MusicOnlinePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
