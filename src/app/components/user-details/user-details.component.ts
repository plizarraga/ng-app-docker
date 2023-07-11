import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  private userService = inject(UserService);
  private route = inject(ActivatedRoute);

  // user$!: Observable<User>;
  user = this.userService.getById(1);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];
      // this.user.set(this.userService.getById(id));
    });
  }
}
