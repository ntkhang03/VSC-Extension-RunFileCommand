# Run File Command

<div align="center">
  <img src="images/icon.png" width="128" height="128" alt="Run File Command Icon">
  <h2>Run File Command</h2>
  <p>Execute script files directly from VS Code context menu</p>
</div>

## Features

Run File Command is a Visual Studio Code extension that allows you to execute different types of script files directly from the explorer context menu.

- Run script files with a single click
- Option to run scripts with administrator privileges
- Support for multiple file types and operating systems
- Simple and intuitive context menu integration

## Supported File Types

### Windows

- `.bat` & `.cmd` - Batch files
- `.ps1` - PowerShell scripts
- `.exe` - Executable files
- `.py` - Python scripts
- `.js` - JavaScript files

### Linux/macOS

- `.sh` - Shell scripts
- `.py` - Python scripts
- `.js` - JavaScript files
- Executable files without extension

## Installation

1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search for "Run File Command"
4. Click Install
5. Reload VS Code when prompted

Alternatively, you can download the `.vsix` file and install it manually through the "Install from VSIX..." command in VS Code.

## Usage

1. Right-click on any supported file in the Explorer view
2. Select one of these options from the context menu:
   - "Run this file command" - Execute the file normally
   - "Run as administrator" - Execute the file with elevated privileges

## Requirements

- Visual Studio Code 1.70.0 or newer

## Extension Settings

This extension doesn't add any configurable settings yet.

## Known Issues

- On macOS, administrator privileges might require additional permission dialogs

## Release Notes

### 1.0.0

- Initial release
- Support for Windows, Linux and macOS
- Support for batch, PowerShell, shell scripts, executable files, Python and JavaScript files

## License

This extension is licensed under the [included license](LICENSE).

---

**Made by [ntkhang03](https://github.com/ntkhang03)**

If you find this extension useful, consider [starring the repository](https://github.com/ntkhang03/run-file-command)!
