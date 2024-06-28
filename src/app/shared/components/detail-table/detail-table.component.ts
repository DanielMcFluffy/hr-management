import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableModule, MatTable } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatSortModule, MatSort } from '@angular/material/sort';
import { Admin } from '../../../models/admin';
import { DetailTableDataSource, compare} from './detail-table-datasource';
@Component({
  selector: 'app-detail-table',
  templateUrl: './detail-table.component.html',
  styleUrl: './detail-table.component.scss',
  standalone: true,
  imports: [MatTableModule, MatPaginatorModule, MatSortModule],
})
//the data source component is a generic type, so we can pass in the type of data we want to use
//however, we cannot do that to the detail table component, so we can only pass in a union of types that we expect to be used here
export class DetailTableComponent implements AfterViewInit, OnInit  {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<
  Admin 
  //insert other types of data that can be passed here
  >;
  
  //we can set different types of data to be passed from parent//we could make the types a union if we expect different types of data to be passed//or generic
  @Input() displayedColumns!: (keyof Admin)[];
  @Input() data!: Admin[]; 

  dataSource!: DetailTableDataSource<Admin>;
  
  ngOnInit(): void {
    this.dataSource = new DetailTableDataSource<Admin>(this.data, 
      
      (a, b) => {
        const isAsc = this.sort?.direction === 'asc';
        switch (this.sort?.active as keyof (Admin)) { //cross check with the actual used column names
          case 'username': return compare(a.username, b.username, isAsc);
          case 'email': return compare(+a.username, +b.username, isAsc);
          case 'isLogin': return compare(+a.isLogin, +b.isLogin, isAsc);
          case 'permission': return compare(+a.permission!, +b.permission!, isAsc);
          default: return 0;
        }
      }
      
    );
  }
  
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
