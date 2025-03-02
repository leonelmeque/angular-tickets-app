import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

type ServerStatus = 'online' | 'offline' | 'unknown';

@Component({
  selector: 'app-server-status',
  standalone: true,
  imports: [],
  templateUrl: './server-status.component.html',
  styleUrl: './server-status.component.css',
})
export class ServerStatusComponent implements OnInit, OnDestroy {
  currentStatus = signal<ServerStatus>('offline');
  private intervalId?: ReturnType<typeof setInterval>;

  constructor() {
    effect((onCleanup) => {
      // console.log(this.currentStatus());

      onCleanup(() => {
        // console.log(
        //   '%cCleaning up the effects',
        //   'background: blue; color: white; padding: 1rem; font-weight: bold;'
        // );
      });
    });
  }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      const rnd = Math.random();

      if (rnd < 0.5) this.currentStatus.set('online');
      else if (rnd < 0.9) this.currentStatus.set('offline');
      else this.currentStatus.set('unknown');
    }, 3000);
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
