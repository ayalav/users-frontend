import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/open-api/api/user.service';
import { UserDto } from 'src/open-api';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  userId: string = '';
  user: UserDto = {} as UserDto;
  mode: 'show' | 'edit' | 'create' = 'show';

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      const routeDetails = this.router.url.includes('/details');
      if (id) {
        this.userId = id;
        this.mode = this.router.url.includes('/details') ? 'show' : 'edit';
        this.loadUser();
      }
      else
        this.mode = 'create';
    });
  }

  loadUser() {
    this.userService.getUserById(this.userId).subscribe(user => {
      this.user = user;
    });
  }

  saveUser() {
    if (this.userId) {
      this.userService.updateUserById(this.userId, this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
    else {
      this.userService.createUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    };
  }

  cancel() {
    this.router.navigate(['/users']);
  }
}