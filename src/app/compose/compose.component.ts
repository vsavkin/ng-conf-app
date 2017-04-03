import 'rxjs/add/operator/pluck';

import {ChangeDetectionStrategy, Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';

@Component({
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComposeComponent {
  form =
    new FormGroup({title: new FormControl('', Validators.required), body: new FormControl('')});

  constructor(private store: Store<any>, private router: Router, private route: ActivatedRoute) {}

  onSubmit() {
    this.store.dispatch({
      type: 'reply',
      payload: this.form.value
    });

    this.router.navigate(['../', {outlets: {popup: null}}], {relativeTo: this.route});
  }
}
