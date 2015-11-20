addPhotosButton();

document.addEventListener('DOMNodeInserted', addButtonIfNonExists);

function addButtonIfNonExists() {
    var photosButton = document.getElementById('photos-of-extension');
    if (photosButton === null || getUserId() !== photosButton.getAttribute("target-id")) {
        addPhotosButton();
    }
}

function addPhotosButton() {
    var targetId = getUserId();
    if (!targetId) {
        return;
    }
    var parentElement = document.querySelector("._3dc.lfloat._ohe._5brz");
    if (parentElement) {
        var currentLanguage = getCurrentFacebookLanguage();
        var btn = CreateButtonElement(targetId, currentLanguage);
        parentElement.insertBefore(btn, parentElement.children[parentElement.childNodes.length]);
    }
}

/*
 Creates a button element with all the attributes.
 */
function CreateButtonElement(targetId, language) {
    var btn = document.createElement("a");
    btn.className = "_3c_ _3sz";
    btn.innerText = getInnerTextByCurrentLanguage(language);
    btn.setAttribute("id", "photos-of-extension");
    btn.setAttribute("target-id", targetId);
    btn.setAttribute("href", "http://www.facebook.com/search/" + targetId + "/photos-of");
    return btn;
}

/*
 Gets the Facebook id of the current profile page
 */
function getUserId() {
    var pgletMainCol = document.getElementById('pagelet_timeline_main_column');

    if (pgletMainCol === null) {
        return "";
    }
    var dataGt = pgletMainCol.getAttribute("data-gt");

    var re = new RegExp("\"profile_owner\":\"([0-9]+?)\"");
    var match = re.exec(dataGt);


    return match[1];
}

/*
 Gets the inner text of the button according to the given language. Not supported language will be English
 */
function getInnerTextByCurrentLanguage(fbLanguage) {
    var buttonText;
    switch (fbLanguage) {
        case "en":
            buttonText = "Photos Tagged";
            break;
        case "he":
            buttonText = "תמונות מתוייגות";
            break;
        case "de":
            buttonText = "Mehr Fotos";
            break;
        case "ru":
            buttonText = "Ещё фото";
            break;
        case "it":
            buttonText = "Foto Taggati";
            break;
        case "fa":
            buttonText = "عکس برچسب زده";
            break;
        default:
            console.log(fbLanguage + " is not a supported language. Please contact the developers of 'Facebook photos-tagged' extension at:" +
                "https://chrome.google.com/webstore/detail/facebook-photos-tagged/lbacdacnofcaobjedeegmoakkfbpndpp/support");
            buttonText = "Photos Tagged";
            break;
    }
    return buttonText;
}

/*
 Gets the language of the current Facebook logged in profile
 */
function getCurrentFacebookLanguage() {
    currentLanguage = "en";
    var facebookRootElement = document.getElementById('facebook');

    if (facebookRootElement === null) {
        return currentLanguage;
    }
    currentLanguage = facebookRootElement.getAttribute("lang");
    return currentLanguage;
}