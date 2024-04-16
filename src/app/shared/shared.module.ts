import { NgModule } from '@angular/core';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatBadgeModule } from '@angular/material/badge';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';

const modules = [
	CommonModule,
	MatIconModule,
	MatButtonModule,
	MatIconModule,
	MatTooltipModule,
	MatFormFieldModule,
	MatInputModule,
	MatBadgeModule,
	MatDialogModule,
	MatSlideToggleModule,
	MatDividerModule,
	ReactiveFormsModule
];

@NgModule({
	declarations: [],
	imports: modules,
	exports: modules
})
export class SharedModule {
	constructor(private registry: MatIconRegistry) {
		const defaultFontSetClasses = registry.getDefaultFontSetClass();
		const outlinedFontSetClasses = defaultFontSetClasses
			.filter((fontSetClass) => fontSetClass !== 'material-icons')
			.concat(['material-symbols-outlined']);
		registry.setDefaultFontSetClass(...outlinedFontSetClasses);
	}
}
