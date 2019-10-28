import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Register } from './register.page';
import { RegisterConsumer } from '../register_consumer/register_consumer.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: Register }, { path: 'consumer', component: RegisterConsumer }])
  ],
  declarations: [Register, RegisterConsumer]
})
export class RegisterModule {}
