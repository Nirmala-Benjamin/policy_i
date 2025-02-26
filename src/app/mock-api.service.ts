import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockApiService {

  constructor() {}

  // Mock the API for fetching insurance products
  getInsuranceProducts(): Observable<string[]> {
    const products = ['Car Insurance', 'Health Insurance', 'Liability Insurance'];
    return of(products);
  }

  // Mock the API for submitting the form data
  submitRequest(formData: any): Observable<any> {
    // Log the data for now (simulate a successful submission)
    console.log('Form Data Submitted:', formData);
    return of({ success: true });
  }

}
