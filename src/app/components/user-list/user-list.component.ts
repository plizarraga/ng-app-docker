import { Component, inject } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  private userService = inject(UserService);
  // users = this.userService.users;
  users = this.userService.getAll();
  selectedUser = this.userService.selectedUser;

  // When a user is selected, emit the selected user id
  onSelected(userId: number): void {
    this.userService.userSelected(userId);
  }

  userTrackBy(index: number, user: User) {
    return user.id;
  }
}