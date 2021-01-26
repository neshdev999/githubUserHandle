function generateDefaultOutputSection(responseJson) {
    let repoLength = responseJson.length;
    let outputRepoNameArray = [];
    let outputRepoUrlArray = [];
    for (let i = 0; i < repoLength; i++) {
        outputRepoNameArray.push(responseJson[i].name);
        outputRepoUrlArray.push(responseJson[i].url);
    }

    console.log(outputRepoNameArray);
    console.log(outputRepoUrlArray);

    $('#outputUserRepo').append(`<div class="userNameTitle">${responseJson[0].owner.login}</div>`);

    for (let j = 0; j < outputRepoNameArray.length; j++) {
        $('#outputUserRepo').append(`<div class="repoOutputStylesHolder"><div><div class="repoNameIndicatorStyles">Repository [${j+1}]</div> <div class="repoName"> ${outputRepoNameArray[j]}</div>
                                          <div class="repoURL"><a href="${outputRepoUrlArray[j]}">${outputRepoUrlArray[j]}</a></div>
                                    </div>`);
    }
}

function getRepoList(username) {
    let url = "https://api.github.com/users/" + username + "/repos";
    fetch(url)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else if (response.status === 404) {
                throw '🤪No such user found. Not a good github fan?😪Please try again with other username😀🤣';
            }
        })
        .then(
            responseJson => {
                generateDefaultOutputSection(responseJson);
            }
        )
        .catch(error => {
            $('#serverErrorReportContainer').css('display', 'block');
            $('#serverErrorReportContainer').text(error);
        });
}


function initialDefaultGithubUserHandle() {
    getRepoList('neshdev999');
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        // Remove placeholder header
        if ($('#outputUserRepo').length) {
            $("#outputUserRepo").empty();
        }

        // make error report field blank
        $('#serverErrorReportContainer').css('display', 'none');
        $('#serverErrorReportContainer').text("");


        /* Get Breed of Dog From user */
        var userSelectedHandle = $('#githubUsernameInput').val();

        /* pass this value to fetching function */
        getRepoList(userSelectedHandle);

    });
}

/*Footer*/

function generateFooter() {
    const githubUserFooterBase = githubUserFooter();
    $('#footer').append(githubUserFooterBase);
}

function githubUserFooter() {
    return `<div class="footContain"><div class="footStyles"><span>&nbsp;Github User Handle Search Panel&nbsp;&nbsp;<br></span><span>Nesh &copy; ${getCopyRightYear()}</span></div></div>`;
}

function getCopyRightYear() {
    return new Date().getFullYear();
}

$(window).bind("load", function() {
    var footerHeight = 0,
        footerTop = 0,
        $footer = $("#footer");
    positionFooter();

    function positionFooter() {
        footerHeight = $footer.height();
        footerTop = ($(window).scrollTop() + $(window).height() - footerHeight) + "px";
        if (($(document.body).height() + footerHeight) < $(window).height()) {
            $footer.css({
                position: "absolute"
            }).animate({
                top: footerTop
            })
        } else {
            $footer.css({
                position: "static"
            })
        }
    }
    $(window)
        .scroll(positionFooter)
        .resize(positionFooter)
});

function clearContent() {
    $("#githubUsernameInput").val('');
}

/* Initialize Application */
$(function() {

    console.log('App loaded! Waiting for submit!');
    clearContent();
    initialDefaultGithubUserHandle();
    watchForm()
    generateFooter();
});