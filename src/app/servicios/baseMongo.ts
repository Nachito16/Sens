import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class baseMongo {

    apiURL: string = `${environment.apiUrl}`

    constructor(private http: HttpClient, private router: Router) { }

    // Get all users
    getListing() {
        return this.http.get(`${this.apiURL}/listings`);
    }

    postListing(listing: any) {
        return this.http.post(`${this.apiURL}/listings`, listing);
    }

    updateListing(_id: string, updatedListing: any) {
        return this.http.put(`${this.apiURL}/listings/${_id}`, updatedListing);
    }

    deleteListing(_id: string) {
        return this.http.delete(`${this.apiURL}/listings/${_id}`);
    }

}
