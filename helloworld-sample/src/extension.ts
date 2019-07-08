import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const rootUrl = vscode.Uri.file(context.extensionPath)
  const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
    if (!vscode.window.activeTextEditor) {
      return;
    }
    
    const panel = vscode.window.createWebviewPanel(
      'catCoding',
      'Cat Coding',
      { preserveFocus: true, viewColumn: vscode.ViewColumn.Beside },
      { enableScripts: true }
    );
    panel.webview.html = getHtml();
  });
  context.subscriptions.push(disposable);
}

function getHtml() {
	return `
<!DOCTYPE html><html><head></head>
<body>
<script>
window.onfocus = function() {
	console.log('window focused!');
}
window.addEventListener('keydown', function(evt) {
	if(evt.keyCode == 70 && evt.target.nodeName != 'INPUT') {
	  console.log('keyboard F typed!')
	}
  })
</script>
`
}


// this method is called when your extension is deactivated
export function deactivate() {}