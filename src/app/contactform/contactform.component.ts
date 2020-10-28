import { Component, Input, OnInit } from '@angular/core';
import { PhonebookserviceService } from '../core/phonebookservice.service';
import { Contacts } from '../services/model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-contactform',
  templateUrl: './contactform.component.html',
  styleUrls: ['./contactform.component.css']
})
export class ContactformComponent implements OnInit {

  constructor(private serv: PhonebookserviceService, private route: ActivatedRoute, private router : Router) { }
  

  newContact : Contacts;
  id : number
  ngOnInit(): void {
    this.newContact = new Contacts();
    this.route.params.subscribe(params => {this.id =  params["id"] });
    if(this.id != null) {this.LoadDataById(this.id)}
  }

  AddContact(){
    this.serv.addContact(this.newContact).subscribe(x => {});
    console.log(this.newContact)
    this.router.navigate(['/contacts']) 
  }

  LoadDataById(id:number){
    this.serv.getContactById(id).subscribe(x => {this.newContact = x, console.log(x)})
  }

  UpdateContact(contact:Contacts){
     this.serv.updateContact(contact).subscribe(x => { console.log(x)})
  }

}
