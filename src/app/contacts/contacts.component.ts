import { Component, Input, OnInit } from '@angular/core';
import { PhonebookserviceService } from '../core/phonebookservice.service';
import { Contacts } from '../services/model';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {

  constructor(private serv: PhonebookserviceService) { }

  contacts: Contacts[];
  contactToDeleteId: number;
  displayedColumns: string[] = ['Imie', 'Nazwisko', 'Telefon', 'Adres' ,'Miasto', 'Kod pocztowy','Edytuj','Usun'];
  dataSource: MatTableDataSource<Contacts>;

  rerender(): void {
    this.dataSource = new MatTableDataSource(this.contacts);
  }

  ngOnInit() {
    this.WczytajDane();
  }

  WczytajDane(){
    this.serv.getContacts().subscribe(x => {
      this.contacts = x;
      this.rerender();
    });
  }

  DeleteContact(contactToDeleteId:number){
    console.log(contactToDeleteId)
    this.serv.deleteContact(contactToDeleteId).subscribe(x => {   console.log("Usunięto kontakt"),     this.rerender(),   this.WczytajDane(); 
  })
  
  }
}
