// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export class LtInlayHintsProvider implements vscode.InlayHintsProvider {
    private readonly eventEmitter = new vscode.EventEmitter<void>()
    readonly onDidChangeInlayHints: vscode.Event<void>
	private count = 0

    constructor() {
        this.onDidChangeInlayHints = this.eventEmitter.event
        setInterval(() => {
			console.log('firing')
            this.eventEmitter.fire()
        }, 2000)
    }

    async provideInlayHints(document: vscode.TextDocument, range: vscode.Range) {
		if (this.count === 0) {
			this.count++
			console.log('returning empty')
			return []
		} else {
			return [new vscode.InlayHint(new vscode.Position(0, 0), `Hello World (${this.count++})`)]
		}
	}
}

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "helloworld-sample" is now active!');

	vscode.languages.registerInlayHintsProvider({ language: 'typescript' }, new LtInlayHintsProvider())
}
