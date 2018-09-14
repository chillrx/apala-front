import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * MOdules
 */
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';

/**
 * Components
 */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { CampanhaComponent } from './components/campanha/campanha.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ParceiroComponent } from './components/parceiro/parceiro.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';
import { UpdateParceiroComponent } from './components/update-parceiro/update-parceiro.component';
import { UpdateInstituicaoComponent } from './components/update-instituicao/update-instituicao.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule,
    SharedModule
  ],
  declarations: [
    DashboardComponent,
    MainComponent, CampanhaComponent, UsuarioComponent, ParceiroComponent, InstituicaoComponent
  ]
})
export class MainModule { }
