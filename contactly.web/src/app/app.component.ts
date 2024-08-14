import { AsyncPipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.model';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule,AsyncPipe,FormsModule,ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  // title = 'contactly.web';
   http = inject(HttpClient);

    contectForm= new FormGroup({
      name: new FormControl<string>(''),
      email : new FormControl<string | null>(''),
      phone : new FormControl<string>(''),
      favorite : new FormControl<boolean>(false),
    }) 

   contacts$ = this.Getcontact();

   onFormSubmit(){
    // console.log(this.contectForm.value);
    const addContactRequest= {
      name: this.contectForm.value.name,
      email: this.contectForm.value.email,
      phone : this.contectForm.value.phone,
      favorite: this.contectForm.value.favorite,
    } 
    
    this.http.post('https://localhost:7112/api/Contract',addContactRequest)
     .subscribe({
      next:(value)=>{
       console.log(value);
       
      this.contacts$ = this.Getcontact();
      this.contectForm.reset();
      }
     });
   }

   onDelete(id : string)
   {
     this.http.delete(`https://localhost:7112/api/Contract/${id}`)
     .subscribe({
      next:(value)=> {
         alert("Item deleted"); 
        this. contacts$ = this.Getcontact();
      }
     });
   }

   private Getcontact(): Observable<Contact[]>
   {
     return this.http.get<Contact[]>('https://localhost:7112/api/Contract');

   }



}
