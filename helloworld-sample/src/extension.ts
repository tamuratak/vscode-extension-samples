import * as path from 'path';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const editor = vscode.window.activeTextEditor
		if (editor) {
			console.log(`hello world: ${JSON.stringify(editor.visibleRanges)}`)
		}
	});

	context.subscriptions.push(disposable);

	disposable = vscode.window.onDidChangeTextEditorVisibleRanges((e) => {
		console.log(`fired: ${path.basename(e.textEditor.document.fileName)}, ${JSON.stringify(e.visibleRanges)}`);
	 })
}

export function deactivate() {}
