import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup, Validators, FormControl, FormBuilder } from '@angular/forms';
import { StateService } from './state.service';
import { INameChange } from '../../../core/auth/models/input.interfaces';
import { User } from '../../../core/auth/models/user.model';

@Component({
    selector: 'app-name',
    template:
    `
    <div>
        <form [formGroup]="nameForm" fxLayout="row">
            <mat-form-field style="width: 100%" appearance="outline">
                    <input matInput placeholder="{{ 'AUTH.NAME' | translate }}" formControlName="name" autocomplete="off">
                    <mat-error *ngIf="name.hasError('required')"><span translate>AUTH.NAME-REQUIRED</span></mat-error>
            </mat-form-field>
                    <button mat-icon-button *ngIf="name.dirty && name.valid" (click)="saveName(name.value)">
                            <mat-icon color="warn">check</mat-icon>
                    </button>
        </form>
    </div>
    `,
    styleUrls: ['./input-component.css']
  })
export class NameComponent implements OnChanges {

    get name() {
        return this.nameForm.get('name');
    }
    nameForm: FormGroup;
    // Component rendered by user or admin
    @Input() user: User;

    constructor(
        private fb: FormBuilder,
        private stateService: StateService
        ) {
            this.nameForm = this.fb.group({
                name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zÑñáéíóúüÁÉÍÓÚ ]*')])
            });
        }

    ngOnChanges() {
        this.nameForm.get('name').setValue(this.user.name);
    }

    saveName(name: string) {
        const userData: INameChange = {
            email: this.user.email,
            name: name
        };
        this.stateService.updateName(userData);
        this.nameForm.reset();
    }

}
