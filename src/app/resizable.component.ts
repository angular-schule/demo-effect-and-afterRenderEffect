import { Component, viewChild, ElementRef, signal, afterRenderEffect } from "@angular/core";

@Component({
  selector: 'app-resizable',
  template: `<textarea #myElement style="border: 1px solid black; height: 100px; resize: vertical;">
    Resizable Element
  </textarea>`,
})
export class ResizableComponent {

  myElement = viewChild.required<ElementRef>('myElement');
  extraHeight = signal<number>(0);

  constructor() {

    const effect = afterRenderEffect({

      // The earlyRead phase reads the current offsetHeight
      earlyRead: () => {

        console.warn(`earlyRead executes`);

        // Make `extraHeight` a dependency of `earlyRead`
        // Now this code it will run again whenever `extraHeight` changes
        // Hint: remove this statement, and `earlyRead` will execute only once! 🤯
        console.log('earlyRead: extra height:', this.extraHeight());

        const currentHeight: number = this.myElement()?.nativeElement.offsetHeight;
        console.log('earlyRead: offset height:', currentHeight);

        // Pass the height to the next phase
        return currentHeight;
      },

      // The write phase adjusts the height based on the offsetHeight + extraHeight
      write: (currentHeight, onCleanup) => {

        console.warn(`write executes`);

        // Make `extraHeight` a dependency of `earlyRead`
        const newHeight = currentHeight() + this.extraHeight();
        // Hint: use this code, so that we have no dependendy to a signal that is changed, and `write` will be executed only once
        // const newHeight = currentHeight();

        this.myElement().nativeElement.style.height = `${newHeight}px`;
        console.log('write: written height:', this.extraHeight());


        onCleanup(() => {
          console.log('write: cleanup is called', newHeight);
        });

        // Pass the height to the next phase
        // Hint: pass the same value to `read`, it will not be executed with the same value twice, eg. `return 100`
        return newHeight;
        // return 100;
      },

      // The read phase logs the updated height
      read: (newHeight, onCleanup) => {
        console.warn(`read executes`);
        console.log('read: new height:', newHeight());
      }
    });

    // Trigger a new run every 2 seconds by setting the signal `extraHeight`
    setInterval(() => {
      console.warn('---- new round ----');
      this.extraHeight.update(x => ++x)
    }, 4_000);

    // Try this, if the signal value stays the same, nothing will hapen
    // setInterval(() => this.extraHeight.update(x => x), 4_000);

    // cleanup callbacks are also executed when we destroy the hook
    // we will see the text: 'cleanup is called'
    // setTimeout(() => effect.destroy(), 20_000);
  }
}
