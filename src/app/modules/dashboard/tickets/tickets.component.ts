import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  inject,
  DestroyRef,
  computed,
  signal,
  Signal,
} from '@angular/core';
import { NewTicketComponent } from './new-ticket/new-ticket.component';
import { TicketComponent } from '../../../components/ticket/ticket.component';
import { TicketsAPIService } from '../../../shared/services/tickets-api.service';
import { Ticket } from '../../../components/ticket/ticket.model';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NewTicketComponent, TicketComponent],
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css'],
})
export class TicketsComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly ticketsAPIService = inject(TicketsAPIService);
  tickets = signal<Ticket[]>([]);
  isLoadingTickets!: Signal<boolean>;
  totalTickets = computed(() => this.tickets().length);

  ngOnInit(): void {
    this.initTickets();
    this.isLoadingTickets = this.ticketsAPIService.ticketsLoadingState();
  }

  private initTickets() {
    const ticketsSubscription = this.ticketsAPIService
      .fetchTickets()
      .subscribe({
        next: (tickets) => {
          this.tickets.set(tickets);
        },
        error: (e) => {
          alert(e);
        },
      });

    this.destroyRef.onDestroy(() => {
      ticketsSubscription.unsubscribe();
    });
  }

  onAdd({ title, text }: { title: string; text: string }): void {
    const subscription = this.ticketsAPIService
      .addTicket({ title, text }, this.tickets())
      .subscribe({
        next: (tickets) => {
          if (tickets) this.tickets.set(tickets);
        },
        error: (e) => {
          alert(e);
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onDeleteTicket(id: string): void {
    const subscription = this.ticketsAPIService
      .deleteTicket(id, this.tickets())
      .subscribe({
        next: (tickets) => {
          this.tickets.set(tickets);
        },
        error: (e) => {
          alert(e);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

  onCloseTicket(id: string): void {
    const subscription = this.ticketsAPIService
      .updateTaskStatus(id, 'closed', this.tickets())
      .subscribe({
        next: (tickets) => {
          if (tickets) this.tickets.set(tickets);
        },
        error: (e) => {
          alert(e);
        },
      });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }
}
