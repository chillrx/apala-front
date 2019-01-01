import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgPipesModule } from 'ngx-pipes';

/**
 * Components
 */

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { CampanhaComponent } from './components/campanha/campanha.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ParceiroComponent } from './components/parceiro/parceiro.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';


@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule,
    NgPipesModule
  ],
  declarations: [
    DashboardComponent,
    MainComponent, CampanhaComponent, UsuarioComponent, ParceiroComponent, InstituicaoComponent
  ]
})
export class MainModule { }
