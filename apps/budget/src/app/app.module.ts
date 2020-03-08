import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './features/login/login.component';
import { HomeComponent } from './features/home/home.component';
import { BudgetsComponent } from './budgets/budgets.component';
import { ReceiptsComponent } from './features/receipts/receipts.component';
import { BudgetDetailsComponent } from './budgets/budget-details/budget-details.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { routes } from './app.routes';
import { FeaturesModule } from './features/features.module';
import { StudentsModule } from './features/students/students/students.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    BudgetsComponent,
    ReceiptsComponent,
    BudgetDetailsComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(
      routes,
      { enableTracing: false } // <-- debugging purposes only
    ),
    FeaturesModule,
    StudentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
