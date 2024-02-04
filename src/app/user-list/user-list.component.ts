import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserDto } from 'src/open-api';
import { UserService } from 'src/open-api/api/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: UserDto[] = [];
  filteredUsers: UserDto[] = [];
  searchTerm: string = '';


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
    /* this.users = [
      {
        id: '1',
        name: 'John Doe',
        email: 'aa',
        phone: '123'
      },
      {
        id: '2',
        name: 'Jane Doe',
        email: 'bb',
        phone: '456'
      },
      {
        id: '3',
        name: 'John Smith',
        email: 'cc',
        phone: '789'
      },
      {
        id: '4',
        name: 'Jane Smith',
        email: 'dd',
        phone: '101112'
      }

    ];
    this.filteredUsers = this.users;
    */
  }

  loadUsers() {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
      this.filterUsers();
    });
  }

  filterUsers() {
    this.filteredUsers = this.users.filter(user =>
      user.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  deleteUser(id: string) {
    this.userService.deleteUserById(id).subscribe(() => {
      this.loadUsers();
    });
  }

  editUser(id: string) {
    this.router.navigate(['/user', id]);
  }

  addUser() {
    this.router.navigate(['/user', '']);
  }
}
