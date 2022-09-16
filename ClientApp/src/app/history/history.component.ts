import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../task/models/itask-model';
import { IPlantsList } from '../garden-list/models/iplants-model';
import { IPatch } from '../garden/models/ipatch-model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['plant', 'patch', 'startingDate', 'transplantDate', 'realHarvestingDates', 'seedsUsed', 'harvestedWeight', 'productivity', 'failureReasons'];
  dataSource!: MatTableDataSource<ITask>;
  listOfFilteredPLants: string[] = [];
  listOfFilter: Filter[] = [];
  listOfFilteredPatches: string[] = [];
  isFilterApplied!: boolean;
  archivedTasks!: ITask[];
  plants!: IPlantsList[];
  patches!: IPatch[];
  harvestedDates!: string[];
  isShowPlantData: boolean = false;
  selectedPlant!: IPlantsList;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute) {
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
    this.plants = this.route.snapshot.data['plants'];
    this.patches = this.route.snapshot.data['patches'];
    this.archivedTasks = this.route.snapshot.data['archivedTasks'];

    this.dataSource = new MatTableDataSource(this.archivedTasks);

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
    let totalWeight = 0;
    this.dataSource.filteredData.reduce((acc, value) => {
      if (value.harvestedWeight != undefined) {
        totalWeight = acc + value.harvestedWeight.split(',').map(Number).reduce((sum, current) => sum + current, 0)
        return totalWeight;
      }
      return totalWeight;
    }, 0);
    return totalWeight;
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
      this.initializeFilter();
    }
  }

  splitDates(harvestedDates: string) {
    if (harvestedDates != undefined) {
      return harvestedDates.split(',');
    }
    return;
  }

  getPlantName(plantId: number) {
    let plant = this.getPlantByPlantId(plantId);
    return plant.plantName;
  }

  getPatchName(patchId: number) {
    let patch = this.getPatchByPatchId(patchId);
    return patch.patchName;
  }

  private getPlantByPlantId(plantId: number): IPlantsList {
    let plantInTask: IPlantsList = {
      plantId: 0,
      plantName: '',
      plantStartingMonths: '',
      plantStartingMethod: '',
      plantSowingPeriod: 0,
      plantHarvestingMonths: '',
      plantGrowingPeriod: 0,
      plantImagePicture: '',
    };
    this.plants.forEach((plant) => {
      if (plant.plantId === plantId) {
        plantInTask = plant;
      }
      return plantInTask;
    })
    return plantInTask;
  }

  private getPatchByPatchId(patchId: number) {
    let patchInTask: IPatch = {
      patchId: 0,
      patchName: '',
      patchImagePicture: '',
    };

    this.patches.forEach((patch) => {
      if (patch.patchId === patchId) {
        patchInTask = patch;
      }
      return patchInTask;
    })
    return patchInTask;
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
        this.isShowPlantData = false;
      }

      else if (this.IsFailuresFitlerAndAnotherFilterApplied(searchString)) {
        this.applyFailureAndOneOtherFilter(searchString, data);
        this.isShowPlantData = false;
      }

      else if (this.IsFailurePlantAndPatchFilterApplied(searchString)) {
        this.applyFailurePlantAndPatchFilter(searchString, data);
        this.isShowPlantData = false;
      }

      else if (this.IsOnePlantOnePatchFilterApplied(searchString)) {
        this.applyOnePlantAndPatchFilter(searchString, data);
        this.isShowPlantData = false;
      }

      else if (this.IsOneFilterAppliedWithoutFailures(searchString)) {
        this.OneFilterAppliedWithoutFailures(searchString, data);
        this.IsOnlyOnePlantFilterApplied(searchString, data);
      }

      else {
        this.isFilterApplied = true;
        this.isShowPlantData = false;
      }

      return this.isFilterApplied;
    }
    this.dataSource.filter = JSON.stringify(this.filterValues);
  }

  private applyFailureFilterOnly(searchString: any, data: ITask) {
    for (const option of searchString.option) {
      if (option === 'Failures' && data.failureReasons != undefined) {
        this.isFilterApplied = true;
      }
    }
  }

  private applyFailureAndOneOtherFilter(searchString: any, data: ITask) {
    for (const option of searchString.option) {
      if (data.failureReasons != undefined && this.getPlantName(data.plantId) === option) {
        this.isFilterApplied = true;
      }
      else if (data.failureReasons != undefined && this.getPatchName(data.patchId) === option) {
        this.isFilterApplied = true;
      }
    }
  }

  private applyFailurePlantAndPatchFilter(searchString: any, data: ITask) {
    for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
      if (this.getPlantName(data.plantId) === searchString.option[i]) {
        for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
          if (this.getPatchName(data.patchId) === searchString.option[j]) {
            if (data.failureReasons != undefined) {
              this.isFilterApplied = true;
            }
          }
        }
      }
    }
  }

  private applyOnePlantAndPatchFilter(searchString: any, data: ITask) {
    for (let i = 0; i < this.listOfFilter[0].options.length; i++) {
      for (let j = 0; j < this.listOfFilter[1].options.length; j++) {
        if (this.getPlantName(data.plantId) === searchString.option[i] && this.getPatchName(data.patchId) === searchString.option[j]) {
          this.isFilterApplied = true;
        }
      }
    }
  }

  private OneFilterAppliedWithoutFailures(searchString: any, data: ITask) {
    for (const option of searchString.option) {
      if (this.getPlantName(data.plantId) === option) {
        this.isFilterApplied = true;
      }

      else if (this.getPatchName(data.patchId) === option) {
        this.isFilterApplied = true;
      }
    }
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

  private IsOnlyOnePlantFilterApplied(searchString: any, data: ITask) {
    if (searchString.option.length == 1 && this.getPlantName(data.plantId) === searchString.option[0]) {
      this.isShowPlantData = true;
      this.selectedPlant = this.getPlantByPlantId(data.plantId);
    }
    else if (searchString.option.length > 1) {
      this.isShowPlantData = false;
    }
  }

  private getPatchesToFilter() {
    let listOfPatches: string[] = [];
    this.archivedTasks.forEach((element) => {
      listOfPatches.push(this.getPatchName(element.patchId));
    })
    this.listOfFilteredPatches = [...new Set(listOfPatches)];
  }

  private getPlantsToFilter() {
    let listOfPLants: string[] = [];
    this.archivedTasks.forEach((element) => {
      listOfPLants.push(this.getPlantName(element.plantId));
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

export interface Filter {
  name: string,
  options: string[],
  className: string
}

