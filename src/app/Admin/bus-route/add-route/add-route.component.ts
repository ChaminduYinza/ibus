import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { RouteService } from '../../../services/route-service.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-add-route',
  templateUrl: './add-route.component.html',
  styleUrls: ['./add-route.component.scss']
})
export class AddRouteComponent implements OnInit {

  routeForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private routeService: RouteService) { }

  validTextType: boolean = false;
  ngOnInit() {
    this.routeForm = this.formBuilder.group({
      route_no: [null, Validators.required],
      total_km:[null, Validators.required],
      route_from: [null, Validators.required],
      route_to: [null, Validators.required],
      stations: this.formBuilder.array([])
    });
  }
  get stationForms() {
    return this.routeForm.get('stations') as FormArray
  }
  addPhone() {
    const station = this.formBuilder.group({
      name: [null, Validators.required],
      lat: [null, Validators.required],
      lng: [null, Validators.required]
    })
    this.stationForms.push(station)
  }
  deletePhone(i){
    this.stationForms.removeAt(i)
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
  addRoute() {

      const route = {
        route_no:this.routeForm.value.route_no,
        total_km:this.routeForm.value.total_km,
        route_from:this.routeForm.value.route_from,
        route_to:this.routeForm.value.route_to,
        bus_stops:this.routeForm.value.stations
      }
      this.routeService.addRoute(route).subscribe((res) => {
        if (res.status) {
          console.log(res);
          Swal("Sucess!", res.data, "success");
          this.routeForm.reset();
        } else {
          Swal("Error!",res.data, "warning");
        }
  
      }, (err) => {
        Swal("Error!", err.data, "warning");
  
      })
    
  }

}
