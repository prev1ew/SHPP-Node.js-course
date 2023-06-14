const blackBoxCount = 5;

function deleteDiv() {
    if (document.getElementById("js_button").checked) {
        const elements = document.getElementsByClassName("task1");
        while (elements.length > 0) {
            elements[0].remove();
        }
    } else {
        for (let i = 0; i < blackBoxCount; i++) {
            const deletedDiv = document.createElement("div");
            deletedDiv.className = "task1"
            deletedDiv.id = "task1"
            document.getElementsByClassName("wrapper")[0].append(deletedDiv)
        }
    }
}

function hideCSS() {
    const elements = document.getElementsByClassName("task1");
    if (document.getElementById("css_js_button").checked) {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.add("hidden");
        }
    } else {
        for (let i = 0; i < elements.length; i++) {
            elements[i].classList.remove("hidden");
        }
    }
}

function hideUnhideButton() {
    const currQuery = document.getElementById("hideUnhide-query").value;
    const foundItems = document.querySelectorAll(currQuery)
    for (let index = 0; index < foundItems.length; index++) {
        const currElement = foundItems[index];
        const classes = currElement.classList;
        let isHidden = false;
        for (let j = 0; j < classes.length; j++) {
            if (classes[j] == "hidden") {
                isHidden = true;
            }
        }

        if (isHidden) {
            classes.remove("hidden")
        } else {
            classes.add("hidden")
        }
    }
}

function yellowBoxClick() {
    alert("Hello")
    document.getElementById("yellow_box").attributes["onclick"].value = "yellowBoxClick2()"
}

function yellowBoxClick2() {
    document.getElementById("yellow_box").classList.add("hidden")
}

function buttonHover() {
    const classes = document.getElementById("red_box").classList;
    let isHidden = false;
    for (let j = 0; j < classes.length; j++) {
        if (classes[j] == "hidden") {
            isHidden = true;
        }
    }
    if (!isHidden) {
        classes.add("hidden")
    }
}

function buttonHoverOut() {
    const classes = document.getElementById("red_box").classList;
    let isHidden = false;
    for (let j = 0; j < classes.length; j++) {
        if (classes[j] == "hidden") {
            isHidden = true;
        }
    }
    if (isHidden) {
        classes.remove("hidden")
    }
}

function inputOnFocus() {
    const classes = document.getElementById("green_box").classList;
    let isHidden = false;
    for (let j = 0; j < classes.length; j++) {
        if (classes[j] == "hidden") {
            isHidden = true;
        }
    }
    if (isHidden) {
        classes.remove("hidden")
    }
}

function inputOnFocusOut() {
    const classes = document.getElementById("green_box").classList;
    let isHidden = false;
    for (let j = 0; j < classes.length; j++) {
        if (classes[j] == "hidden") {
            isHidden = true;
        }
    }
    if (!isHidden) {
        classes.add("hidden")
    }
}

function onInput() {
    inputOnFocusOut()
}

function addPicture() {
    const currUrl = document.getElementById("picture-url").value;
    if (currUrl.length > 0) {
        const newImg = document.createElement("img");
        newImg.src = currUrl;
        document.getElementsByClassName("wrapper")[0].append(newImg)
    }
}

function addPictures() {
    const currUrls = document.getElementById("pic-urls").value.split("\n");
    for (let i = 0; i < currUrls.length; i++) {
        const newImg = document.createElement("img");
        newImg.src = currUrls[i];
        document.getElementsByClassName("wrapper")[0].append(newImg)
    }
}

document.onmousemove = (event) => {
    document.getElementById("coordinates").innerHTML = `x:${event.x}, y:${event.y}`
}

function bodyOnLoad() {
    document.getElementById("user_lang").innerHTML = navigator.language
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
            document.getElementById("user_location").innerHTML = `Ш:${pos.coords.latitude}, Д:${pos.coords.longitude}`
        });

    } else {
        alert('It seems like Geolocation, which is required for this page, is not enabled in your browser. Please use a browser which supports it.');
    }
    processEditableBlocks()
}

function processEditableBlocks() {
    document.getElementById("local-storage").innerHTML = localStorage.getItem("item")
    document.getElementById("cookies").innerHTML = getCookie("item")
    document.getElementById("sessionStorage").innerHTML = sessionStorage.getItem("item")
}

function setCookie(name, value, days = 1) {
    let expires = "";
    if (days) {
        let date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

document.getElementById("local-storage").addEventListener("input", function () {
    localStorage.setItem("item", document.getElementById("local-storage").innerHTML)
}, false);

document.getElementById("sessionStorage").addEventListener("input", function () {
    sessionStorage.setItem("item", document.getElementById("sessionStorage").innerHTML)
}, false);

document.getElementById("cookies").addEventListener("input", function () {
    setCookie("item", document.getElementById("cookies").innerHTML)
}, false);

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function () { scrollFunction() };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("goTopBtn").style.display = "block";
    } else {
        document.getElementById("goTopBtn").style.display = "none";
    }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


document.getElementById("big-alert").addEventListener("click", function (e) {
    e = window.event || e;
    if (this === e.target) {
        alert("big alert")
    }
});

function smallAlert(e) {
    alert("small alert")
}

function showModal() {
    document.getElementById("modalWindow").classList.remove("hidden")
}

function hideModal() {
    document.getElementById("modalWindow").classList.add("hidden")
}

function fileOnChange() {
    let filesCount = document.getElementById("file-input").files.length;
    let textContainer = document.getElementById("file-msg");

    if (filesCount === 1) {
        // if single file is selected, show file name
        let fileName = document.getElementById("file-input").value.split('\\').pop();
        textContainer.innerHTML = fileName;
    } else {
        // otherwise show number of files
        textContainer.innerHTML = filesCount + ' files selected';
    }
}
    //
    //
    //
    //
