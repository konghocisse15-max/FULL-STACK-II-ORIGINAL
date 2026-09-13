const API_URL = "/api/posts";

const postsContainer = document.getElementById("posts");
const errorContainer = document.getElementById("errorContainer");
const createPostButton = document.getElementById("createPost");
const testErrorButton = document.getElementById("testError");


/* =========================================
   SHOW ERROR RESPONSE
   ========================================= */

function showError(error) {

    errorContainer.style.display = "block";

    errorContainer.innerHTML = `
        <div class="error-title">
            ⚠ Post Not Found
        </div>

        <div class="error-row">
            <span class="error-label">Status</span>
            <span class="error-value">
                ${error.status || 500}
            </span>
        </div>

        <div class="error-row">
            <span class="error-label">Message</span>
            <span class="error-value">
                ${error.message || "An unexpected error occurred"}
            </span>
        </div>

        <div class="error-row">
            <span class="error-label">Request Path</span>
            <span class="error-value">
                ${error.requestPath || "/api/posts/does-not-exist"}
            </span>
        </div>

        <div class="error-row">
            <span class="error-label">Correlation ID</span>
            <span class="error-value error-correlation">
                ${error.correlationId || "N/A"}
            </span>
        </div>

        <div class="error-row">
            <span class="error-label">Timestamp</span>
            <span class="error-value">
                ${error.timestamp || new Date().toISOString()}
            </span>
        </div>
    `;
}


/* =========================================
   HIDE ERROR
   ========================================= */

function hideError() {

    errorContainer.style.display = "none";

    errorContainer.innerHTML = "";
}


/* =========================================
   LOAD ALL POSTS
   ========================================= */

async function loadPosts() {

    try {

        hideError();

        const response = await fetch(API_URL);

        const data = await response.json();

        if (!response.ok) {

            showError(data);

            return;
        }

        displayPosts(data.data);

    } catch (error) {

        console.error("Error loading posts:", error);

    }
}


/* =========================================
   DISPLAY POSTS
   ========================================= */

function displayPosts(posts) {

    postsContainer.innerHTML = "";

    if (!posts || posts.length === 0) {

        postsContainer.innerHTML = `
            <p>No posts available.</p>
        `;

        return;
    }

    posts.forEach(post => {

        const postCard = document.createElement("div");

        postCard.className = "post-card";

        postCard.innerHTML = `
            <h3>${post.title || "My Post"}</h3>

            <p>
                ${post.content || ""}
            </p>

            <p>
                <strong>Author:</strong>
                ${post.author || "KONGHO SEYDOU CISSE"}
            </p>
        `;

        postsContainer.appendChild(postCard);
    });
}


/* =========================================
   TEST INVALID POST
   ========================================= */

testErrorButton.addEventListener("click", async function () {

    try {

        const invalidId = "does-not-exist";

        const response = await fetch(
            `${API_URL}/${invalidId}`
        );

        const data = await response.json();

        if (!response.ok) {

            showError(data);

            return;
        }

        displayPosts([data]);

    } catch (error) {

        console.error(
            "Error testing invalid post:",
            error
        );

    }

});


/* =========================================
   CREATE POST
   ========================================= */

createPostButton.addEventListener(
    "click",
    async function () {

        const content =
            document.getElementById("content").value;

        const published =
            document.getElementById("published").checked;

        const platformCheckboxes =
            document.querySelectorAll(
                'input[type="checkbox"]:checked'
            );

        const platforms = [];

        platformCheckboxes.forEach(
            checkbox => {

                if (checkbox.id !== "published") {

                    platforms.push(
                        checkbox.value
                    );
                }
            }
        );


        const postData = {

            title: "My Post",

            content: content,

            author: "KONGHO SEYDOU CISSE",

            platforms: platforms,

            published: published
        };


        try {

            const response = await fetch(
                API_URL,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(postData)
                }
            );


            const data =
                await response.json();


            if (!response.ok) {

                showError(data);

                return;
            }


            hideError();

            alert(
                "Post created successfully!"
            );

            document.getElementById(
                "content"
            ).value = "";

            loadPosts();


        } catch (error) {

            console.error(
                "Error creating post:",
                error
            );
        }

    }
);


/* =========================================
   LOAD POSTS WHEN PAGE OPENS
   ========================================= */

loadPosts();