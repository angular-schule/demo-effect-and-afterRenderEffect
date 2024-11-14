import { effect, afterRenderEffect, Component, signal } from '@angular/core';

import { DashboardComponent } from './books/dashboard/dashboard.component';
import { ResizableComponent } from './resizable.component';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [DashboardComponent, ResizableComponent]
})
export class AppComponent {

  counter = signal(0);
  showCounter = signal(true);

  constructor() {
    effect(() => {
      console.log(`Current counter value: ${this.counter()}`);
    });

    afterRenderEffect(() => {
      console.log('DOM rendering completed for this component');
    });
  }
}
