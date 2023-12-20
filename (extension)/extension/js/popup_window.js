// popup_window.js

document.addEventListener('DOMContentLoaded', function () {
  // const searchForm = document.getElementById('searchForm');
  const postBox = document.querySelector('.post-box');

  // Function to show the post-box
  function showPostBox() {
    postBox.style.display = 'flex';
  }
  
  // Generate a random tag from the 'tags' array
  // const tags = ['Tin xác thực', 'Tin giả', 'Không xác định'];
  // const Tagcontent = tags[Math.floor(Math.random() * tags.length)];
  // let Tag;
  // if (Tagcontent == 'Tin xác thực') {
  //   Tag = 'support-tag';
  // } else if (Tagcontent == 'Tin giả') {
  //     Tag = 'refuse-tag';
  // } else if (Tagcontent == 'Không xác định') {
  //     Tag = 'neutral-tag';
  // }

  // // Display the random tag in the post-box div
  // postBox.innerHTML = `
  //   <div class="claim">
  //       <h1>Nhận định:</h1>
  //       <div class="content">
  //           <div id="highlightedText"></div>
  //       </div>
  //   </div>
  //   <div class="claim">
  //       <h1>Minh chứng:</h1>
  //       <div class="content">
  //         <div id="ResultText">
          
  //         </div>
  //       </div>
  //   </div>
  //   <div class="evaluate">
  //     <h1>Đánh giá:</h1>
  //     <div class="${Tag}">
  //       <h3>${Tagcontent}</h3>
  //     </div>
  //   </div>
  // `;
  chrome.runtime.sendMessage({ getHighlightedText: true }, function (response) {
    const highlightedText = response.highlightedText;

    getResult(highlightedText).then(function(data) {
      // Log the data from the API
      console.log('Data from API:', data);

      let Tagcontent;
      let Tag;
      if (data.label_code == '1') {
        Tagcontent = 'Tin xác thực';
        Tag = 'support-tag';
      } else if (data.label_code == '0') {
          Tagcontent = 'Tin giả'
          Tag = 'refuse-tag';
      } else if (data.label_code == '2') {
          Tagcontent = 'Không xác định'
          Tag = 'neutral-tag';
      }
      // Display the random tag in the post-box div
      postBox.innerHTML = `
        <div class="claim">
            <h1>Nhận định:</h1>
            <div class="content">
                <div id="highlightedText"></div>
            </div>
        </div>
        <div class="claim">
            <h1>Minh chứng:</h1>
            <div class="content">
              <div id="ResultText">
                ${data.evidence}
              </div>
            </div>
        </div>
        <div class="evaluate">
          <h1>Đánh giá:</h1>
          <div class="${Tag}">
            <h3>${Tagcontent}</h3>
          </div>
        </div>
      `;
      // Display the highlighted text in the popup window
      const highlightedTextElement = document.getElementById('highlightedText');
      highlightedTextElement.textContent = highlightedText;
    });
  });

  showPostBox();

});


// content script or popup script
// popup_window.js

document.addEventListener('DOMContentLoaded', function () {
  // Get the highlighted text from the background script
  chrome.runtime.sendMessage({ getHighlightedText: true }, function (response) {
    const highlightedText = response.highlightedText;

    // Display the highlighted text in the popup window
    const highlightedTextElement = document.getElementById('highlightedText');
    highlightedTextElement.textContent = highlightedText;

    // Display a loading message
    // const ResultText = document.getElementById('ResultText');
    // ResultText.textContent = 'Loading...';

  });
});

async function getResult(claim) {
  const res = await fetch('http://127.0.0.1:8000/claim',
    {
      method: "POST",
      // mode: 'no-cors',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        claim: claim
      })
    });
  
  const data = await res.json();
  return data;
}
