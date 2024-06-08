import * as vscode from 'vscode';

const MODEL_SELECTOR: vscode.LanguageModelChatSelector = { vendor: 'copilot', family: 'gpt-3.5-turbo' };
export function activate(context: vscode.ExtensionContext) {
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('extension.helloWorld', async () => {
		const [model] = await vscode.lm.selectChatModels(MODEL_SELECTOR);
		const messages = [
			vscode.LanguageModelChatMessage.User(`User
Completion candidates of the following. Up to three candidates. In JSON format.

{
   "candidates": [{item: <candidate>, reason: <string>}]
}

Display a message box to the user.
If the config is `)
		];
		const chatResponse = await model.sendRequest(messages, { modelOptions: {"type": "json_object"}});
		const result = []
		for await (const fragment of chatResponse.text) {
			result.push(fragment)
		}
		console.log(result.join(''))
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
	});

	context.subscriptions.push(disposable);
}
