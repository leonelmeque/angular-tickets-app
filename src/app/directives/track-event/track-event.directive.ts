import { Directive, ElementRef, Input, NgZone } from '@angular/core';

export interface TrackedEvent {
  eventName: string;
  [key: string]: unknown;
}

@Directive({
  selector: '[withTrackEvent]',
  standalone: true,
  host: {
    '(click)': 'onClick($event)',
  },
})
export class TrackEventDirective {
  @Input({ required: true }) withTrackEvent!: TrackedEvent;

  constructor(
    private readonly e: ElementRef,
    private readonly ngZone: NgZone
  ) {}

  onClick() {
    this.ngZone.runOutsideAngular(() => {
      setTimeout(() => {
        this.ngZone.run(() => {
          this.trackEvent();
        });
      });
    });
  }

  private trackEvent() {
    if (!this.withTrackEvent) {
      console.error('Event not sent because its empty');
      return;
    }
    console.log('Event tracked:', this.withTrackEvent);
  }
}
