import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactformComponent } from './contactform/contactform.component';
import { ContactsComponent } from './contacts/contacts.component';


const routes: Routes = [
  { path: 'contacts', component: ContactsComponent },
  { path: 'contactform', component: ContactformComponent },
  { path: 'contacts/contactform/:id', component: ContactformComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
