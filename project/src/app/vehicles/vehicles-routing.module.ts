import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesOverviewComponent } from './vehicles-overview/vehicles-overview.component';

const routes: Routes = [
    {
        path: '',
        component: VehiclesOverviewComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class VehiclesRoutingModule {}
