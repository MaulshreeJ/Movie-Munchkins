const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

// Function to fetch movies from the API
async function getMovies(url) {
    try {
        const resp = await fetch(url);
        const respData = await resp.json();
        showMovies(respData.results);
    } catch (error) {
        console.error("Error fetching movies:", error);
    }
}

// Function to display movies on the page
function showMovies(movies) {
    main.innerHTML = "";
    movies.forEach((movie) => {
        const { poster_path, title, vote_average, overview, id } = movie;
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie');
        movieContainer.id = `movie-${id}`;
        const img = document.createElement('img');
        img.src = IMGPATH + poster_path;
        img.alt = title;
        const movieInfo = document.createElement('div');
        movieInfo.classList.add('movie-info');
        const h3 = document.createElement('h3');
        h3.textContent = title;
        const ratingSpan = document.createElement('span');
        ratingSpan.classList.add('rating');
        ratingSpan.classList.add(getClassByRate(vote_average));
        ratingSpan.textContent = vote_average;
        const overviewButton = document.createElement('button');
        overviewButton.textContent = 'Overview';
        overviewButton.style.backgroundColor = 'rgb(194, 190, 190)'; 
        overviewButton.onclick = () => showOverview(overview);
        const reviewButton = document.createElement('button');
        reviewButton.textContent = 'Add Review';
        reviewButton.style.backgroundColor = 'rgb(194, 190, 190)'; 
        reviewButton.onclick = () => showReviewModal(id);
        const br = document.createElement('br');
        movieInfo.appendChild(h3);
        movieInfo.appendChild(ratingSpan);
        movieInfo.appendChild(br);
        movieInfo.appendChild(overviewButton);
        movieInfo.appendChild(reviewButton);
        movieContainer.appendChild(img);
        movieContainer.appendChild(movieInfo);
        main.appendChild(movieContainer);
    });
}

// Function to get appropriate CSS class based on rating
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red';
    }
}

// Function to show overview of a movie
// function showOverview(overview) {
//     // alert(overview);
    
// }
function showOverview(overview) {
    // Create a modal to display the overview
    const modal = document.createElement('div');
    modal.classList.add('modal');
    // modal.style.backgroundColor = 'grey';
    
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modalContent.style.backgroundColor='grey';
    
    
    // Create close button for the modal
    const closeBtn = document.createElement('span');
    closeBtn.classList.add('close');
    closeBtn.innerHTML = '&times;';
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    };
    
    // Create heading for the modal
    const heading = document.createElement('h2');
    heading.textContent = 'Movie Overview';
    
    // Create paragraph for the overview text
    const overviewPara = document.createElement('p');
    overviewPara.textContent = overview;
    
    // Append elements to modal content
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(heading);
    modalContent.appendChild(overviewPara);
    
    // Append modal content to modal
    modal.appendChild(modalContent);
    
    // Add modal to the document body
    document.body.appendChild(modal);
    
    // Display the modal
    modal.style.display = 'block';
}



function showReviewModal(movieId) {
    // Create modal elements
    var modal = document.createElement("div");
    modal.className = "modal";
    modal.id = "reviewModal";

    var modalContent = document.createElement("div");
    modalContent.className = "modal-content";

    var closeBtn = document.createElement("span");
    closeBtn.className = "close";
    closeBtn.innerHTML = "&times;";
    closeBtn.onclick = function() {
        modal.style.display = "none";
    };

    var h2 = document.createElement("h2");
    h2.textContent = "Add Review";

    var hiddenInput = document.createElement("input");
    hiddenInput.type = "hidden";
    hiddenInput.id = "movieId";
    hiddenInput.value = movieId;

    var reviewLabel = document.createElement("label");
    reviewLabel.textContent = "Enter Review:   ";
    var reviewInput = document.createElement("textarea");
    reviewInput.id = "reviewInput";
    reviewInput.rows = "4";
    reviewInput.cols = "50";

    var ratingLabel = document.createElement("label");
    ratingLabel.textContent = "Enter Rating:   ";
    var ratingInput = document.createElement("input");
    ratingInput.type = "number";
    ratingInput.id = "ratingInput";
    ratingInput.min = "1";
    ratingInput.max = "10";

    var submitBtn = document.createElement("button");
    submitBtn.textContent = "Submit Review";
    submitBtn.onclick = submitReviewForm;

    // Append elements to modal content
    modalContent.appendChild(closeBtn);
    modalContent.appendChild(h2);
    modalContent.appendChild(hiddenInput);
    modalContent.appendChild(reviewLabel);
    modalContent.appendChild(reviewInput);
    modalContent.appendChild(ratingLabel);
    modalContent.appendChild(ratingInput);
    modalContent.appendChild(submitBtn);

    // Append modal content to modal
    modal.appendChild(modalContent);

    // Add modal to the document body
    document.body.appendChild(modal);

    // Apply styles to modal
    modal.style.display = "flex";
    modal.style.position = "fixed";
    modal.style.zIndex = "1000";
    modal.style.left = "0";
    modal.style.top = "0";
    modal.style.width = "100%";
    modal.style.height = "100vh";
    modal.style.overflow = "auto";
    modal.style.backgroundColor = "rgba(0,0,0,0.4)";
    modal.style.paddingTop = "60px"; // Adjust as needed
    modalContent.style.backgroundColor = "grey";
    modalContent.style.margin = "auto";
    modalContent.style.padding = "20px";
    modalContent.style.border = "1px solid #888";
    modalContent.style.width = "80%";
    closeBtn.style.color = "#aaa";
    closeBtn.style.float = "right";
    closeBtn.style.fontSize = "28px";
    closeBtn.style.fontWeight = "bold";
    closeBtn.style.cursor = "pointer";
    // Add more styles as needed
}

// Function to submit review form

function submitReviewForm() {
    // Your review submission logic goes here
    var movieId = document.getElementById("movieId").value;
  var review = document.getElementById("reviewInput").value;
  var rating = document.getElementById("ratingInput").value;

  // Perform validation and submit review
  if (!review || !rating) {
      alert("Please enter both a review and a rating.");
      return;
  }
  // Perform submission logic

  // Close the modal
  var modal = document.getElementById("reviewModal");
  modal.style.display = "none";

  // Redirect to index.html
  // window.location.href = "index.html";
}

// Event listener for form submission
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const searchTerm = search.value;
    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = "";
    }
});

// Initial call to fetch movies
getMovies(APIURL);
