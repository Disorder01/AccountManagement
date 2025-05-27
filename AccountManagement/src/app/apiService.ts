import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "./models/user";
import { Router } from "@angular/router";

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
    
    constructor(private http: HttpClient, private router: Router) {}
    
    registerNewUser(user: User) {
        this.http.post('http://localhost:3000/api/register', user) 
            .subscribe({
                next: () => alert('Daten wurden gespeichert'),
                error: () => alert('Fehler beim Speichern'),
            });
    }
    
    login(lastName: string, password: string) {
       this.http.post<{ success: boolean }>('http://localhost:3000/api/login', { lastName, password })
        .subscribe({
        next: (res) => {
            if (res.success) {
                alert('Login erfolgreich!');
                this.router.navigate(['/overview'])
            } else {
            alert('Falscher Nachname oder Passwort!');
            }
        },
        error: () => {
            alert('Fehler beim Login');
        }
        }); 
    }
}