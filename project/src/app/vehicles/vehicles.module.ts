import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesOverviewComponent } from './vehicles-overview/vehicles-overview.component';

@NgModule({
    imports: [CommonModule, VehiclesRoutingModule, SharedModule],
    declarations: [VehiclesOverviewComponent],
})
export class VehiclesModule {}
