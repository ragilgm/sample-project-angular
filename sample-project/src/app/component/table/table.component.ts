import { Component, EventEmitter, Input, OnInit, Output, input } from '@angular/core';
import { UserModel } from '../../users/shared/users.model';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'] 
})
export class TableComponent  implements OnInit{


  @Input() tableData : UserModel[] =[]
  @Output() editClicked: EventEmitter<number> = new EventEmitter<number>();
  @Output() deleteClicked: EventEmitter<number> = new EventEmitter<number>();

  
  constructor() { }

  ngOnInit(): void {
    
  }

  editUser(index?: number): void {   
    console.log("update user"); 
    this.editClicked.emit(index);
  }

  deleteUser(index?: number): void {  
    console.log("delete user");
    this.deleteClicked.emit(index);
  }

}
