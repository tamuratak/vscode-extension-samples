/*---------------------------------------------------------
 * Copyright (C) Microsoft Corporation. All rights reserved.
 *--------------------------------------------------------*/

import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {

	const provider1 = vscode.languages.registerCompletionItemProvider('plaintext', {

		provideCompletionItems(document: vscode.TextDocument, position: vscode.Position, token: vscode.CancellationToken, context: vscode.CompletionContext) {

			const activeFolder = vscode.workspace.workspaceFolders?.[0]
			if (!activeFolder) {
				return
			}
			const pngPathUri = vscode.Uri.joinPath(activeFolder.uri, 'img.png')
			const pngPath = pngPathUri.fsPath
			const pngPathUriString = pngPathUri.toString()

			const snippetCompletion = new vscode.CompletionItem('Good part of the day');
			snippetCompletion.insertText = new vscode.SnippetString('Good ${1|morning,afternoon,evening|}. It is ${1}, right?');
			const md = new vscode.MarkdownString(`1 <img src="${pngPathUriString}"> 2 <img src="${pngPath}"> 3 ![a](${pngPathUriString}) 4 ![a](${pngPath})`);
			md.supportHtml = true
			snippetCompletion.documentation = md

			// return all completion items as array
			return [
				snippetCompletion
			];
		}
	});
	context.subscriptions.push(provider1);
}
