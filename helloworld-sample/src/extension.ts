import * as vscode from 'vscode';

const htmlString = `
<script>
// Should work on macOS.
const ev0 = {"altKey":false,"code":"KeyN","ctrlKey":false,"isComposing":false,"key":"n","location":0,"metaKey":true,"repeat":false,"shiftKey":false};
setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', ev0)), 2000);

// Should work on windows.
const ev1 = {"altKey":false,"code":"KeyN","ctrlKey":true,"isComposing":false,"key":"n","location":0,"metaKey":false,"repeat":false,"shiftKey":false};
setTimeout(() => window.dispatchEvent(new KeyboardEvent('keydown', ev1)), 3000);
</script>
`

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	const disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const panel = vscode.window.createWebviewPanel(
			'aaa',
			'Cat Coding',
			vscode.ViewColumn.One,
			{
					enableScripts: true,
			}
		)
		panel.webview.html = htmlString
	})
	context.subscriptions.push(disposable);
}
