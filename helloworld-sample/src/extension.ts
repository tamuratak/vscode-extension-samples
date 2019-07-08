import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath)
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }

        const panel = vscode.window.createWebviewPanel(
            'catCoding',
            'Cat Coding',
            vscode.ViewColumn.Beside,
            {
				enableScripts: true,
				retainContextWhenHidden: true,
				localResourceRoots: [ rootUrl ]
            }
		);
		const editor = vscode.window.activeTextEditor
		panel.webview.html = getHtml(rootUrl);
		setTimeout(() => vscode.window.showTextDocument(editor.document, editor.viewColumn), 500)
    });
	context.subscriptions.push(disposable);
}

function getHtml(rootUrl: vscode.Uri) {
	const url = rootUrl.with({scheme: 'vscode-resource', path: path.join(rootUrl.path, './t.html')})
	return `
<!DOCTYPE html><html><head></head>
<body><iframe id="preview-panel" class="preview-panel" src="${url}" style="position:absolute; border: none; left: 0; top: 0; width: 100%; height: 100%;">
</iframe>
<script>
let iframe = document.getElementById('preview-panel');
window.onfocus = function() {
	console.log('window focused!');
	setTimeout(function() { // doesn't work immediately
		iframe.contentWindow.focus();
	}, 100);
}
iframe.onload = function() {
	console.log('iframe focused!');
	setTimeout(function() { // doesn't work immediately
		iframe.contentWindow.focus();
	}, 100);
}
</script>
`
}


// this method is called when your extension is deactivated
export function deactivate() {}