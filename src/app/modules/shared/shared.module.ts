import { UpdateInstituicaoComponent } from './../main/components/update-instituicao/update-instituicao.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Guards
 */
import { AuthGuard } from './guards/auth.guard';

/**
 * Modules
 */
import { ComponentModule } from './component.module';
import { MaterialModule } from './material.module';

/**
 * Services
 */
import { AuthenticationService } from './services/nodejs/authentication.service';
import { CrudService } from './services/nodejs/crud.service';
import { DeleteConfirmComponent } from './components/delete-confirm/delete-confirm.component';
import { StringService } from './services/string.service';
import { ArrayService } from './services/array.service';
import { UpdateCampanhaComponent } from '../main/components/update-campanha/update-campanha.component';
import { UpdateUsuarioComponent } from '../main/components/update-usuario/update-usuario.component';

/***Pipes***/
import { FormatDateDmyPipe } from './pipes/format-date-dmy.pipe';
import { UpdateParceiroComponent } from '../main/components/update-parceiro/update-parceiro.component';

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
    UpdateCampanhaComponent,
    UpdateUsuarioComponent,
    UpdateParceiroComponent,
    UpdateInstituicaoComponent,
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
