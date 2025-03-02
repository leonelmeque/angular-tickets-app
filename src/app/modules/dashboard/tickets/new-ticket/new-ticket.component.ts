import {
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '../../../../components/button/button.component';
import { ControlComponent } from '../../../../components/control/control.component';
import {
  TrackedEvent,
  TrackEventDirective,
} from '../../../../directives/track-event/track-event.directive';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [
    ButtonComponent,
    ControlComponent,
    FormsModule,
    TrackEventDirective,
  ],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent implements OnInit {
  titleValue = signal<string>('');
  requestValue = signal<string>('');
  @ViewChild('form') private readonly form?: ElementRef<HTMLFormElement>;
  @Output() add = new EventEmitter<{ title: string; text: string }>();
  newTicketEvent!: TrackedEvent;

  ngOnInit(): void {}

  onSubmit() {
    this.add.emit({ title: this.titleValue(), text: this.requestValue() });
    this.onClickSubmitButton();
    this.form?.nativeElement.reset();
  }

  onClickSubmitButton() {
    this.newTicketEvent = {
      eventName: 'NEW_SUPPORT_TICKET',
      ticket_name: this.titleValue(),
      ticket_request: this.requestValue(),
    };
  }
}
