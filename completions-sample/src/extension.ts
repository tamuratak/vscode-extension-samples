/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			// a simple completion item which inserts `Hello World!`
			const item01 = new vscode.CompletionItem('aaa');
			item01.additionalTextEdits = [vscode.TextEdit.insert(position.translate(0, 10), 'aaa')];
			// return all completion items as array
			return [
				item01
			];
		}
	});

	context.subscriptions.push(provider1);
}
