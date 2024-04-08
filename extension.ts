// The module 'vscode' contains the VS Code extensibility API

// import { ChatMLChatPromptWrapper, EmptyChatPromptWrapper, FalconChatPromptWrapper, LlamaChatPromptWrapper } from 'node-llama-cpp';

// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "locopilot" is now active!');

	import("node-llama-cpp").then(nodeLlama => {
		const model = new nodeLlama.LlamaModel(vscode.workspace.getConfiguration('locopilot').get('settings.modelPath'));

		let disposable1 = vscode.commands.registerCommand('locopilot.generate', async function() {
			const editor = vscode.window.activeTextEditor;
			if (vscode.workspace.getConfiguration('locopilot').get<string>('promptFormat').toLowerCase() != "llama"
			|| !vscode.workspace.getConfiguration('locopilot').get<string>('modelPath').toLowerCase().includes('7b')
			|| !vscode.workspace.getConfiguration('locopilot').get<string>('modelPath').toLowerCase().includes('13b')) {
				return "";
			}
			if (editor) {
				const document = editor.document;
				const documentText = document.getText();
				const cursorPosition = editor.selection.active;
				let documentTextWithCursorToken = documentText.slice(0, document.offsetAt(cursorPosition))
					+ "<FILL_ME>" + documentText.slice(document.offsetAt(cursorPosition));
				let promptWrapper = new nodeLlama.EmptyChatPromptWrapper();
				const llamaContext = new nodeLlama.LlamaContext({ model });
				const session = new nodeLlama.LlamaChatSession({context: llamaContext, promptWrapper: promptWrapper});
				const generation = await session.prompt(documentTextWithCursorToken);
			}
		});
	
		let disposable2 = vscode.commands.registerCommand('locopilot.chat', async function() {
			const editor = vscode.window.activeTextEditor;
			let promptWrapper;
			const promptFormat = vscode.workspace.getConfiguration('locopilot').get<string>('settings.promptFormat').toLowerCase()
			if (promptFormat == 'llama') {
				promptWrapper = new nodeLlama.LlamaChatPromptWrapper();
			} else if (promptFormat == 'chatml') {
				promptWrapper = new nodeLlama.ChatMLChatPromptWrapper();
			} else if (promptFormat == 'falcon') {
				promptWrapper = new nodeLlama.FalconChatPromptWrapper();
			} else if (promptFormat == 'none') {
				promptWrapper = new nodeLlama.EmptyChatPromptWrapper();
			} else if (promptFormat == 'custom') {
				promptWrapper = new nodeLlama.GeneralChatPromptWrapper();
			} else { // invalid promptFormat

			}
			const llamaContext = new nodeLlama.LlamaContext({model});
			const session = new nodeLlama.LlamaChatSession({context: llamaContext, promptWrapper: promptWrapper});
			// Loop while the user keeps chatting to the model, prepending the preivous conversational context as we go
		});

		context.subscriptions.push(disposable1, disposable2);
		
	})



	// The command has been defined in the package.json file
	// Now provide the implementation of the command with  registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('locopilot.helloWorld', function () {
		// The code you place here will be executed every time your command is executed

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Locopilot!');
	});

	context.subscriptions.push(disposable);
}

class LocopilotViewProvider implements vscode.WebviewViewProvider {
	private _view?: vscode.WebviewView;
	public resolveWebviewView(
		webviewView: vscode.WebviewView,
		context: vscode.WebviewViewResolveContext<unknown>,
		token: vscode.CancellationToken
	) {
		this._view = webviewView;
		webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);	
	}

	private _getHtmlForWebview(webview: vscode.Webview) {
		return `<!DOCTYPE html>
		<html lang=en>
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Locopilot</title>
		</head>
		<body>
			<input type="text" placeholder="Enter your question"/>
		</body>
		`
	}
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
