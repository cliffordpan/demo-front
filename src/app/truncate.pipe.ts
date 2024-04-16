import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'truncate',
	standalone: true
})
export class TruncatePipe implements PipeTransform {

	transform(value: string, limit: number = 100, trail: string = '...'): string {
		if (!value || value.length == 0 || value.trim().length == 0) return '';
		if (limit == 0) return value;
		limit = Math.abs(limit);
		if (value.trim().length < limit) {
			return value;
		}
		value = value.substring(0, limit);
		const lastSpace = value.lastIndexOf(' ');
		if (lastSpace == -1) return value + trail;
		value = value.substring(0, lastSpace);
		return value + trail;
	}

}
