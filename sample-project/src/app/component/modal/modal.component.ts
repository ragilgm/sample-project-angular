import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserModel, UserRequestModel } from '../../users/shared/users.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Output() saved = new EventEmitter<UserRequestModel>();
  @Input() initialState!: UserModel;


  createUser!: FormGroup;
  userReq! : UserRequestModel

  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder) {}

  ngOnInit(): void {    
    this.createUser = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    if (this.initialState) {
      this.createUser.setValue({
        name: this.initialState.name,
        email: this.initialState.email
      });
    }
  }

  saveUser() {
    if(!this.createUser.valid){
      alert("data invalid")
      return
    }

    this.userReq={
      "name":this.createUser.value.name,
      "email":this.createUser.value.email
    }

    this.saved.emit(this.userReq);
    this.bsModalRef.hide();
  }
}
