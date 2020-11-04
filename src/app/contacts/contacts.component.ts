import { Component, Input, OnInit } from '@angular/core';
import { PhonebookserviceService } from '../core/phonebookservice.service';
import { Contacts } from '../services/model';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit , AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private serv: PhonebookserviceService) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  contacts: Contacts[];
  contactToDeleteId: number;
  displayedColumns: string[] = ['Imie', 'Nazwisko', 'Telefon', 'Adres' ,'Miasto', 'Kod pocztowy','Edytuj','Usun'];
  dataSource: MatTableDataSource<Contacts>;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    
  }

  rerender(): void {
    this.dataSource = new MatTableDataSource(this.contacts);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
