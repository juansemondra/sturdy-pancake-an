import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ListColumn {
  field: any;
  header: string;
}

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent {
  @Input() items: any[] = [];
  @Input() columns: ListColumn[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();

  onEdit(item: any): void {
    this.edit.emit(item);
  }

  onDelete(item: any): void {
    this.delete.emit(item);
  }
}
