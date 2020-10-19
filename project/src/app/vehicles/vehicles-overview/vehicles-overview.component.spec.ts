import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from 'src/app/shared/shared.module';
import { Mock, MockFactory } from 'jasmine-mock-factory';
import { VehiclesOverviewComponent } from './vehicles-overview.component';
import { VehiclesService } from 'src/app/service/vehicles.service';
import { of, throwError } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

describe('VehiclesOverviewComponent', () => {
    let component: VehiclesOverviewComponent;
    let fixture: ComponentFixture<VehiclesOverviewComponent>;
    let vehicleServiceMock: Mock<VehiclesService>;

    const vehiclesMockResponse = [
        {
            id: 1,
            type: 'car',
            brand: 'Bugatti Veyron',
            colors: ['red', 'black'],
            img:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
        },
        {
            id: 2,
            type: 'airplane',
            brand: 'Boeing 787 Dreamliner',
            colors: ['red', 'white', 'black', 'green'],
            img:
                'https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg/600px-All_Nippon_Airways_Boeing_787-8_Dreamliner_JA801A_OKJ_in_flight.jpg',
        },
        {
            id: 3,
            type: 'train',
            brand: 'USRA 0-6-6',
            colors: ['yellow', 'white', 'black'],
            img: 'https://upload.wikimedia.org/wikipedia/en/thumb/a/a1/UP_4466_Neil916.JPG/600px-UP_4466_Neil916.JPG',
        },
    ];

    const colorsMockResponse = ['Red', 'Black', 'White'];
    const typesMockResponse = ['car', 'train', 'airplane'];
    const brandsMockResponse = ['ferari', 'lamborghini', 'timor'];

    beforeEach(async () => {
        vehicleServiceMock = MockFactory.create(VehiclesService);
        vehicleServiceMock._spy.fetchTypes._func.and.returnValue(of(typesMockResponse));
        vehicleServiceMock._spy.fetchBrands._func.and.returnValue(of(brandsMockResponse));
        vehicleServiceMock._spy.fetchColors._func.and.returnValue(of(colorsMockResponse));
        vehicleServiceMock._spy.fetchVehicles._func.and.returnValue(of(vehiclesMockResponse));

        await TestBed.configureTestingModule({
            imports: [SharedModule, BrowserAnimationsModule, BrowserModule, RouterModule],
            providers: [
                {
                    provide: VehiclesService,
                    useValue: vehicleServiceMock,
                },
            ],
            declarations: [VehiclesOverviewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(VehiclesOverviewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        spyOn<any>(component, 'fetchTypes').and.callThrough();
        spyOn<any>(component, 'fetchBrands').and.callThrough();
        spyOn<any>(component, 'fetchColors').and.callThrough();
        spyOn<any>(component, 'updateVehicles').and.callThrough();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('onInit method', () => {
        it('should set colors property value correctly', () => {
            expect(component.colors).toBe(colorsMockResponse);
        });

        it('should set brands property value correctly', () => {
            expect(component.brands).toBe(brandsMockResponse);
        });

        it('should set types property value correctly', () => {
            expect(component.types).toBe(typesMockResponse);
        });
    });

    describe('resetField method', () => {
        beforeEach(() => {
            component.searchForm.controls['color'].setValue('red');
            component.searchForm.controls['type'].setValue('car');
            component.searchForm.controls['brand'].setValue('timor');
            component.resetFields();
            fixture.detectChanges();
        });

        it('should reset the vehiclesList', () => {
            expect(component.vehicleList).toEqual([]);
        });

        it('should reset the form input fields', () => {
            expect(component.searchForm.controls['color'].value).toBe(null);
            expect(component.searchForm.controls['type'].value).toBe(null);
            expect(component.searchForm.controls['brand'].value).toBe(null);
        });
    });

    describe('when service returns data', () => {
        describe('When color field input changes', () => {
            const expectedFormValue = { type: null, brand: null, color: 'red' };
            beforeEach(() => {
                component.searchForm.controls['color'].setValue('red');
                fixture.detectChanges();
            });

            it('should call fetchBrand, fetchTypes and updateVehicles', () => {
                expect(component['fetchBrands']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['fetchTypes']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['updateVehicles']).toHaveBeenCalledWith(expectedFormValue);
            });

            it('should set the vehiclesList', () => {
                expect(component.vehicleList).toBe(vehiclesMockResponse);
            });
        });

        describe('When type field input changes', () => {
            const expectedFormValue = { type: 'car', brand: null, color: null };
            beforeEach(() => {
                component.searchForm.controls['type'].setValue('car');
                fixture.detectChanges();
            });

            it('should call fetchBrand, fetchColors and updateVehicles', () => {
                expect(component['fetchBrands']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['fetchColors']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['updateVehicles']).toHaveBeenCalledWith(expectedFormValue);
            });

            it('should set the vehiclesList', () => {
                expect(component.vehicleList).toBe(vehiclesMockResponse);
            });
        });

        describe('When brand field input changes', () => {
            const expectedFormValue = { type: null, brand: 'timor', color: null };
            beforeEach(() => {
                component.searchForm.controls['brand'].setValue('timor');
                fixture.detectChanges();
            });

            it('should call fetchBrand, fetchColors and updateVehicles', () => {
                expect(component['fetchTypes']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['fetchColors']).toHaveBeenCalledWith(expectedFormValue);
                expect(component['updateVehicles']).toHaveBeenCalledWith(expectedFormValue);
            });

            it('should set the vehiclesList', () => {
                expect(component.vehicleList).toBe(vehiclesMockResponse);
            });
        });
    });

    describe('when service returns error', () => {
        describe('When type field returns error', () => {
            it('should display error message', () => {
                vehicleServiceMock._spy.fetchTypes._func.and.returnValue(throwError('error'));
                component.resetFields();
                fixture.detectChanges();
                const compiled = fixture.nativeElement;
                expect(compiled.querySelector('.form-error-message h3').textContent).toContain(
                    'Fetching data failed, please click reset'
                );
            });
        });

        describe('When brand field returns error', () => {
            it('should display error message', () => {
                vehicleServiceMock._spy.fetchBrands._func.and.returnValue(throwError('error'));
                component.resetFields();
                fixture.detectChanges();
                const compiled = fixture.nativeElement;
                expect(compiled.querySelector('.form-error-message h3').textContent).toContain(
                    'Fetching data failed, please click reset'
                );
            });
        });

        describe('When color field returns error', () => {
            it('should display error message', () => {
                vehicleServiceMock._spy.fetchColors._func.and.returnValue(throwError('error'));
                component.resetFields();
                fixture.detectChanges();
                const compiled = fixture.nativeElement;
                expect(compiled.querySelector('.form-error-message h3').textContent).toContain(
                    'Fetching data failed, please click reset'
                );
            });
        });

        describe('When fetchVehicles returns error', () => {
            it('should display error message and try again', () => {
                vehicleServiceMock._spy.fetchVehicles._func.and.returnValue(throwError('error'));
                component.searchForm.controls['brand'].setValue('timor');
                fixture.detectChanges();
                const compiled = fixture.nativeElement;
                expect(compiled.querySelector('.error-message h3').textContent).toContain(
                    'Sorry, we have an issue finding the correct vehicle for you. Please Try again.'
                );
            });
        });
    });
});
