const API_URL = "/api/posts";


// ========================================
// CURRENT PAGE
// ========================================

let currentPage = 0;

let currentData = null;


// ========================================
// LOAD POSTS
// ========================================

async function loadPosts(page = 0) {

    currentPage = page;


    const author =
        document.getElementById("author").value.trim();

    const title =
        document.getElementById("title").value.trim();

    const sortBy =
        document.getElementById("sortBy").value;

    const direction =
        document.getElementById("direction").value;

    const size =
        document.getElementById("size").value;


    // Create URL parameters

    const params = new URLSearchParams();

    params.append("page", page);

    params.append("size", size);

    params.append("sortBy", sortBy);

    params.append("direction", direction);


    if (author !== "") {

        params.append("author", author);

    }


    if (title !== "") {

        params.append("title", title);

    }


    const requestUrl =
        `${API_URL}?${params.toString()}`;


    // Display current API request

    document.getElementById("apiUrl").textContent =
        requestUrl;


    // Show loading

    document.getElementById("postsTable").innerHTML = `
        <tr>
            <td colspan="4" class="loading">
                Loading posts...
            </td>
        </tr>
    `;


    try {

        const response =
            await fetch(requestUrl);


        if (!response.ok) {

            throw new Error(
                `HTTP Error: ${response.status}`
            );

        }


        const data =
            await response.json();


        currentData = data;


        displayPosts(data);

        displayPagination(data);

        displayPageInformation(data);


    } catch (error) {

        console.error(error);


        document.getElementById("postsTable").innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    Unable to load posts.
                    <br>
                    Make sure the Spring Boot server is running.
                </td>
            </tr>
        `;

    }

}


// ========================================
// DISPLAY POSTS
// ========================================

function displayPosts(data) {

    const table =
        document.getElementById("postsTable");


    table.innerHTML = "";


    if (!data.content || data.content.length === 0) {

        table.innerHTML = `
            <tr>
                <td colspan="4" class="empty">
                    No posts found.
                </td>
            </tr>
        `;

        document.getElementById("resultInfo").textContent =
            "No posts found.";

        return;
    }


    data.content.forEach(post => {

        const row =
            document.createElement("tr");


        row.innerHTML = `

            <td>
                ${escapeHtml(post.id)}
            </td>

            <td>
                ${escapeHtml(post.title)}
            </td>

            <td>
                ${escapeHtml(post.content)}
            </td>

            <td>
                ${escapeHtml(post.author)}
            </td>

        `;


        table.appendChild(row);

    });


    document.getElementById("resultInfo").textContent =
        `Showing ${data.numberOfElements} posts on this page`;

}


// ========================================
// PAGINATION
// ========================================

function displayPagination(data) {

    const pageNumbers =
        document.getElementById("pageNumbers");


    pageNumbers.innerHTML = "";


    // Previous button

    document.getElementById("previousButton").disabled =
        data.first;


    // Page numbers

    for (
        let i = 0;
        i < data.totalPages;
        i++
    ) {

        const button =
            document.createElement("button");


        button.className =
            "page-number";


        button.textContent =
            i + 1;


        if (i === data.number) {

            button.classList.add("active");

        }


        button.onclick = function() {

            loadPosts(i);

        };


        pageNumbers.appendChild(button);

    }


    // Next button

    document.getElementById("nextButton").disabled =
        data.last;

}


// ========================================
// PREVIOUS PAGE
// ========================================

function previousPage() {

    if (
        currentData &&
        !currentData.first
    ) {

        loadPosts(
            currentData.number - 1
        );

    }

}


// ========================================
// NEXT PAGE
// ========================================

function nextPage() {

    if (
        currentData &&
        !currentData.last
    ) {

        loadPosts(
            currentData.number + 1
        );

    }

}


// ========================================
// PAGE INFORMATION
// ========================================

function displayPageInformation(data) {

    const pageInfo =
        document.getElementById("pageInfo");


    const currentPageNumber =
        data.number + 1;


    pageInfo.textContent =
        `Page ${currentPageNumber} of ${data.totalPages}
         | Total posts: ${data.totalElements}
         | Page size: ${data.size}`;

}


// ========================================
// ESCAPE HTML
// ========================================

function escapeHtml(value) {

    if (value === null || value === undefined) {

        return "";

    }


    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ========================================
// LOAD DATA WHEN PAGE OPENS
// ========================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadPosts(0);

    }
);