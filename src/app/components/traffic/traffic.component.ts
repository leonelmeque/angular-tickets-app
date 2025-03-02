import { Component, inject } from '@angular/core';
import { TrafficService } from './traffic.service';

@Component({
  selector: 'app-traffic',
  standalone: true,
  imports: [],
  templateUrl: './traffic.component.html',
  styleUrl: './traffic.component.css',
})
export class TrafficComponent {
  private readonly trafficService = inject(TrafficService);

  get trafficData() {
    return this.trafficService.getTrafficData();
  }

  get maxTraffic() {
    return this.trafficService.getMaxTraffic();
  }
}
