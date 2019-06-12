import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }

        const inset = vscode.window.createWebviewTextEditorInset(
            vscode.window.activeTextEditor,
            vscode.window.activeTextEditor.selection.with({ end: vscode.window.activeTextEditor.selection.end.translate(30) }),
            { enableScripts: true }
            );
        inset.onDidDispose(() => {
            console.log('WEBVIEW disposed...');
        });
        inset.webview.html = getHtml();
    });
	context.subscriptions.push(disposable);
}

function getHtml() {
    return `
    <canvas id="the-canvas"></canvas>
    <script>
        const canvas = document.getElementById('the-canvas');
        const context = canvas.getContext('2d');
        context.font = '48px sans-serif ';
        context.lineWidth = 5;
        context.strokeRect(10, 10, 110, 110);
    </script>`
}


// this method is called when your extension is deactivated
export function deactivate() {}
