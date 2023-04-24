import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { Absence } from '../interfaces/absence';
import { AbsencesService } from '../services/absences.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-absence',
  templateUrl: './add-absence.component.html',
  styleUrls: ['./add-absence.component.scss']
})
export class AddAbsenceComponent implements OnInit{

  absenceForm!: FormGroup;

  absences: Absence[] = [];

  currentAbsenceCertificatFile!: any;

  constructor(
    private formBuilder: FormBuilder,
    private absensesService: AbsencesService
  ){}

  ngOnInit():void {
    this.initAbsenceForm();
  }
  initAbsenceForm(): void {
    this.absenceForm = this.formBuilder.group({
      index: [null],
      date_debut: [],
      date_fin: [],
      nombre_jours: 0,
      document_id: ''
    })
  }
  public getAbsences(): void {
    this.absensesService.getAbsences().subscribe(
      (response: Absence[]) => {
        this.absences = response;
        console.log(this.absences);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  onSubmitAbsenceForm(): void {
    const absenceIndex = this.absenceForm.value.index;
    let absence = this.absenceForm.value;
    if (absenceIndex == null || absenceIndex == undefined) {
      delete absence.index;
      this.absensesService.createAbsence(absence).subscribe({
        next: (response: Absence) => {
          console.log(response);
          this.absensesService.getAbsences();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        }
      });
    } else {
      delete absence.index;
      this.absences = this.absensesService.editAbsence(absence, absenceIndex);
    }
    this.absenceForm.reset();
  }
  

  onChangeAbsenceCertificat($event: any): void {
    this.currentAbsenceCertificatFile = $event.target.files[0];
    console.log(this.currentAbsenceCertificatFile);
  }
//not used
  downloadPdf(certificat: any) {
    const doc = new jsPDF();
    doc.text(certificat, 10, 10);
    doc.save('certificat.pdf');
  }


  

  onEditAbsence(absence: Absence, index: number): void {
    this.absenceForm.setValue({...absence, index});
  }
//not used
  onDeleteAbsence(index: number): void {
    this.absences = this.absensesService.deleteAbsence(index);
  }

}