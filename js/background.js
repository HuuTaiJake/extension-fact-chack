// background.js

let menuExists = false;
let highlightedTextToPopup = null;
let portToPopup;

// Check if the context menu item already exists before creating it

// Listen for messages from other parts of the extension or content scripts
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  // Check if a message is requesting to check the existence of the context menu item
  if (request.checkMenuExists) {
    console.log("Checking menu existence:", menuExists);
    sendResponse({ menuExists: menuExists });
  }

  // Check if a message is requesting highlighted text
  if (request.getHighlightedText) {
    // Retrieve the highlighted text from storage or any other source
    sendResponse({ highlightedText: highlightedTextToPopup });
  }
});


// Check if the context menu item exists
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "showPopup" && info.selectionText) {
    console.log("Context menu item clicked!");
    console.log("Highlighted text:", info.selectionText);

    // // Store the highlighted text in chrome.storage
    // chrome.storage.local.set({ highlightedText: info.selectionText });

    // Store the highlighted text
    highlightedTextToPopup = info.selectionText;

    // Send the highlighted text to the popup script through the established connection
    if (portToPopup) {
      portToPopup.postMessage({ highlightedText: info.selectionText });
    }

    // Send a message to the content script
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {highlightedText: info.selectionText});
    });
  }
});

// Create the context menu item if it doesn't exist
if (!menuExists) {
  chrome.contextMenus.create({
    id: "showPopup",
    title: "Kiểm tin cho \"%s\"",
    contexts: ["selection"]
  });
  menuExists = true; // Set the flag to true after creating the menu
}


// Handle request for highlighted text
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.getHighlightedText) {
    // Retrieve the highlighted text from storage or any other source
    const highlightedText = "This is the highlighted text.";
    sendResponse({ highlightedText: highlightedText });
  }
});

// Handle context menu item click
chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId === "showPopup" && info.selectionText) {
    const modifiedSelectionText = info.selectionText.trim().replace(/\s+/g, '/');
    // Open a new window with the popup.html file
    chrome.windows.create({
      type: 'popup',
      // url: chrome.runtime.getURL('popup_window.html'),
      url: 'http://localhost:3000/extension-fc/' + modifiedSelectionText,
      width: 1200,
      height: 750,
      focused: true
    });
  }
});


// ... (your existing code)
// background.js

console.log("Background script initialized");

