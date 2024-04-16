import { MatDialog } from "@angular/material/dialog";
import { DecoratorService } from "./decorator.service";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";
import { formatString } from "./utils";



export const Confirm: (config: string) => MethodDecorator = (config: string) => {
	return (target: any, name: any, descriptor: PropertyDescriptor) => {
		const originalMethod = descriptor.value;
		descriptor.value = function (...args: any[]) {
			const dialog = DecoratorService.inject(MatDialog);
			const _this = this;
			const message = formatString(config, args);
			dialog.open<ConfirmDialogComponent, string, boolean>(ConfirmDialogComponent, {
				data: message
			}).afterClosed().subscribe(rs => {
				if (rs) {
					originalMethod.call(_this, ...args);
				}
			})
		}
	};
}



