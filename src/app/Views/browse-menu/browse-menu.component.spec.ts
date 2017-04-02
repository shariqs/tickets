import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowseMenuComponent } from './browse-menu.component';

describe('BrowseMenuComponent', () => {
  let component: BrowseMenuComponent;
  let fixture: ComponentFixture<BrowseMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrowseMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrowseMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
