import { Component, OnInit } from "@angular/core";
import { UserService } from "../_services";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-view-appointment",
  templateUrl: "./view-appointment.component.html",
})
export class ViewAppointmentComponent implements OnInit {
  fitnessForm: FormGroup;
  constructor(private userservice: UserService) {}
  users: any = [];

  userId: any;

  ngOnInit() {
    this.getfitness();
    this.fitnessForm = new FormGroup({
      inr: new FormControl("", Validators.required),
      paisa: new FormControl("", Validators.required),
      streetaddress: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      pincode: new FormControl("", [
        Validators.required,
        Validators.maxLength(6),
      ]),
      phonenumber: new FormControl("", [
        Validators.required,
        Validators.maxLength(10),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
      ]),
      firstname: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z]+"),
      ]),
      lastname: new FormControl("", [
        Validators.required,
        Validators.pattern("^[A-Za-z]+"),
      ]),
      age: new FormControl("", [
        Validators.required,
        Validators.min(18),
        Validators.max(60),
      ]),
      trainerpreference: new FormControl("", Validators.required),
      physiotherapist: new FormControl("", Validators.required),
      packages: new FormControl("", Validators.required),
    });
  }

  getfitness() {
    this.userservice.getfitnessdata().subscribe(
      (data: Response) => {
        this.users = data;
      },
      (err) => {
        alert("Error: Loading Records.");
      }
    );
  }

  confirmDelete(id) {
    this.userId = id;
  }

  delete() {
    this.userservice
      .deletefitnessdata(this.userId)
      .subscribe((data: Response) => {
        this.getfitness();
        this.userId = "";
      });
  }

  loadEditModel(id) {
    this.userId = id;
    this.userservice.getsinglefitnessdata(id).subscribe(<Response>(data) => {
      this.fitnessForm = new FormGroup({
        inr: new FormControl(data.inr, Validators.required),
        paisa: new FormControl(data.paisa, Validators.required),
        streetaddress: new FormControl(data.streetaddress, Validators.required),
        city: new FormControl(data.city, Validators.required),
        state: new FormControl(data.state, Validators.required),
        country: new FormControl(data.country, Validators.required),
        pincode: new FormControl(data.pincode, [
          Validators.required,
          Validators.maxLength(6),
        ]),
        phonenumber: new FormControl(data.phonenumber, [
          Validators.required,
          Validators.maxLength(10),
        ]),
        email: new FormControl(data.email, [
          Validators.required,
          Validators.email,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$"),
        ]),
        firstname: new FormControl(data.firstname, [
          Validators.required,
          Validators.pattern("^[A-Za-z]+"),
        ]),
        lastname: new FormControl(data.lastname, [
          Validators.required,
          Validators.pattern("^[A-Za-z]+"),
        ]),
        age: new FormControl(data.age, [
          Validators.required,
          Validators.min(18),
          Validators.max(60),
        ]),
        trainerpreference: new FormControl(
          data.trainerpreference,
          Validators.required
        ),
        physiotherapist: new FormControl(
          data.physiotherapist,
          Validators.required
        ),
        packages: new FormControl(data.packages, Validators.required),
      });
    });
  }

  onSubmit() {
    this.userservice
      .editfitnessdata(this.userId, this.fitnessForm.value)
      .subscribe((data: Response) => {
        this.getfitness()
      });
  }
}
