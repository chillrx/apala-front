import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**
 * Components
 */
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './main.component';
import { CampanhaComponent } from './components/campanha/campanha.component';
import { UsuarioComponent } from './components/usuario/usuario.component';
import { ParceiroComponent } from './components/parceiro/parceiro.component';
import { InstituicaoComponent } from './components/instituicao/instituicao.component';

const routes: Routes = [{
  path: '', component: MainComponent, children: [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }, {
    path: 'dashboard',
    component: DashboardComponent
  }, {
    path: 'campanha',
    component: CampanhaComponent
  }, {
    path: 'usuario',
    component: UsuarioComponent
  }, {
    path: 'parceiro',
    component: ParceiroComponent
  }, {
    path: 'instituicao',
    component: InstituicaoComponent
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MainRoutingModule { }
