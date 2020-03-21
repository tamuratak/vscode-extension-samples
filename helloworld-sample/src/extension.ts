import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);

	disposable = vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
		vscode.window.showInformationMessage(`fired: ${path.basename(e.textEditor.document.fileName)}, ${JSON.stringify(e.visibleRanges)}`);
	 })
}

export function deactivate() {}
