import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC6kW6DJI_2j7RleV9WHf-irmy-g3IfY88",
  authDomain: "quick-conversion.firebaseapp.com",
  projectId: "quick-conversion",
  storageBucket: "quick-conversion.appspot.com",
  messagingSenderId: "1021530035753",
  appId: "1:1021530035753:web:d4fff88e9d55596c522e38",
  measurementId: "G-24K9X164XH"
};

const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
