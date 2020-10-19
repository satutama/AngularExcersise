import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [AppComponent],
    imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule, RouterModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
