import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let http: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService]
    });
    service = TestBed.get(AuthService);
    http = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('signup', () => {
    it('should return a user object with a valid username and password', () => {
      const user = { 'username': 'myUser', 'password': 'password'};
      const signupResponse = {
        '__v': 0,
        'username': 'myUser',
        'password': '$2a$10$oF7YW1FyOSW3Gw7G4ThbO.ibduCgF3U0gVI/GE9fKQcGtVEBs0B.2',
        '_id': '5a550ea739fbc4ca3ee0ce58',
        'dietPreferences': []
      };
      const loginResponse = { 'token': 's3cr3ttoken' };
      let response;

      service.signup(user).subscribe(res => {
        response = res;
      });
      spyOn(service, 'login').and.callFake(() => of(loginResponse));

      http.expectOne('http://localhost:8080/api/users').flush(signupResponse);
      expect(response).toEqual(loginResponse);
      expect(service.login).toHaveBeenCalled();
      http.verify();
    })
  });
});
