import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDk9c0d_vXJdo587-waZ2BprClEGyLNeOs",
  authDomain: "quick-conversion-4d1cf.firebaseapp.com",
  projectId: "quick-conversion-4d1cf",
  storageBucket: "quick-conversion-4d1cf.appspot.com",
  messagingSenderId: "32915826316",
  appId: "1:32915826316:web:463cf450a0033f7f5f3da9",
  measurementId: "G-NR0D0LG233"
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
