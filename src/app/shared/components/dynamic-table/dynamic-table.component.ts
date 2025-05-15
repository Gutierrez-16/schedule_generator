import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

export interface TableConfig {
  showSearch?: boolean;
  showCheckboxes?: boolean;
  hidePageSize?: boolean;
  pageSizeOptions?: number[];
  searchPlaceholder: string;
}

@Component({
  selector: 'app-dynamic-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
  ],
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.css'],
})
export class DynamicTableComponent {
  @Input() data: any[] = [];
  @Input() columns: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() isLoading = false;
  @Input() config: TableConfig = {
    showSearch: true,
    showCheckboxes: false,
    hidePageSize: false,
    pageSizeOptions: [5, 10, 20, 30],
    searchPlaceholder: 'Buscar...',
  };
  @Input() pageSize = 10;
  @Input() currentPage = 1;
  @Input() totalItems = 0;
  @Input() selectedItems: any[] = [];

  @Output() pageChange = new EventEmitter<number>();
  @Output() pageSizeChange = new EventEmitter<number>();
  @Output() searchChange = new EventEmitter<string>();
  @Output() rowSelect = new EventEmitter<{ item: any; selected: boolean }>();
  @Output() selectAll = new EventEmitter<boolean>();

  searchValue = '';

  onSearch(event: Event): void {
    this.searchValue = (event.target as HTMLInputElement).value;
    this.searchChange.emit(this.searchValue);
  }

  onPageChange(event: any): void {
    this.pageChange.emit(event.pageIndex + 1);
  }

  onPageSizeChange(event: any): void {
    this.pageSizeChange.emit(event.pageSize);
  }

  isSelected(item: any): boolean {
    return this.selectedItems.includes(item);
  }

  onRowSelectChange(item: any, selected: boolean): void {
    this.rowSelect.emit({ item, selected });
  }

  onSelectAllChange(selected: boolean): void {
    this.selectAll.emit(selected);
  }

  allSelected(): boolean {
    return (
      this.data.length > 0 && this.selectedItems.length === this.data.length
    );
  }
}
