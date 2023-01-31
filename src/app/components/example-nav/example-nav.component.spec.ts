import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleNavComponent } from './example-nav.component';

describe('ExampleNavComponent', () => {
  let component: ExampleNavComponent;
  let fixture: ComponentFixture<ExampleNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExampleNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExampleNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
