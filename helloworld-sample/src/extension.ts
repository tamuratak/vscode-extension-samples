import * as vscode from 'vscode';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    const rootUrl = vscode.Uri.file(context.extensionPath)
    const disposable = vscode.commands.registerCommand('extension.helloWorld', async (args, brgs, crgs) => {
        if (!vscode.window.activeTextEditor) {
            return;
        }

        const inset = vscode.window.createWebviewTextEditorInset(
            vscode.window.activeTextEditor,
            vscode.window.activeTextEditor.selection.with({ end: vscode.window.activeTextEditor.selection.end.translate(30) }),
            { enableScripts: true,
                localResourceRoots: [
                    rootUrl.with({path: path.join(rootUrl.path, '/node_modules/pdfjs-dist/build')}),
                    rootUrl,
                ]
            }
            );
        inset.onDidDispose(() => {
            console.log('WEBVIEW disposed...');
        });
        inset.webview.html = getHtml(rootUrl);
    });
	context.subscriptions.push(disposable);
}

function getHtml(rootUrl: vscode.Uri) {
    const pdfjs = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './node_modules/pdfjs-dist/build/pdf.js') })
    const worker = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './node_modules/pdfjs-dist/build/pdf.worker.js') })
    const pdffile = rootUrl.with( { scheme: 'vscode-resource', path: path.join(rootUrl.path, './helloworld.pdf') })
    console.log(pdfjs.toString())
    console.log(worker.toString())
    console.log(pdffile.toString())
    return `<script src="https://mozilla.github.io/pdf.js/build/pdf.js"></script>
    <script>
    // If absolute URL from the remote server is provided, configure the CORS
    // header on that server.
    var url = 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf';
    
    // Loaded via <script> tag, create shortcut to access PDF.js exports.
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    
    // The workerSrc property shall be specified.
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://mozilla.github.io/pdf.js/build/pdf.worker.js';
    
    // Asynchronous download of PDF
    var loadingTask = pdfjsLib.getDocument(url);
    loadingTask.promise.then(function(pdf) {
      console.log('PDF loaded');
      
      // Fetch the first page
      var pageNumber = 1;
      pdf.getPage(pageNumber).then(function(page) {
        console.log('Page loaded');
        
        var scale = 2;
        var viewport = page.getViewport(scale);
    
        // Prepare canvas using PDF page dimensions
        var canvas = document.getElementById('the-canvas');
        var context = canvas.getContext('2d');
        context.scale(0.5, 0.5);
        canvas.height = viewport.height;
        canvas.width = viewport.width;
//        canvas.style.height = viewport.height / 1.2 + 'px';
//        canvas.style.width = viewport.width / 1.2 + 'px';
    
        // Render PDF page into canvas context
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
        renderTask.promise.then(function () {
          console.log('Page rendered');
        });
      });
    }, function (reason) {
      // PDF loading error
      console.error(reason);
    });
    </script>
    
    <h1>PDF.js 'Hello, world!' example</h1>
    
    <canvas id="the-canvas"></canvas>`
}


// this method is called when your extension is deactivated
export function deactivate() {}
