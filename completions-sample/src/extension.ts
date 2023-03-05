/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider = {
			provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext): vscode.CompletionItem[] {
	
				const additionalEditsCompletion = new vscode.CompletionItem('\\A\\\\\\\\\\\\{');
				additionalEditsCompletion.kind = vscode.CompletionItemKind.Issue;
				additionalEditsCompletion.insertText = '';
				const edit = vscode.TextEdit.replace(
					new vscode.Range(
						new vscode.Position(position.line, position.character - 2),
						new vscode.Position(position.line, position.character + 2)
					),
					'\\A\\\\\\\\\\\\{'
				);
				const edit2 = vscode.TextEdit.replace(
					new vscode.Range(
						new vscode.Position(position.line, position.character - 2 + 20),
						new vscode.Position(position.line, position.character + 2 + 20)
					),
					'\\A\\\\\\\\\\\\}'
				);
				additionalEditsCompletion.additionalTextEdits = [edit, edit2];
				// return all completion items as array
				return [
					additionalEditsCompletion,
					{ 
						"label": "\\[",
						"kind": vscode.CompletionItemKind.Function,
						"detail": "display math \\[ ... \\]",
						"documentation": "`[`",
						"sortText": "[",
						"filterText": "[",
						"insertText":  "[${1:${TM_SELECTED_TEXT}}\\]" 
					}
				];
			}
		}
	const dispo = vscode.languages.registerCompletionItemProvider([{ language: 'plaintext'}, { language: 'latex'}], provider, '\\');

	context.subscriptions.push(dispo);
}
