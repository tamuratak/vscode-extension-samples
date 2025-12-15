import * as vscode from 'vscode';

export function registerChatLibChatParticipant(context: vscode.ExtensionContext) {
	const handler: vscode.ChatRequestHandler = async (
		request: vscode.ChatRequest,
		_: vscode.ChatContext,
		stream: vscode.ChatResponseStream,
		token: vscode.CancellationToken
	) => {
		await vscode.lm.invokeTool('chat-tools-sample_tabCount', { toolInvocationToken: request.toolInvocationToken, input: { tabGroup: "const a = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10;" } }, token)
		stream.markdown(new vscode.MarkdownString(`done!
~~~ts
${'const a = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 + 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10;\n'.repeat(1000)}
~~~
`));
	};

	const chatLibParticipant = vscode.chat.createChatParticipant('chat-tools-sample.catTools', handler);
	chatLibParticipant.iconPath = vscode.Uri.joinPath(context.extensionUri, 'cat.jpeg');
	context.subscriptions.push(chatLibParticipant);
}