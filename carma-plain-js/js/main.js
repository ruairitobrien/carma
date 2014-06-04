/* global navigator,alert,userService */

/**
 * Used ot manage the display of api outputs and navigation between result pages.
 */
var resultDisplay = function () {
    "use strict";

    var content = document.getElementById('content');
    var spinner = document.getElementById('spinner');
    var userSection = document.getElementById('users');
    var backButton = document.getElementById('back-button');

    // To keep track of page navigation
    var pages = [];
    var currentPageIndex = 0;

    /**
     * Adds and displays a list of users to the page HTML
     *
     * @param err
     * @param users
     * @param page
     */
    function renderUsers(err, users, page) {
        hideLoading();
        if (err) {
            alert(err.message);
        } else {
            if (users && users.length > 0) {
                var userUl = document.createElement('ul');
                var pageId = 'users' + page;
                if (pages.indexOf(pageId) < 0) {
                    pages.push(pageId);
                    userUl.setAttribute('id', 'users' + page);
                    users.forEach(function (user) {
                        var userLi = document.createElement('li');
                        userLi.appendChild(buildUserTemplate(user));
                        userUl.appendChild(userLi);

                    });
                    userSection.appendChild(userUl);
                }
                navigateToPage(page);
            }
        }
    }

    /**
     * Builds the required HTML to display user details
     *
     * @param user
     * @returns {HTMLElement}
     */
    function buildUserTemplate(user) {
        var userDiv = document.createElement('span');
        var img = document.createElement('img');
        img.src = user.photoURL;
        img.alt = user.firstName;
        img.title = user.alias;
        var userAlias = document.createTextNode(user.alias);
        var lastSeen = document.createTextNode('Last Seen ' + user.formattedLastSeenDateTime());
        userDiv.appendChild(img);
        userDiv.appendChild(document.createElement('h3')).appendChild(userAlias);
        userDiv.appendChild(document.createElement('p')).appendChild(lastSeen);
        return userDiv;
    }

    /**
     * Show the loading spinner
     */
    function showLoading() {
        content.style.display = "none";
        spinner.style.display = "block";
    }

    /**
     * Hide the loading spinner
     */
    function hideLoading() {
        content.style.display = "block";
        spinner.style.display = "none";

    }

    /**
     * Display the page at the given index
     *
     * @param pageIndex
     */
    function navigateToPage(pageIndex) {
        if (pageIndex > 0 && (pageIndex <= pages.length) && pageIndex !== currentPageIndex) {
            var currentPage = document.getElementById('users' + currentPageIndex);
            var newPage = document.getElementById('users' + pageIndex);

            if (currentPage) {
                currentPage.style.display = "none";
            }

            if (newPage) {
                newPage.style.display = "block";
            }

            currentPageIndex = pageIndex;

            backButton.style.display = ((currentPageIndex > 1) ? "block" : "none");

        }
    }

    /**
     * Initialize UI state and event listeners
     */
    function init() {
        backButton.style.display = "none";

        backButton.addEventListener('click', function () {
           navigateToPage(currentPageIndex - 1);
        });

        document.getElementById('more-button').addEventListener('click', function () {
                showLoading();
                userService.loadMoreNearbyUsers(renderUsers);
            },
            true);

        showLoading();
        userService.getNearbyUsers(renderUsers);
    }

    return {
        init: init
    };
}();


window.onload = function () {
    'use strict';
    resultDisplay.init();
};