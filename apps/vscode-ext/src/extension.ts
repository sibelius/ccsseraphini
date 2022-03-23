// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';

export function activate(context: vscode.ExtensionContext) {
  const sidebarProvider = new SidebarProvider(context.extensionUri);

  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'ccsseraphini-sidebar',
      sidebarProvider,
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('ccsseraphini.ccsseraphini', async () => {
      await vscode.commands.executeCommand(
        'workbench.view.extension.ccsseraphini-view',
      );
    }),
  );

  /**
   * Uncomment the code above, if u want a fast refresh while coding. Just for dev enviroment
   * Also edit package.json add new command to this
   * @example 
   *  "onCommand:ccsseraphini.refresh",
   * 
   * and
   *
   *  {
        "command": "ccsseraphini.refresh",
        "category": "cc @sseraphini",
        "title": "Refresh"
      }
   * */
  // context.subscriptions.push(
  //   vscode.commands.registerCommand("ccsseraphini.refresh", async () => {
  //     await vscode.commands.executeCommand("workbench.action.closeSidebar");
  //     await vscode.commands.executeCommand(
  //       "workbench.view.extension.ccsseraphini-view"
  //     );
  //   })
  // );
}

// this method is called when your extension is deactivated
export function deactivate() {}
