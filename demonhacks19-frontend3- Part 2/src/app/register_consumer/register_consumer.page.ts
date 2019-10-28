import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpRequest  } from '@angular/common/http';
import { Consumer } from './consumer';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-consumer',
  templateUrl: 'register_consumer.page.html',
  styleUrls: ['register_consumer.page.scss']
})

export class RegisterConsumer {
  consumer: Consumer = {email: '', password: '', age: '', gender: '', location: { lat:41.889345, lon:-87.6267064 } };
  submitted = false;
  errors = [];

  constructor(
    private http: HttpClient,
    private router: Router,
    public alertController: AlertController
  ){

  }

  onSubmit(form: NgForm) {
    if (form.invalid || this.submitted) {
        return;
    }
    this.submitted = true;

    console.log(this.consumer)

    this.registerConsumer(this.consumer).subscribe(results => {
      console.log(results)
      this.router.navigate(['/consumer'])
    }, error => {console.log(error); this.submitted=false} )
  }

  registerConsumer(consumer: Consumer) {
    return this.http.post<Consumer>('/api/auth/register/consumer', consumer)
  }
}
