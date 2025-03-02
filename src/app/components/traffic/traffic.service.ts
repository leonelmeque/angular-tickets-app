import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TrafficService {
  private readonly dummyTrafficData = [
    {
      id: 'd1',
      value: 433,
    },
    {
      id: 'd2',
      value: 260,
    },
    {
      id: 'd3',
      value: 290,
    },
    {
      id: 'd4',
      value: 410,
    },
    {
      id: 'd5',
      value: 397,
    },
    {
      id: 'd6',
      value: 488,
    },
    {
      id: 'd47',
      value: 589,
    },
  ];

  private readonly maxTraffic = signal<number>(
    Math.max(...this.dummyTrafficData.map((data) => data.value))
  );

  getTrafficData() {
    return this.dummyTrafficData;
  }

  getMaxTraffic() {
    return this.maxTraffic;
  }
}
