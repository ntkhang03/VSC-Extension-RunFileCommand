const vscode = require("vscode");
const path = require("path");
const { exec } = require("child_process");

function activate(context) {
  let disposableRun = vscode.commands.registerCommand(
    "run-file-command.runFileCommand",
    (uri) => {
      if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage("No file selected.");
        return;
      }
      runCommand(uri.fsPath, false);
    }
  );

  let disposableRunAdmin = vscode.commands.registerCommand(
    "run-file-command.runFileCommandAdmin",
    (uri) => {
      if (!uri || !uri.fsPath) {
        vscode.window.showErrorMessage("No file selected.");
        return;
      }
      runCommand(uri.fsPath, true);
    }
  );

  context.subscriptions.push(disposableRun);
  context.subscriptions.push(disposableRunAdmin);
}

function runCommand(filePath, asAdmin) {
  const ext = path.extname(filePath).toLowerCase();
  let command = "";

  if (process.platform === "win32") {
    if (ext === ".bat") {
      command = !asAdmin
        ? `start cmd.exe /K "${filePath}"`
        : `powershell.exe -NoExit -Command "Start-Process cmd -ArgumentList '/c "${filePath}"' -Verb RunAs"`;
    } else if (ext === ".cmd") {
      command = !asAdmin
        ? `start cmd.exe /K "${filePath}"`
        : `powershell.exe -NoExit -Command "Start-Process cmd -ArgumentList '/c "${filePath}"' -Verb RunAs"`;
    } else if (ext === ".ps1") {
      command = !asAdmin
        ? `start powershell.exe -NoExit -File "${filePath}"`
        : `powershell.exe -NoExit -Command "Start-Process powershell -ArgumentList '-NoExit -File "${filePath}"' -Verb RunAs"`;
    } else if (ext === ".exe") {
      command = !asAdmin
        ? `"${filePath}"`
        : `powershell.exe -Command "Start-Process -FilePath '${filePath}' -Verb RunAs"`;
    } else if (ext === ".py") {
      command = !asAdmin
        ? `start cmd.exe /K "python "${filePath}""`
        : `powershell.exe -NoExit -Command "Start-Process cmd -ArgumentList '/c python "${filePath}"' -Verb RunAs"`;
    } else if (ext === ".js") {
      command = !asAdmin
        ? `start cmd.exe /K "node "${filePath}""`
        : `powershell.exe -NoExit -Command "Start-Process cmd -ArgumentList '/c node "${filePath}"' -Verb RunAs"`;
    }
  } else if (process.platform === "linux" || process.platform === "darwin") {
    if (ext === ".sh") {
      command = !asAdmin ? `sh "${filePath}"` : `sudo sh "${filePath}"`;
    } else if (ext === ".py") {
      command = !asAdmin
        ? `python3 "${filePath}"`
        : `sudo python3 "${filePath}"`;
    } else if (ext === ".js") {
      command = !asAdmin ? `node "${filePath}"` : `sudo node "${filePath}"`;
    } else if (!ext) {
      // Kiểm tra file thực thi không có phần mở rộng trên Linux/macOS
      command = !asAdmin ? `"${filePath}"` : `sudo "${filePath}"`;
    }
  }

  if (command) {
    // notiprocess
    vscode.window.showInformationMessage("Running file...");
    exec(command);
  } else {
    // try run  in linux -> mac -> windows
    exec(
      !asAdmin
        ? `gnome-terminal -- bash -c "${filePath}"`
        : `sudo gnome-terminal -- bash -c "${filePath}"`,
      (error, stdout, stderr) => {
        if (error) {
          exec(
            !asAdmin
              ? `xterm -e bash -c "${filePath}"`
              : `sudo xterm -e bash -c "${filePath}"`,
            (error, stdout, stderr) => {
              if (error) {
                exec(
                  !asAdmin
                    ? `osascript -e 'tell app "Terminal" to do script "${filePath}"'`
                    : `osascript -e 'do shell script "${filePath}" with administrator privileges'`,
                  (error, stdout, stderr) => {
                    if (error) {
                      exec(
                        !asAdmin
                          ? `start cmd.exe /K "${filePath}"`
                          : `powershell.exe -NoExit -Command "Start-Process cmd -ArgumentList '/c "${filePath}"' -Verb RunAs"`,
                        (error, stdout, stderr) => {
                          if (error) {
                            vscode.window.showErrorMessage(
                              "Unsupported file type or OS."
                            );
                          }
                        }
                      );
                    }
                  }
                );
              }
            }
          );
        }
      }
    );
  }
}

function deactivate() {}

module.exports = { activate, deactivate };
