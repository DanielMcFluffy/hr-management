import { Component, Input, ViewChild } from '@angular/core';
import {MatPaginator, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatTable, MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'detail-table',
  standalone: true,
  imports: [MatPaginatorModule, MatTable, MatTableModule, MatButtonModule],
  templateUrl: './detail-table.component.html',
  styleUrl: './detail-table.component.scss'
})
export class DetailTableComponent {
  @Input() data: any;


  // @ViewChild('paginator', { static: true }) paginator: MatPaginator;
  dataSource = new MatTableDataSource([]);
  displayedColumns: string[] = ["test", "this"]
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;


getPagedData() {
    // const search = {
    //   // ... set filters here
    // };

    // this.searching = true;
    // this.service.search(search).subscribe({
    //   next: ((results) => {
    //     this.totalRecords = results?.length ? results[0].totalRecords : 0;
    //     this.dataSource.data = results || [];
    //   }),
    //   complete: () => this.searching = false,
    //   error: () => this.searching = false,
    // });
  }
    
    
pageChangeEvent(event: PageEvent) {
    // this.pageIndex = event.pageIndex;
    // this.pageSize = event.pageSize;
    // this.getPagedData();
}

}
