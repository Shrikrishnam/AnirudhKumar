import { Component, ElementRef, ViewChild } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from "../_services";

export class Fitness {
  constructor(
    public inr: number,
    public paisa: number,
    public streetaddress: string,
    public city: string,
    public state: string,
    public country: string,
    public pincode: number,
    public phonenumber: number,
    public email: string,
    public firstname: string,
    public lastname: string,
    public age: number,
    public trainerpreference: string,
    public physiotherapist: string,
    public packages: string
  ) {}
}

@Component({
  selector: "app-place-fitness-trainer-appointment",
  templateUrl: "./place-fitness-trainer-appointment.component.html",
})
export class PlaceFitnessTrainerAppointmentComponent {
  @ViewChild("focus", { read: "", static: true }) focus: ElementRef;
  fitnessForm: FormGroup;
  path: string;
  id: any;

  constructor(private user: UserService) {}

  ngOnInit() {
    this.fitnessForm = new FormGroup({
      inr: new FormControl("", Validators.required),
      paisa: new FormControl("", Validators.required),
      streetaddress: new FormControl("", Validators.required),
      city: new FormControl("", Validators.required),
      state: new FormControl("", Validators.required),
      country: new FormControl("", Validators.required),
      pincode: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{6}"),
      ]),
      phonenumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^[0-9]{10}")
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("^[A-Za-z0-9._+]+@[a-z0-9]+.[a-z]+"),
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
    setTimeout(() => {
      this.focus.nativeElement.focus();
    });
  }

  onSubmit() {
    this.user.postfitnessdata(this.fitnessForm.value).subscribe(
      (data: Response) => {
        alert("Data saved successfully.");
      },
      (err) => {
        alert("Error: Data failed to saved.");
      }
    );
  }
}
