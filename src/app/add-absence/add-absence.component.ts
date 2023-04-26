import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import jsPDF from 'jspdf';
import { Absence } from '../interfaces/absence';
import { Router } from '@angular/router';

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
    private route:Router
   // private absensesService: AbsencesService
  ){}

  ngOnInit():void {
    this.initAbsenceForm();
  }
  initAbsenceForm(): void {
    this.absenceForm = this.formBuilder.group({
      index: [0],
      date_debut: [],
      date_fin: [],
      nombre_jours: 0,
      document_id: []
    })
  }

  onSubmitAbsenceForm(): void {
    const absenceIndex = this.absenceForm.value.index;
    let absence = this.absenceForm.value;
    if (absenceIndex == null || absenceIndex == undefined) {
      delete absence.index;
      this.absences.push(absence);
    } else {
      delete absence.index;
      this.absences[absenceIndex] = absence;
    }
    this.absenceForm.reset();
    console.log(this.absences);
    alert("Les données ont été enregistrées avec succès !");
    
  }
  
  

  onChangeAbsenceCertificat($event: any): void {
    this.currentAbsenceCertificatFile = $event.target.files[0];
  }

//not used
 
downloadPdf(certificat: any) {
  const doc = new jsPDF();
  doc.text(certificat, 10, 10);
  doc.save('certificat.pdf');
}



//not used
onDeleteAbsence(index: number): void {
const isSure = confirm("Êtes-vous sûr de vouloir supprimer cette absence ?");
if (isSure) {
  this.absences.splice(index, 1);
}
}
  

 
}