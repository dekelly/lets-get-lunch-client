import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../services/auth/auth.service";
import { User } from '../services/auth/user';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  dietPreferences: string[] = ['BBQ', 'Burger', 'Chinese', 'Deli', 'Fast Food', 'Italian', 'Japanese', 'Mexican', 'Pizza'];
  signupForm: FormGroup;
  formValid: boolean = false;
  errorMessage: string;

  constructor(private fb: FormBuilder, private auth: AuthService) {}

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      dietprefs: ['']
    });
  }

  signup() {
    const usern = this.signupForm.get('username').value;
    const pwd = this.signupForm.get('password').value;
    const prefs = this.signupForm.get('dietprefs').value;
    const user: User = { 'username': usern, 'password': pwd, 'dietPreferences': prefs };
    this.auth.signup(user).subscribe(res => {
      console.log('res ', res)
    }, err => {
      this.errorMessage = err.error.message;
    });
  }

}
