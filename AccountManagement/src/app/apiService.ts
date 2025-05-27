import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./models/user";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    user: User = {
        id: 0,
        firstName: '',
        lastName: '',
        password: ''
    }
    
    constructor(private http: HttpClient) {}
    
    registerNewUser(user: User) {
    this.http.post('http://localhost:3000/api/register', user) // <-- korrekt
    .subscribe({
        next: () => alert('Daten wurden gespeichert'),
        error: () => alert('Fehler beim Speichern'),
    });
}
}