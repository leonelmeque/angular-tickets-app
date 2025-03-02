import { Component, Input, output, signal } from '@angular/core';
import { Ticket } from './ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  @Input({ required: true }) data!: Ticket;
  detailsVisible = signal(false);

  closeTicket = output<string>();
  deleteTicket = output<string>();

  onToggleDetails() {
    this.detailsVisible.update((value) => !value);
  }

  onMarkAsComplete() {
    this.closeTicket.emit(this.data.id);
  }

  onDeleteTicket() {
    this.deleteTicket.emit(this.data.id);
  }
}
