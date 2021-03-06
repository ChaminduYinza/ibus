import { Component, OnInit } from '@angular/core';
import { FormBuilder, AbstractControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user-service.service'
import { BusService } from '../../../services/bus-service.service'
import Swal from 'sweetalert2'



@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  userForm: FormGroup;
  busList: any;
  validTextType: boolean = false;
  userRole = [
    'Admin',
    'Timekeeper',
    'Driver',
  ];

  constructor(private busService: BusService, private formBuilder: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.userForm = this.formBuilder.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, Validators.required],
      contactNo: [null, Validators.required],
      password: [null, Validators.required],
      userRole: [null, Validators.required],
      busNo: [null, Validators.required]

    });
    this.getBuses();
  }
  getBuses() {
    this.busService.getBus().subscribe((data) => {
      console.log(data)
      this.busList = data.data;
    })
  }


  textValidationType(e) {
    if (e) {
      this.validTextType = true;
    } else {
      this.validTextType = false;
    }
  }
  isFieldValid(form: FormGroup, field: string) {
    return !form.get(field).valid && form.get(field).touched;
  }
  displayFieldCss(form: FormGroup, field: string) {
    return {
      'has-error': this.isFieldValid(form, field),
      'has-feedback': this.isFieldValid(form, field)
    };
  }
  demo() {

    this.userForm.patchValue({
      firstName: "David",
      lastName: "Perera",
      email: "dav.pe@gmail.com",
      contactNo: "0714584754",
      password: "123456"
    })

  }
  registerUser() {

    const user = {
      first_name: this.userForm.value.firstName,
      last_name: this.userForm.value.lastName,
      email: this.userForm.value.email,
      contact_no: this.userForm.value.contactNo,
      password: this.userForm.value.password,
      role: this.userForm.value.userRole,
      bus_id: this.userForm.value.busNo,

    };

    this.userService.registerUser(user).subscribe((res) => {

      if (res.status) {
        Swal("Sucess!", res.msg, "success");
        this.userForm.reset();
      } else {
        Swal("Error!", res.msg, "warning");

      }

    }, (err) => {
      Swal("Error!", err.msg, "warning");

    })
  }
}