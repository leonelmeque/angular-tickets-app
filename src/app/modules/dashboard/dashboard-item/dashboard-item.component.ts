import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  host: {
    class: 'dashboard-item',
  },
})
export class DashboardItemComponent {
  @Input({ required: true }) imgURL!: string;
  @Input({ required: true }) headerTitle!: string;
  @Input({ required: true }) imgAlt!: string;
}
