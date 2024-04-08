# locopilot README

An open source locally running copilot to use LLM coding assistants running on your own machine for free. Powered by node-llama-cpp which is powered by llama.cpp.
Any model in GGUF format is supported although you'll need to RAM to load it. Inference is currently all done on the CPU.

## Setup
To use this extension you must download a GGUF file containing a language model that you want to use for generation and to chat with your code. As a default model I'd recommend
Code Llama 7B quantized to 4 bits available as codellama-2-7b.Q4_K_M.gguf <a href="https://huggingface.co/TheBloke/CodeLlama-7B-GGUF">here</a>
(you can click the download button from the "Files and Versions" tab). This model should run only require 6.58GB of RAM and work on computers with 8GB of RAM or more.
If you have a bit more RAM to spare try upgrading to Code Llama 13B quantized to 4 bits available as codellama-13b.Q4_K_M.gguf
<a href="https://huggingface.co/TheBloke/CodeLlama-13B-GGUF">here</a>. This model will require 10.37 GB of RAM and accordingly should work on computers with 12GB of RAM
or more available. For these models make sure the setting locopilot.promptFormat is set to Llama.

CODE INFILLING (THE GENERATE COMMAND) WILL ONLY WORK WITH THE CODELLAMA 7B and 13B MODELS. Accordingly for code infilling locopilot.promptFormat must be set to "Llama"
and the model path must have either 7B or 13B in it. 

If you'd like to use a different model like Mistral-7B simply download the
GGUF file which can usually be found on HuggingFace from the user TheBloke. Then set the setting locopilot.modelPath to the location where you saved the GGUF file and set
the setting locopilot.promptFormat to the format expected by the model (this information should be on the page where you downloaded the model). Most commonly the chat format
will be ChatML, with the Llama models having their own. If the model you want to use doesn't use one of the supported prompt formats (Llama, ChatML, Falcon, or None) then you can define a custom prompt format by setting locopilot.promptFormat to "Custom" and defining locopilot.preSystemPromptToken, 
locopilot.postSystemPromptToken, locopilot.preSpeakerToken, and locopilot.postSpeakerToken. 

This is the README for your extension "locopilot". After writing up a brief description, we recommend including the following sections.

## Features

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: Enable/disable this extension.
* `myExtension.thing`: Set to `blah` to do something.

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

---

## Working with Markdown

You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets

## For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
