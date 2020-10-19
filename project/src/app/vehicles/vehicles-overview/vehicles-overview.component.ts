import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { distinctUntilChanged, retry, tap } from 'rxjs/operators';
import { SearchFormValue } from 'src/app/models/search-form-data';
import { VehiclesService } from 'src/app/service/vehicles.service';
import { unsubscribe, unsubscribeAll } from 'src/app/utils/unsubscribe';

@Component({
    selector: 'app-vehicles-overview',
    templateUrl: './vehicles-overview.component.html',
    styleUrls: ['./vehicles-overview.component.scss'],
})
export class VehiclesOverviewComponent implements OnInit, AfterViewInit, OnDestroy {
    types = [];
    brands = [];
    colors = [];
    vehicleList = [];
    isLoading = false;
    isFetchingTypes = false;
    isFetchingBrands = false;
    isFetchingColors = false;
    fetchingVehiclesError = false;
    searchForm = this.fb.group({
        type: [{ value: null, disabled: this.types.length < 1 }],
        brand: [{ value: null, disabled: this.brands.length < 1 }],
        color: [{ value: null, disabled: this.colors.length < 1 }],
    });
    private formSubscriptions: Array<Subscription> = [];
    private typeSubscriptions: Subscription;
    private brandSubscriptions: Subscription;
    private colorSubscriptions: Subscription;
    private vehiclesSubscriptions: Subscription;

    constructor(private fb: FormBuilder, private vehiclesService: VehiclesService) {}

    ngOnInit(): void {
        this.fetchData();
    }

    ngAfterViewInit(): void {
        this.initFormChangeListeners();
    }

    ngOnDestroy(): void {
        unsubscribeAll([
            ...this.formSubscriptions,
            this.typeSubscriptions,
            this.brandSubscriptions,
            this.colorSubscriptions,
            this.vehiclesSubscriptions,
        ]);
    }

    resetFields(): void {
        this.searchForm.reset();
        this.fetchData();
        this.fetchingVehiclesError = false;
        this.vehicleList = [];
    }

    get fetchDataFailed() {
        return (
            (this.colors.length === 0 || this.brands.length === 0 || this.types.length === 0) &&
            !this.isFetchingTypes &&
            !this.isFetchingBrands &&
            !this.isFetchingColors
        );
    }

    private fetchData() {
        this.fetchTypes();
        this.fetchColors();
        this.fetchBrands();
    }

    private initFormChangeListeners(): void {
        this.formSubscriptions.push(
            this.searchForm.controls.type.valueChanges
                .pipe(distinctUntilChanged(), tap(this.typeValueChangeHandler))
                .subscribe()
        );
        this.formSubscriptions.push(
            this.searchForm.controls.brand.valueChanges
                .pipe(distinctUntilChanged(), tap(this.brandValueChangeHandler))
                .subscribe()
        );

        this.formSubscriptions.push(
            this.searchForm.controls.color.valueChanges
                .pipe(distinctUntilChanged(), tap(this.colorValueChangeHandler))
                .subscribe()
        );
    }

    private typeValueChangeHandler = value => {
        this.searchForm.controls.brand.disable();
        this.searchForm.controls.color.disable();
        if (value) {
            const searchFormData = this.searchForm.getRawValue();
            this.fetchBrands(searchFormData);
            this.fetchColors(searchFormData);
            this.updateVehicles(searchFormData);
        } else {
            this.fetchBrands();
            this.fetchColors();
        }
    };

    private brandValueChangeHandler = value => {
        this.searchForm.controls.type.disable();
        this.searchForm.controls.color.disable();
        if (value) {
            const searchFormData = this.searchForm.getRawValue();
            this.fetchTypes(searchFormData);
            this.fetchColors(searchFormData);
            this.updateVehicles(searchFormData);
        } else {
            this.fetchTypes();
            this.fetchColors();
        }
    };

    private colorValueChangeHandler = value => {
        this.searchForm.controls.type.disable();
        this.searchForm.controls.brand.disable();
        if (value) {
            const searchFormData = this.searchForm.getRawValue();
            this.fetchTypes(searchFormData);
            this.fetchBrands(searchFormData);
            this.updateVehicles(searchFormData);
        } else {
            this.fetchTypes();
            this.fetchBrands();
        }
    };

    private fetchTypes(searchFormValue: SearchFormValue | null = null) {
        this.types = [];
        unsubscribe(this.typeSubscriptions);
        this.searchForm.controls.type.disable();
        this.isFetchingTypes = true;
        this.typeSubscriptions = this.vehiclesService.fetchTypes(searchFormValue).subscribe(
            types => {
                this.types = types;
                if (this.types.length) {
                    this.searchForm.controls.type.enable();
                }
                this.isFetchingTypes = false;
            },
            () => {
                this.isFetchingTypes = false;
            }
        );
    }

    private fetchBrands(searchFormValue: SearchFormValue | null = null) {
        this.brands = [];
        unsubscribe(this.brandSubscriptions);
        this.searchForm.controls.brand.disable();
        this.isFetchingBrands = true;
        this.brandSubscriptions = this.vehiclesService.fetchBrands(searchFormValue).subscribe(
            brands => {
                this.brands = brands;
                if (this.brands.length) {
                    this.searchForm.controls.brand.enable();
                }
                this.isFetchingBrands = false;
            },
            () => {
                this.isFetchingBrands = false;
            }
        );
    }

    private fetchColors(searchFormValue: SearchFormValue | null = null) {
        this.colors = [];
        unsubscribe(this.colorSubscriptions);
        this.searchForm.controls.color.disable();
        this.isFetchingColors = true;
        this.colorSubscriptions = this.vehiclesService.fetchColors(searchFormValue).subscribe(
            colors => {
                this.colors = colors;
                if (this.colors.length) {
                    this.searchForm.controls.color.enable();
                }
                this.isFetchingColors = false;
            },
            () => {
                this.isFetchingColors = false;
            }
        );
    }

    updateVehicles(searchFormValue: SearchFormValue): void {
        unsubscribe(this.vehiclesSubscriptions);
        this.fetchingVehiclesError = false;
        this.isLoading = true;
        this.vehicleList = [];
        this.vehiclesSubscriptions = this.vehiclesService.fetchVehicles(searchFormValue).subscribe(
            vehicles => {
                this.vehicleList = vehicles;
                this.isLoading = false;
            },
            err => {
                this.fetchingVehiclesError = true;
                this.isLoading = false;
            }
        );
    }
}
