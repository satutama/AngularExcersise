import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SearchFormValue } from '../models/search-form-data';
import { Vehicle } from '../models/vehicle';
declare let trafficMeister: any;

@Injectable({
    providedIn: 'root',
})
export class VehiclesService {
    constructor() {}

    fetchVehicles(searchFormData: SearchFormValue): Observable<Vehicle[]> {
        return new Observable(observer => {
            trafficMeister.fetchData((err, vehicles) => {
                try {
                    let filteredVehicles = [];
                    filteredVehicles = vehicles.filter(vehicle => {
                        if (searchFormData.type && searchFormData.brand) {
                            return vehicle.type === searchFormData.type && vehicle.brand === searchFormData.brand;
                        } else if (searchFormData.color && searchFormData.type) {
                            return (
                                vehicle.colors.includes(searchFormData.color) && vehicle.type === searchFormData.type
                            );
                        } else if (searchFormData.type) {
                            return vehicle.type === searchFormData.type;
                        } else if (searchFormData.brand) {
                            return vehicle.brand === searchFormData.brand;
                        } else if (searchFormData.color) {
                            return vehicle.colors.includes(searchFormData.color);
                        }
                    });
                    observer.next(filteredVehicles);
                    observer.complete();
                } catch (err) {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    fetchTypes(searchFormData: SearchFormValue | null = null): Observable<Vehicle[]> {
        return new Observable(observer => {
            trafficMeister.fetchData((err, vehicles) => {
                try {
                    let types = [];
                    let filteredVehicles = [];
                    if (searchFormData?.brand) {
                        filteredVehicles = vehicles.filter(vehicle => vehicle.brand === searchFormData.brand);
                        types = this.mapResponse(filteredVehicles, 'type');
                    } else if (searchFormData?.color) {
                        vehicles.forEach(vehicle => {
                            if (vehicle.colors.find(color => color === searchFormData.color)) {
                                filteredVehicles.push(vehicle);
                            }
                        });
                        types = this.mapResponse(filteredVehicles, 'type');
                    } else {
                        types = this.mapResponse(vehicles, 'type');
                    }
                    observer.next(types);
                    observer.complete();
                } catch (err) {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    fetchBrands(searchFormData: SearchFormValue | null = null): Observable<Vehicle[]> {
        return new Observable(observer => {
            trafficMeister.fetchData((err, vehicles) => {
                try {
                    let brands = [];
                    let filteredVehicles = [];
                    if (searchFormData?.color && searchFormData?.type) {
                        vehicles.forEach(vehicle => {
                            if (
                                vehicle.colors.find(color => color === searchFormData.color) &&
                                vehicle.type === searchFormData.type
                            ) {
                                filteredVehicles.push(vehicle);
                            }
                        });
                        brands = this.mapResponse(filteredVehicles, 'brand');
                    } else if (searchFormData?.color) {
                        vehicles.forEach(vehicle => {
                            if (vehicle.colors.find(color => color === searchFormData.color)) {
                                filteredVehicles.push(vehicle);
                            }
                        });
                        brands = this.mapResponse(filteredVehicles, 'brand');
                    } else if (searchFormData?.type) {
                        filteredVehicles = vehicles.filter(vehicle => vehicle.type === searchFormData.type);
                        brands = this.mapResponse(filteredVehicles, 'brand');
                    } else {
                        brands = this.mapResponse(vehicles, 'brand');
                    }
                    observer.next(brands);
                    observer.complete();
                } catch (err) {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    fetchColors(searchFormData: SearchFormValue | null = null): Observable<string[]> {
        return new Observable(observer => {
            trafficMeister.fetchData((err, vehicles) => {
                try {
                    let colors = [];
                    let filteredVehicles = [];
                    if (searchFormData?.brand && searchFormData?.type) {
                        filteredVehicles = vehicles
                            .filter(vehicle => vehicle.type === searchFormData.type)
                            .filter(vehicle => vehicle.brand === searchFormData.brand);
                        colors = this.mapResponse(filteredVehicles, 'colors');
                    } else if (searchFormData?.brand) {
                        filteredVehicles = vehicles.filter(vehicle => vehicle.brand === searchFormData.brand);
                        colors = this.mapResponse(filteredVehicles, 'colors');
                    } else if (searchFormData?.type) {
                        filteredVehicles = vehicles.filter(vehicle => vehicle.type === searchFormData.type);
                        colors = this.mapResponse(filteredVehicles, 'colors');
                    } else {
                        colors = this.mapResponse(vehicles, 'colors');
                    }
                    observer.next(colors);
                    observer.complete();
                } catch (err) {
                    observer.error(err);
                    observer.complete();
                }
            });
        });
    }

    private mapResponse(vehicles: Array<Vehicle>, vehicleProperty: string): string[] {
        if (vehicleProperty === 'colors') {
            return vehicles
                .map(vehicle => vehicle.colors)
                .flat()
                .filter((elem, index, self) => {
                    return index === self.indexOf(elem);
                });
        }
        return vehicles
            .map(vehicle => vehicle[`${vehicleProperty}`])
            .filter((elem, index, self) => {
                return index === self.indexOf(elem);
            });
    }
}
