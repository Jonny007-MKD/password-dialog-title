window.addEventListener("load", function windowLoader(e) {
    "use strict";
    this.window.removeEventListener("load", windowLoader, false);   // Only need it to run this _one_ time
    startup();
}, false);

// Determines the type of the dialog
// 0: Unknown
// 1: Password for mail account
// 2: Username and password for host
function getType() {
    "use strict";
    let loginContainer     = document.getElementById("loginContainer");
    let password1Container = document.getElementById("password1Container");
    if (loginContainer.hidden && !password1Container.hidden) {
        return 1; // password only
    }
    if (!loginContainer.hidden && !password1Container.hidden) {
        return 2; // username + password
    }
    return 0;
}

function startup() {
    "use strict";
    let type = getType();
    console.log(type);
    switch (type) {
        case 0: return;
        case 1: passwordForMailAccount(); return;
        case 2: usernameAndPasswordForHost(); return;
        default: // not implemented
    }
}

function setTitle(title) {
    document.title = title;
    document.getElementById("infoTitle").innerHTML = title;
}


function passwordForMailAccount() {
    "use strict";
    // %MAIL%: User name = Mail address
    // %HOST%: Hostname at which we authenticate
    let displayString = "Enter password: %MAIL%";

    let mail = findMailAddress(); // we should not depend on a mail syntax here
    if (mail === null) return;
    let description = document.getElementById("infoBody").innerHTML;
    let host = description.substr(description.lastIndexOf(' ')+1, description.length-description.lastIndexOf(' ')-2);
    let title = displayString.replace("%MAIL%", mail).replace("%HOST%", host);
    setTitle(title);
}

function usernameAndPasswordForHost() {
    "use strict";
    // %PROTOCOL%: http:
    // %HOST%:     example.com:3000
    // %HOSTNAME%: example.com
    // %PORT%:     3000
    let displayString = "Enter user & password: %HOST%";


    let url = findURL();
    if (url === null) return;
    //let title = displayString.replace("%PROTOCOL%", url.protocol).replace("%HOST%", url.host).replace("%HOSTNAME%", url.hostname).replace("%PORT%", url.port);
    let title = displayString.replace("%HOST%", url);
    setTitle(title);
}


function findMailAddress() {
    "use strict";
    let description = document.getElementById("infoBody").innerHTML;
    let reMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    //` for my stupid editor
    let mails = reMail.exec(description);
    if (mails !== null && mails.length == 1) {
        return mails[0];
    } else {
        console.log("Mail RegEx didn't match description: ", description);
        return null;
    }
}

function findURL() {
    "use strict";
    let description = document.getElementById("infoBody").innerHTML;
    let reURL = /https?:\/\/(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    let urls = reURL.exec(description);
    if (urls !== null && urls.length == 1) {
        //let a = document.createElement("a");
        //a.href = urls[0];
        return urls[0];
    } else {
        console.log("URL RegEx didn't match description: ", description);
        return null;
    }
}

