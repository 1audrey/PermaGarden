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
    { plant: 'Carrot', patch: 'Patch 1', startingDate: '20/06/2022', transplantDate: '27/06/2022', realHarvestingDates: '6/08/2022', harvestedWeight: '4', failureReasons: '' },
    { plant: 'Beans', patch: 'Patch 1', startingDate: '24/06/2022', transplantDate: '', realHarvestingDates: '6/08/2022, 18/07/2022', harvestedWeight: '4, 5', failureReasons: '' },
    { plant: 'Carrot', patch: 'Patch 2', startingDate: '20/06/2022', transplantDate: '27/06/2022', realHarvestingDates: '6/08/2022', harvestedWeight: '', failureReasons: 'not sunny enough' },
    { plant: 'Beans', patch: 'Patch 2', startingDate: '28/06/2022', transplantDate: '', realHarvestingDates: '', harvestedWeight: '', failureReasons: 'planted too early' },
    { plant: 'Peas', patch: 'Patch 3', startingDate: '28/06/2022', transplantDate: '', realHarvestingDates: '', harvestedWeight: '', failureReasons: 'planted too early' },
    { plant: 'Beans', patch: 'Patch 3', startingDate: '1/06/2022', transplantDate: '', realHarvestingDates: '6/08/2022, 18/07/2022', harvestedWeight: '4, 5', failureReasons: '' },
    { plant: 'Carrot', patch: 'Patch 2', startingDate: '20/06/2022', transplantDate: '27/06/2022', realHarvestingDates: '6/08/2022', harvestedWeight: '10', failureReasons: '' },
    { plant: 'Beans', patch: 'Patch 3', startingDate: '28/06/2022', transplantDate: '', realHarvestingDates: '', harvestedWeight: '', failureReasons: 'too much water from the 15th of apri till the 30th of june. There was mildiou on the leaves' },
  ];

  displayedColumns: string[] = ['plant', 'patch', 'startingDate', 'transplantDate', 'realHarvestingDates', 'harvestedWeight', 'failureReasons'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  // dataSource: MatTableDataSource<UserData>; change for archivedTask
  listOfFilteredPLants: string[] = [];
  listOfFilter: Filter[] = [];
  listOfFilteredPatches: string[] = [];
  isFilterApplied!: boolean;

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
    this.getPatchesToFilter();
    this.initializeFilter()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  getTotalPlant() {
    return this.dataSource.paginator?.length;
  }

  getTotalWeight() {
    return this.dataSource.filteredData.reduce((acc, value) =>
      acc + value.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0), 0);
  }

  isPlantChipColor(option: string) {
    return this.listOfFilteredPLants.includes(option)
  }

  isPatchChipColor(option: string) {
    return this.listOfFilteredPatches.includes(option)
  }

  isFailureChipColor(option: string) {
    return option === 'Failures';
  }

  removeFilter(optionChip: never) {
    const index = this.filterValues.option.indexOf(optionChip);

    if (index >= 0) {
      this.filterValues.option.splice(index, 1);
      this.initializeFilter()
    }
  }

  private initializeFilter(): void {
    this.filterOptions();
    this.formSubscribe();
    this.getFormsValue();
  }

  private formSubscribe() {
    this.option?.valueChanges.subscribe(optionValue => {
      this.filterValues['option'] = optionValue;
      this.dataSource.filter = JSON.stringify(this.filterValues);
    });
  }

  private getFormsValue() {
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      let searchString = JSON.parse(filter);
      this.isFilterApplied = false;

      if (this.isFailuresFilterAppliedOnly(searchString)) {
        this.applyFailureFilterOnly(searchString, data);
      }

      else if (this.IsFailuresFitlerAndAnotherFilterApplied(searchString)) {
        this.applyFailureAndOneOtherFilter(searchString, data);
      }

      else if (this.IsFailurePlantAndPatchFilterApplied(searchString)) {
        this.applyFailurePlantAndPatchFilter(searchString, data);
      }

      else if (this.IsOnePlantOnePatchFilterApplied(searchString)) {
        this.applyOnePlantAndPatchFilter(searchString, data);
      }

      else if (this.IsOneFilterAppliedWithoutFailures(searchString)) {
        this.OneFilterAppliedWithoutFailures(searchString, data);
      }

      else {
        this.isFilterApplied = true;
      }

      return this.isFilterApplied;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  private applyFailureFilterOnly(searchString: any, data: PeriodicElement) {
    for (const option of searchString.option) {
      if (option === 'Failures' && data.failureReasons != '') {
        this.isFilterApplied = true;
      }
    }
  }

  private applyFailureAndOneOtherFilter(searchString: any, data: PeriodicElement) {
    for (const option of searchString.option) {
      if (data.failureReasons != '' && data.plant.trim() === option) {
        this.isFilterApplied = true;
      }
      else if (data.failureReasons != '' && data.patch.trim() === option) {
        this.isFilterApplied = true;
      }
    }
  }

  private applyFailurePlantAndPatchFilter(searchString: any, data: PeriodicElement) {
    for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
      if (data.plant.trim() === searchString.option[i]) {
        for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
          if (data.patch.trim() === searchString.option[j]) {
            if (data.failureReasons != '') {
              this.isFilterApplied = true;
            }
          }
        }
      }
    }
  }

  private applyOnePlantAndPatchFilter(searchString: any, data: PeriodicElement) {
    for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
      for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
        if (data.plant.trim() === searchString.option[i] && data.patch.trim() === searchString.option[j]) {
          this.isFilterApplied = true;
        }
      }
    }
  }

  private OneFilterAppliedWithoutFailures(searchString: any, data: PeriodicElement) {
    for (const option of searchString.option) {
      if (data.plant.trim() === option) {
        this.isFilterApplied = true;
      }
      else if (data.patch.trim() === option) {
        this.isFilterApplied = true;
      }
    }
  }

  private getPatchesToFilter() {
    let listOfPatches: string[] = [];
    this.ELEMENT_DATA.forEach((element) => {
      listOfPatches.push(element.patch);
    })
    this.listOfFilteredPatches = [...new Set(listOfPatches)];
  }

  private isFailuresFilterAppliedOnly(searchString: any): boolean {
    return searchString.option.length === 1 && searchString.option.includes('Failures')
  }

  private IsFailuresFitlerAndAnotherFilterApplied(searchString: any): boolean {
    return searchString.option.length === 2 && searchString.option.includes('Failures');
  }

  private IsOneFilterAppliedWithoutFailures(searchString: any): boolean {
    return searchString.option.length;
  }

  private IsOnePlantOnePatchFilterApplied(searchString: any) {
    for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
      if (searchString.option.length && searchString.option.includes(this.listOfFilter[0].options[i])) {
        for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
          if (searchString.option.includes(this.listOfFilter[1].options[j])) {
            return true;
          }
        }
      }
    }
    return false;
  }

  private IsFailurePlantAndPatchFilterApplied(searchString: any) {
    if (searchString.option.length > 2 && searchString.option.includes('Failures')) {
      for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
        if (searchString.option.includes(this.listOfFilter[0].options[i])) {
          for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
            if (searchString.option.includes(this.listOfFilter[1].options[j])) {
              return true;
            }
          }
        }
      }
    }
    return false;
  }

  private getPlantsToFilter() {
    let listOfPLants: string[] = [];
    this.ELEMENT_DATA.forEach((element) => {
      listOfPLants.push(element.plant);
    })
    this.listOfFilteredPLants = [...new Set(listOfPLants)];
  }

  private filterOptions() {
    this.listOfFilter = [
      {
        name: 'By Plants',
        options: this.listOfFilteredPLants,
        className: 'plant-checkbox',
      },
      {
        name: 'By Patch',
        options: this.listOfFilteredPatches,
        className: 'patch-checkbox',
      },
      {
        name: 'Other',
        options: ['Failures'],
        className: 'failure-checkbox',
      }
    ];
  }
}

export interface PeriodicElement {
  plant: string,
  patch: string,
  startingDate: string,
  transplantDate: string,
  realHarvestingDates: string,
  harvestedWeight: string,
  failureReasons: string
}

export interface Filter {
  name: string,
  options: string[],
  className: string
}

