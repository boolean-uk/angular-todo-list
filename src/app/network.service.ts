import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "any"
})
export class NetworkService {
    baseURL: String = ""
    
    constructor(private http: HttpClient) {}

    public GET_SUBSCRIPTION<T>(endpoint: string) {
        return this.http.get<T>(this.baseURL + endpoint)
    }

    public GET<T>(endpoint: string, callback: (value: T) => void) {
        return this.GET_SUBSCRIPTION<T>(endpoint).subscribe(callback)
    }

    public POST<T>(endpoint: string, body: Object, callback: (value: T) => void = () => {}) {
        return this.http.post<T>(this.baseURL + endpoint, body).subscribe(callback)
    }

    public PUT<T>(endpoint: string, body: Object, callback: (value: T) => void = () => {}) {
        return this.http.put<T>(this.baseURL + endpoint, body).subscribe(callback)
    }

    public DELETE<T>(endpoint: string, callback: (value: T) => void) {
        return this.http.delete<T>(this.baseURL + endpoint).subscribe(callback)
    }
}
