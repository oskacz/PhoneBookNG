import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contacts } from '../services/model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PhonebookserviceService {
  // url = "https://localhost:44389/"
   url = "https://phonebook-wwsis.azurewebsites.net/"
  constructor(private http: HttpClient) { }

  contacts: Contacts;

  getContacts(): Observable<Contacts[]> {
    return this.http.get<Contacts[]>(this.url + "contact");
  }

  deleteContact(idcontact:number){
    return this.http.delete(this.url + "contact/deletecontact/"+ idcontact)
  }

  addContact(contact : Contacts){
    return this.http.post(this.url + "contact/addcontact", contact);
  }

  getContactById(contactId:number) : Observable<Contacts>{
    return this.http.get<Contacts>(this.url + contactId);
  }

  updateContact(contact:Contacts){
    return this.http.post(this.url + "contact/updatecontact", contact);
  }
}
