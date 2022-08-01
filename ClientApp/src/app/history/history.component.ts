import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  ELEMENT_DATA: PeriodicElement[] = [
    { plant: 'Carrot', startingDate: '20/06/2022', transplantDate: '27/06/2022', realHarvestingDates: '6/08/2022', harvestedWeight: '4', failureReasons: '' },
    { plant: 'Beans', startingDate: '24/06/2022', transplantDate: '', realHarvestingDates: '6/08/2022, 18/07/2022', harvestedWeight: '4, 5', failureReasons: '' },
    { plant: 'Carrot', startingDate: '20/06/2022', transplantDate: '27/06/2022', realHarvestingDates: '6/08/2022', harvestedWeight: '', failureReasons: 'not sunny enough' },
    { plant: 'Beans', startingDate: '28/06/2022', transplantDate: '', realHarvestingDates: '', harvestedWeight: '', failureReasons: 'planted too early' },
    { plant: 'Peas', startingDate: '28/06/2022', transplantDate: '', realHarvestingDates: '', harvestedWeight: '', failureReasons: 'planted too early' },

  ];

  displayedColumns: string[] = ['plant', 'startingDate', 'transplantDate', 'realHarvestingDates', 'harvestedWeight', 'failureReasons'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // dataSource: MatTableDataSource<UserData>; change for archivedTask
  listOfFilteredPLants: string[] = [];
  listOfFilter: Filter[] = [];

  constructor(private _liveAnnouncer: LiveAnnouncer) {
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  filterValues = {
    option: []
  }

  filterForm = new FormGroup({
    option: new FormControl()
  });

  get option() { return this.filterForm.get('option') }

  ngOnInit() {
    this.getPlantsToFilter();
    this.filterOptions();
    this.formSubscribe();
    this.getFormsValue();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  formSubscribe() {
    this.option?.valueChanges.subscribe(optionValue => {
      this.filterValues['option'] = optionValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      let isFilterApplied = false;

      if (this.isFailuresFilterAppliedOnly(searchString)) {
        for (const option of searchString.option) {
          if (option === 'Failures' && data.failureReasons != '') {
              isFilterApplied = true;
          }
        }
      }

      else if (this.IsFailuresFitlerAndAnotherFilterApplied(searchString)) {
        for (const option of searchString.option) {
          if (data.failureReasons != '' && data.plant.trim() === option) {
            isFilterApplied = true;
          }
        }
      }

      else if (this.IsFilterAppliedWithoutFailures(searchString)) {
        for (const option of searchString.option) {
          if (data.plant.trim() === option) {
            isFilterApplied = true;
          }
        }
      }

      else {
        isFilterApplied = true;
      }

      return isFilterApplied;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  isFailuresFilterAppliedOnly(searchString: any): boolean{
    return searchString.option.length === 1 && searchString.option.includes('Failures')
  }

  IsFailuresFitlerAndAnotherFilterApplied(searchString: any): boolean{
    return searchString.option.length && searchString.option.includes('Failures');
  }

  IsFilterAppliedWithoutFailures(searchString: any): boolean{
    return searchString.option.length;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterOptions() {
    this.listOfFilter = [
      {
        name: 'By Plants',
        options: this.listOfFilteredPLants,
      },
      {
        name: 'Other',
        options: ['Failures'],
      }
    ];
  }

  getPlantsToFilter() {
    let listOfPLants: string[] = [];
    this.ELEMENT_DATA.forEach((element) => {
      listOfPLants.push(element.plant);
    })
    this.listOfFilteredPLants = [...new Set(listOfPLants)];
  }

  getTotalPlant() {
    return this.dataSource.paginator?.length;
  }

  getTotalWeight() {
    return this.dataSource.filteredData.reduce((acc, value) =>
      acc + value.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0), 0);
  }
}

export interface PeriodicElement {
  plant: string,
  startingDate: string,
  transplantDate: string,
  realHarvestingDates: string,
  harvestedWeight: string,
  failureReasons: string
}

export interface Filter {
  name: string,
  options: string[]
}

