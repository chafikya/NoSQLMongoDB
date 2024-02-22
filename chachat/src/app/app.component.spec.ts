import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

<<<<<<<< HEAD:chachat/src/app/app.component.spec.ts
  it(`should have as title 'chachat'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('chachat');
========
  it(`should have the '<%= name %>' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('<%= name %>');
>>>>>>>> 904eca4236832d1fedaf14625da3175d3c89de7b:Chachachat/node_modules/@schematics/angular/application/files/standalone-files/src/app/app.component.spec.ts.template
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
<<<<<<<< HEAD:chachat/src/app/app.component.spec.ts
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, chachat');
========
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, <%= name %>');
>>>>>>>> 904eca4236832d1fedaf14625da3175d3c89de7b:Chachachat/node_modules/@schematics/angular/application/files/standalone-files/src/app/app.component.spec.ts.template
  });
});
