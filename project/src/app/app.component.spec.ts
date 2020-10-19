import { TestBed } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./vehicles/vehicles.module').then(m => m.VehiclesModule),
    },
];

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterModule.forRoot(routes)],
            declarations: [AppComponent],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });

    it(`should have as title 'Traffic Meister'`, () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app.title).toEqual('Traffic Meister');
    });
});
