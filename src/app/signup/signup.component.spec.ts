import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { FormBuilder } from '@angular/forms';

import { SignupComponent } from './signup.component';
import { AuthService } from '../services/auth/auth.service';
import { of } from 'rxjs';


class MockAuthService {
  signup(credentials) {}
}

describe('SignupComponent', () => {

  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let authService: AuthService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [ SignupComponent ],
      providers: [ FormBuilder ]
    })
    .overrideComponent(SignupComponent, {
      set: {
        providers: [
          { provide: AuthService, useClass: MockAuthService }
        ]
      }
    })
    .compileComponents()
    .then(() => {
      fixture = TestBed.createComponent(SignupComponent);
      authService = fixture.debugElement.injector.get(AuthService);
      component = fixture.componentInstance;
      component.ngOnInit();  
    })
  }));

  // create reusable function for a dry spec.
  function updateForm(username, password) {
    component.signupForm.controls['username'].setValue(username);
    component.signupForm.controls['password'].setValue(password);
  }

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid when empty username/password fields', () => {
    expect(component.signupForm.valid).toBeFalsy();
  });

  it('username is invalid', () => {
    expect(component.signupForm.controls['username'].valid).toBeFalsy();
  });

  it('password is invalid', () => {
    expect(component.signupForm.controls['password'].valid).toBeFalsy();
  });

  it('username validator should be true by default', () => {
    expect(component.signupForm.controls['username'].errors).toBeTruthy();
  });

  it('password validator should be true by default', () => {
    expect(component.signupForm.controls['password'].errors).toBeTruthy();
  });

  it('should submit form with valid inputs', () => {
    component.signupForm.controls['username'].setValue('admin');
    component.signupForm.controls['password'].setValue('s3cr3t');
    component.signupForm.controls['dietprefs'].setValue(['BBQ', 'Burger']);
    expect(component.signupForm.valid).toBeTruthy();

    spyOn(authService, 'signup').and.callFake(() => {
      return of({ token: 's3cr3tt0ken' });
    });

    component.signup();

    expect(authService.signup).toHaveBeenCalledWith({
      username: 'admin',
      password: 's3cr3t',
      dietPreferences: ['BBQ', 'Burger']
    });


  });

});
