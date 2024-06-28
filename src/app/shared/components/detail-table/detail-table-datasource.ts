import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

export type sortSignature<T> = ((a: T, b: T) => number) //the signature of the sorting callback function

/**
 * Data source for the DetailTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DetailTableDataSource<T> extends DataSource<T> {
  data!: T[];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  sortCallback!: sortSignature<T> //callback function to be passed in the constructor; the sorting logic will be implemented in the parent component

  constructor(data: T[], sortProvider: sortSignature<T> ) { //pass in the expected type of the data source to the constrctor
    super();
    this.data = data;
    this.sortCallback = sortProvider;
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data], this.sortCallback));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: T[]): T[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: T[], sortCallback: sortSignature<T>): T[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort(sortCallback);
  }
}
// example of a sorting callback function
//////////////
// (a, b) => {
//   const isAsc = this.sort?.direction === 'asc';
//   switch (this.sort?.active as keyof T) { //cross check with the actual used column names

//     // if (typeof T === Admin) {
//       case 'username': return compare(a.username, b.username, isAsc);
//       case 'email': return compare(+a.id, +b.id, isAsc);
//     // }
//     default: return 0;
//   }
// }

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
export function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
