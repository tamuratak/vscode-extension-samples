import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	const provider1 = vscode.languages.registerCompletionItemProvider({ scheme: 'file', language: 'abc' }, {
		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {
			const consoleCompletion = new vscode.CompletionItem('console');
			// return all completion items as array
			return [
				consoleCompletion,
			];
		}
	});
	context.subscriptions.push(provider1);
}
