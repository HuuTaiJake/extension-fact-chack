# Extension-fact-check

+ Go to Settings > More tools > Extensions (chrome://extensions) to open the page to manage installed extensions.

+ Turn on Developer mode (in the upper right corner) to install the extension directly into Chrome.

+ Click the "Load Unpacked" button and load the project (extension)/extension.

+ Active the loaded extension

+ Change the extension info in manijest.json file

## Test the extension

+ Highlight any text you want to check, right-click and check the context menu if there is item with "Kiểm tin cho ..."

+ Click the item and the window of url is open

The URL of the window now is http://localhost:3000/extension-fc/ + the modified Highlighted text (The url can be modified in the file ../js/background.js)
