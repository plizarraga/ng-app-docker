import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { tap } from 'rxjs/internal/operators/tap';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = environment.apiUrl;

  // Retrive the users from the API using RXJS
  // private users$ = this.getAll();

  // Expose the state as a signal
  // users = toSignal(this.getAllUsers(), { initialValue: [] as User[] });
  private users: User[] = [];
  selectedUser = signal<User | undefined>(undefined);

  userSelected(userId: number): void {
    const foundUser = this.users.find((user) => user.id === userId);
    this.selectedUser.set(foundUser);
  }

  getAll() {
    return toSignal(this.getAllUsers(), { initialValue: [] as User[] });
  }

  getById(userId: number) {
    return toSignal(this.getUserById(userId), {
      initialValue: null as User | null,
    });
  }

  // private methods
  private getAllUsers() {
    return this.http.get<User[]>(`${this.apiUrl}/users`).pipe(
      tap((users) => {
        console.log('Users retrieved');
        this.users = users;
      })
    );
  }

  private getUserById(id: number) {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`);
  }
}
