import { Component, OnInit } from '@angular/core';
import { DataService } from './shared/users.service';
import { UserModel, UserRequestModel } from './shared/users.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ModalComponent } from '../component/modal/modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  dataUsers: UserModel[] = [];
  bsModalRef!: BsModalRef;
  userToEdit: UserModel | null = null; 
  user!:UserModel
  constructor(private userService: DataService, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getUsers();
  }


  openAddUserModal(user?: UserModel) {
    const initialState : Partial<ModalComponent> = {  initialState:user }; 
    this.bsModalRef = this.modalService.show(ModalComponent, { initialState });

    this.bsModalRef.content.saved.subscribe((request: UserRequestModel) => {
      if (user) {
        
        this.onEditUser(user.id,request); 
      } else {
        this.onUserSaved(request); 
      }
    });
  }

  getUsers(): void {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.dataUsers = data;
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onEditUserModal(id:number): void {
    this.userService.getUserById(id).subscribe({
      next: (data) => {
        this.user = data;
        this.openAddUserModal(this.user)
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onEditUser(id:number,user: UserRequestModel): void {
    this.userService.editUser(id,user).subscribe({
      next: (data) => {
        console.log("Edit berhasil");
        this.getUsers();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onDeleteUser(id: number): void {
    console.log("delete user " + id);
    this.userService.deleteUser(id).subscribe({
      next: (data) => {
        console.log("edit berhasil , response : " + data);
        this.getUsers();
      },
      error: (error) => {
        console.error('Error fetching data:', error);
      }
    });
  }

  onUserSaved(request: UserRequestModel) {
    this.userService.createUser(request).subscribe({
      next: (response) => {
        console.log('Pengguna berhasil disimpan di backend:', response);
        this.getUsers();
      },
      error: (error) => {
        console.error('Error saving user to backend:', error);
      }
    });
  }
}
