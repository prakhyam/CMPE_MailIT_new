import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface User {
  id: number;
  email: string;
  role: string;
}


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = []; // To store the user data

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers() {
    const apiUrl = 'YOUR_API_ENDPOINT_FOR_USERS'; // Replace with your API endpoint
    this.http.get<User[]>(apiUrl).subscribe(
      data => {
        this.users = data;
      },
      error => {
        console.error('Error fetching users:', error);
      }
    );
  }

  deleteUser(userId: number) {
    const deleteApiUrl = `YOUR_API_ENDPOINT_FOR_DELETING_USER/${userId}`; // Replace with your API endpoint
    this.http.delete(deleteApiUrl).subscribe(
      response => {
        console.log('User deleted:', response);
        // Optionally, refresh the user list after deletion
        this.fetchUsers();
      },
      error => {
        console.error('Error deleting user:', error);
      }
    );
  }

}
