import { Injectable } from '@angular/core';
import { Absence } from '../interfaces/absence';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AbsencesService {

  private absences: Absence[] = [];
  private baseURL = "http://localhost:8081";

  constructor(private http : HttpClient) { }

  getAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${this.baseURL}/absencemaladie/allAbsence`);
  }

  createAbsence(absence: Absence): Observable<Absence> {
    return this.http.post<Absence>(`${this.baseURL}/absencemaladie/save`, absence);
  }
//no backend
  editAbsence(absence: Absence, index: number): Absence[] {
    this.absences[index] = absence;
    return this.absences;
  }
//not used
  deleteAbsence(absenceIndex: number): Absence[] {
    this.absences.splice(absenceIndex, 1);
    return this.absences;
  }

  

}
