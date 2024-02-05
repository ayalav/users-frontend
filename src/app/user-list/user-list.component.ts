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
  viewMode: 'card' | 'table' = 'table';
  displayedColumns: string[] = ['id', 'name', 'email', 'phone', 'actions'];


  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
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

  toggleView(mode: 'card' | 'table') {
    this.viewMode = mode;
  }
}
