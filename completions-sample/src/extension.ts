/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {
	
				const additionalEditsCompletion = new vscode.CompletionItem('\\Z\\\\\\\\\\\\{');
				additionalEditsCompletion.kind = vscode.CompletionItemKind.Issue;
				additionalEditsCompletion.insertText = '';
				const edit = vscode.TextEdit.replace(
					new vscode.Range(
						new vscode.Position(position.line, position.character - 2),
						new vscode.Position(position.line, position.character + 2)
					),
					'\\Z\\\\\\\\\\\\{'
				);
				const edit2 = vscode.TextEdit.replace(
					new vscode.Range(
						new vscode.Position(position.line, position.character - 2 + 20),
						new vscode.Position(position.line, position.character + 2 + 20)
					),
					'\\Z\\\\\\\\\\\\}'
				);
				additionalEditsCompletion.additionalTextEdits = [edit, edit2];
				const item = {
					"label": "\\aaa",
				}
				// return all completion items as array
				return [
					additionalEditsCompletion,
					item
				];
			}
		}
	const dispo = vscode.languages.registerCompletionItemProvider({ language: 'plaintext' }, provider, '\\');

	context.subscriptions.push(dispo);
}
