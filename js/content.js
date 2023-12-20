
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.highlightedText) {
      // Send the message to your web page
      window.postMessage({highlightedText: request.highlightedText}, "*");
    }
  });