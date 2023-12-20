// document.addEventListener('DOMContentLoaded', function () {
//   const searchForm = document.getElementById('searchForm');
//   console.log("test2");
//   console.log(searchForm);
//   searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();
//     const searchQuery = this.querySelector('input[name="q"]').value;
//     alert(`You submitted the query: ${searchQuery}`);
//   });
// });

// document.addEventListener('DOMContentLoaded', function () {
//   const searchForm = document.getElementById('searchForm');

//   searchForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Retrieve the value entered in the search input field
//     const searchQuery = this.querySelector('input[name="q"]').value;

//     // Encode the search query for the URL
//     const encodedSearchQuery = encodeURIComponent(searchQuery);

//     // Construct the Google search URL
//     const googleSearchURL = `https://www.google.com/search?q=${encodedSearchQuery}`;

//     // Open a new tab with the Google search results
//     chrome.tabs.create({ url: googleSearchURL });
//   });
// });

document.addEventListener('DOMContentLoaded', function () {
  const searchForm = document.getElementById('searchForm');
  const postBox = document.querySelector('.post-box');
  const tags = ['Tin xác thực', 'Tin giả', 'Không xác định'];

  // Function to hide the post-box
  function hidePostBox() {
    postBox.style.display = 'none';
  }

  // Function to show the post-box
  function showPostBox() {
    postBox.style.display = 'flex';
  }

  searchForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Retrieve the value entered in the search input field
    const searchQuery = this.querySelector('input[name="q"]').value;
    const encodedSearchQuery = encodeURIComponent(searchQuery);

    // Generate a random tag from the 'tags' array
    const Tagcontent = tags[Math.floor(Math.random() * tags.length)];
    let Tag;
    if (Tagcontent == 'Tin xác thực') {
      Tag = 'support-tag';
    } else if (Tagcontent == 'Tin giả') {
        Tag = 'refuse-tag';
    } else if (Tagcontent == 'Không xác định') {
        Tag = 'neutral-tag';
    }

    // Display the random tag in the post-box div
    postBox.innerHTML = `
        <div class="claim">
        <h1>Nhận định:</h1>
        <div class="content">
          ${searchQuery}
        </div>
      </div>
      <div class="claim">
        <h1>Minh chứng:</h1>
        <div class="content">
          Mô hình đơn giản của chúng tôi cho thấy hiệu quả khiêm tốn của khẩu trang 
          có thể ngăn chặn tỷ lệ tử vong đáng kể trong tình huống này. Điều quan 
          trọng là, tác động đến tỷ lệ tử vong trở nên quá nhạy cảm với việc đeo 
          khẩu trang khi hiệu quả R tiến tới 1, tức là gần điểm bùng phát khi quỹ
          đạo lây nhiễm dự kiến sẽ quay trở lại mức tăng trưởng theo cấp số nhân,
            như dự kiến sau khi phong tỏa hiệu quả.
        </div>
      </div>
      <div class="evaluate">
        <h1>Đánh giá:</h1>
        <div class="${Tag}">
          <h3>${Tagcontent}</h3>
        </div>
      </div>
    `;

    // Show the post-box div
    showPostBox();
  });

  // Hide the post-box initially
  hidePostBox();
});



