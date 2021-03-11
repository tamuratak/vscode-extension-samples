import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-sample" is now active!');
	context.subscriptions.push(
		vscode.languages.registerHoverProvider({ scheme: '*' }, new HoverProvider(context.extensionPath))
	)
	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});
}

class HoverProvider implements vscode.HoverProvider {
	path: string
	constructor(path: string) {
		this.path = path
	}
	provideHover(): vscode.Hover {
		const insideExtensionUri = vscode.Uri.file(path.join(this.path, 'tiger.svg'))
		const fileUri = vscode.Uri.file('/Users/tamura/Downloads/tiger.svg')
		const serverUri = vscode.Uri.parse('https://dev.w3.org/SVG/tools/svgweb/samples/svg-files/tiger.svg')
		const md = `ext: ![svgimg](${insideExtensionUri.toString(true)}) local: ![svgimg](${fileUri.toString(true)}), server: ![svgimg](${serverUri.toString(true)})`
		const mdString = new vscode.MarkdownString(md)
		const hover = new vscode.Hover(mdString)
		return hover
	}
}
