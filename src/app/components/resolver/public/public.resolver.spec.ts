import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { publicResolver } from './public.resolver';

describe('publicResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => publicResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
