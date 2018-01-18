import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import { PAGES_ROUTES } from './pages.routes';

import {DashboardComponent} from './dashboard/dashboard.component';
import {Graficas1Component} from './graficas1/graficas1.component';
import {ProgressComponent} from './progress/progress.component';
import {PagesComponent} from './pages.component';
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficoDonaComponent } from '../components/grafico-dona/grafico-dona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

// ng2-charts
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent,
    IncrementadorComponent,
    GraficoDonaComponent,
    AccountSettingsComponent
  ],
  exports: [
    DashboardComponent,
    Graficas1Component,
    ProgressComponent,
    PagesComponent
  ],
  imports: [
    SharedModule,
    PAGES_ROUTES,
    FormsModule,
    ChartsModule
  ]
})
export class PagesModule { }
