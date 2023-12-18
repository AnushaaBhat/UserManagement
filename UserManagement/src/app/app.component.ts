import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { DataService } from './data.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, NgFor, NgIf, HttpClientModule],
  providers: [DataService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  errorMessage = '';
  isCreateClicked = false;
  isDeletedClicked = false;
  isLoginSuccessful = false;

  userList: {
    firstName: string,
    lastName: string,
    dob: string
  }[] = [];

  constructor(private dataService: DataService) {}

  login(loginDetails: { username:string; password:string})
  {
    if(loginDetails.username === "admin" && loginDetails.password === "admin"){
      //get already registered user to be displayed 
      this.dataService.getUser().subscribe((response) => {this.userList = response;});
      this.isLoginSuccessful = true;
      this.errorMessage = '';
    }
    else{
      this.errorMessage = 'Invalid username or password';
    }
  }

  logout()
  {
    this.isLoginSuccessful = false;
  }
  
  createUser() {
    this.isCreateClicked = true;
  }

  deleteUser() {
    this.isDeletedClicked = true;
  }

  onSubmit(data: { firstName: string; lastName: string; dob: string }) {
    this.dataService.createUser(data).subscribe((response) => {
      this.userList = response;
    });
    this.isCreateClicked = false;
  }

  onDelete(index: number) {
    this.dataService.deleteUser(index).subscribe((response) => {
      this.userList = response;
    });
    this.isDeletedClicked = false;
  }

  onBack() {
    this.isCreateClicked = false;
    this.isDeletedClicked = false;
  }
}
