import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { HeaderComponent } from './shared/components/header/header.component';
import { NgxPieChartComponent } from './shared/components/ngx-pie-chart/ngx-pie-chart.component';
import { CountryDetailsComponent } from './pages/country-details/country-details.component';
import { NgxLineChartComponent } from './shared/components/ngx-line-chart/ngx-line-chart.component';
import { StatsCardComponent } from './shared/components/stats-card/stats-card.component';
import { LoadingSpinnerComponent } from './shared/components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CountryDetailsComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HeaderComponent,
    NgxPieChartComponent,
    NgxLineChartComponent,
    StatsCardComponent,
    LoadingSpinnerComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
