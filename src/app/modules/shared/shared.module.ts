import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';
import { AuthGuard } from './guards/auth.guard';
import { ComponentModule } from './component.module';
import { MaterialModule } from './material.module';
import { AuthenticationService } from './services/nodejs/authentication.service';
import { CrudService } from './services/nodejs/crud.service';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { StringService } from './services/string.service';
import { ArrayService } from './services/array.service';
import { FormatDateDmyPipe } from './pipes/format-date-dmy.pipe';
import { UpdateCampanhaComponent } from '../main/components/campanha/update-campanha/update-campanha.component';
import { UpdateInstituicaoComponent } from '../main/components/instituicao/update-instituicao/update-instituicao.component';
import { UpdateUsuarioComponent } from '../main/components/usuario/update-usuario/update-usuario.component';
import { UpdateParceiroComponent } from '../main/components/parceiro/update-parceiro/update-parceiro.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    TextMaskModule
  ], exports: [
    ComponentModule,
    MaterialModule,
    ReactiveFormsModule,
    DeleteConfirmComponent,
    FormatDateDmyPipe
  ], declarations: [
    DeleteConfirmComponent,
    UpdateCampanhaComponent,
    UpdateUsuarioComponent,
    UpdateParceiroComponent,
    UpdateInstituicaoComponent,
    FormatDateDmyPipe
  ], providers: [
    AuthenticationService,
    AuthGuard,
    CrudService,
    ArrayService,
    StringService
  ], entryComponents: [
    DeleteConfirmComponent,
    UpdateCampanhaComponent,
    UpdateUsuarioComponent,
    UpdateParceiroComponent,
    UpdateInstituicaoComponent
  ]
})
export class SharedModule { }
