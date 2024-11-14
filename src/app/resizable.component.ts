import { Component, viewChild, ElementRef, signal, afterRenderEffect } from "@angular/core";

@Component({
  selector: 'app-resizable',
  template: `<textarea #myElement style="border: 1px solid black; height: 100px; resize: vertical;">
    Resizable Element
  </textarea>`,
})
export class ResizableComponent {

  myElement = viewChild.required<ElementRef>('myElement');
  extraHeight = signal(0);

  constructor() {

    const effect = afterRenderEffect({

      // earlyRead: Captures the current height of the textarea from the DOM.
      earlyRead: (onCleanup) => {

        console.warn(`earlyRead executes`);

        // Make `extraHeight` a dependency of `earlyRead`
        // Now this code it will run again whenever `extraHeight` changes
        // Hint: remove this statement, and `earlyRead` will execute only once!
        console.log('earlyRead: extra height:', this.extraHeight());

        const currentHeight: number = this.myElement()?.nativeElement.offsetHeight;
        console.log('earlyRead: offset height:', currentHeight);

        // Pass the height to the next effect
        return currentHeight;
      },

      // write: Sets the new height by adding `extraHeight` to the captured DOM height.
      write: (currentHeight, onCleanup) => {

        console.warn(`write executes`);

        // Make `extraHeight` a dependency of `write`
        // Hint: change this code to `const newHeight = currentHeight();`,
        // so that we have no dependency to a signal that is changed, and `write` will be executed only once
        // Hint 2: if `currentHeight` changes in `earlyRead`, `write` will re-run, too.
        // resize the textarea manually to achieve this
        const newHeight = currentHeight() + this.extraHeight();

        this.myElement().nativeElement.style.height = `${newHeight}px`;
        console.log('write: written height:', newHeight);

        onCleanup(() => {
          console.log('write: cleanup is called', newHeight);
        });

        // Pass the height to the next effect
        // Hint: pass the same value to `read`, e.g. `return 100`, to see how `read` is skipped
        return newHeight;
      },

      // The read effect logs the updated height
      read: (newHeight, onCleanup) => {
        console.warn('read executes');
        console.log('read: new height:', newHeight());
      }
    });

    // Trigger a new run every 4 seconds by setting the signal `extraHeight`
    setInterval(() => {
      console.warn('---- new round ----');
      this.extraHeight.update(x => ++x)
    }, 4_000);

    // Try this, if the signal value stays the same, nothing will happen
    // setInterval(() => this.extraHeight.update(x => x), 4_000);

    // cleanup callbacks are also executed when we destroy the hook
    // setTimeout(() => effect.destroy(), 20_000);
  }
}
