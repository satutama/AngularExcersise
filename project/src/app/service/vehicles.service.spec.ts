import { TestBed } from '@angular/core/testing';
import { VehiclesService } from './vehicles.service';

describe('VehiclesService', () => {
    let service: VehiclesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(VehiclesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('fetchVehicles method', () => {
        describe('with search params', () => {
            describe('When search params is type and brand', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'car', brand: 'Ferrari F40' };
                    const expected = [
                        {
                            id: 10,
                            type: 'car',
                            brand: 'Ferrari F40',
                            colors: ['red', 'yellow'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
                        },
                    ];
                    service.fetchVehicles(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });

            describe('When search params is only type', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'car' };
                    const expected = [
                        {
                            id: 1,
                            type: 'car',
                            brand: 'Bugatti Veyron',
                            colors: ['red', 'black'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg/520px-Bugatti_Veyron_16.4_%E2%80%93_Frontansicht_%281%29%2C_5._April_2012%2C_D%C3%BCsseldorf.jpg',
                        },
                        {
                            id: 10,
                            type: 'car',
                            brand: 'Ferrari F40',
                            colors: ['red', 'yellow'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
                        },
                        {
                            id: 11,
                            type: 'car',
                            brand: 'Lamborghini Huracán',
                            colors: ['black', 'white'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/2014-03-04_Geneva_Motor_Show_1379.JPG/440px-2014-03-04_Geneva_Motor_Show_1379.JPG',
                        },
                        {
                            id: 12,
                            type: 'car',
                            brand: 'Porsche Carrera GT',
                            colors: ['green', 'yellow'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg/440px-Porsche_Carrera_GT_-_Goodwood_Breakfast_Club_%28July_2008%29.jpg',
                        },
                    ];
                    service.fetchVehicles(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });

            describe('When search params is only brand', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ brand: 'Ferrari F40' };
                    const expected = [
                        {
                            id: 10,
                            type: 'car',
                            brand: 'Ferrari F40',
                            colors: ['red', 'yellow'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/F40_Ferrari_20090509.jpg/1920px-F40_Ferrari_20090509.jpg',
                        },
                    ];
                    service.fetchVehicles(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
            describe('When search params is only color', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ color: 'brown' };
                    const expected = [
                        {
                            id: 6,
                            type: 'airplane',
                            brand: 'Bloch MB.131',
                            colors: ['yellow', 'blue', 'brown'],
                            img:
                                'https://upload.wikimedia.org/wikipedia/commons/e/e5/Bloch_MB_131_San_Diego_Air_%26_Space_Museum_3.jpg',
                        },
                    ];
                    service.fetchVehicles(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
        });
    });

    describe('fetchTypes method', () => {
        describe('with empty value', () => {
            it('should return all types', (done: DoneFn) => {
                const expected = ['car', 'airplane', 'train'];
                service.fetchTypes().subscribe(
                    res => {
                        expect(res).toEqual(<any>expected);
                        done();
                    },
                    () => done.fail()
                );
            });
        });

        describe('with search params', () => {
            describe('When search params is only brand', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ brand: 'Ferrari F40' };
                    const expected = ['car'];
                    service.fetchTypes(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
            describe('When search params is only color', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ color: 'green' };
                    const expected = ['airplane', 'car'];
                    service.fetchTypes(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
        });
    });

    describe('fetchColors method', () => {
        describe('with empty params', () => {
            it('should return all types', (done: DoneFn) => {
                const expected = ['red', 'black', 'white', 'green', 'yellow', 'blue', 'brown', 'grey'];
                service.fetchColors().subscribe(
                    res => {
                        expect(res).toEqual(<any>expected);
                        done();
                    },
                    () => done.fail()
                );
            });
        });

        describe('with search params', () => {
            describe('When search params is type and brand', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'train', brand: 'USRA 0-6-6' };
                    const expected = ['yellow', 'white', 'black'];
                    service.fetchColors(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });

            describe('When search params is only brand', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ brand: 'Ferrari F40' };
                    const expected = ['red', 'yellow'];
                    service.fetchColors(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
            describe('When search params is only type', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'train' };
                    const expected = ['yellow', 'white', 'black', 'red', 'grey'];
                    service.fetchColors(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
        });
    });

    describe('fetchBrands method', () => {
        describe('with empty params', () => {
            it('should return all types', (done: DoneFn) => {
                const expected = [
                    'Bugatti Veyron',
                    'Boeing 787 Dreamliner',
                    'USRA 0-6-6',
                    'Canadair North Star',
                    'Airbus A400M Atlas',
                    'Bloch MB.131',
                    'Prairie 2-6-2',
                    'EMD GP40',
                    'Amer 4-4-0',
                    'Ferrari F40',
                    'Lamborghini Huracán',
                    'Porsche Carrera GT',
                ];

                service.fetchBrands().subscribe(
                    res => {
                        expect(res).toEqual(<any>expected);
                        done();
                    },
                    () => done.fail()
                );
            });
        });

        describe('with search params', () => {
            describe('When search params is type and color', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'car', color: 'red' };
                    const expected = ['Bugatti Veyron', 'Ferrari F40'];
                    service.fetchBrands(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });

            describe('When search params is only color', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ color: 'grey' };
                    const expected = ['Prairie 2-6-2', 'EMD GP40'];
                    service.fetchBrands(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });

            describe('When search params is only type', () => {
                it('should return correct types', (done: DoneFn) => {
                    const searchValue = <any>{ type: 'train' };
                    const expected = ['USRA 0-6-6', 'Prairie 2-6-2', 'EMD GP40', 'Amer 4-4-0'];
                    service.fetchBrands(searchValue).subscribe(
                        res => {
                            expect(res).toEqual(<any>expected);
                            done();
                        },
                        () => done.fail()
                    );
                });
            });
        });
    });
});
