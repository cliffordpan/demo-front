export const formatString = (template: string, ...args: any[]) => {
	return template.replace(/{([0-9]+)}/g, function (match, index) {
		return typeof args[index] === 'undefined' ? match : args[index];
	});
}