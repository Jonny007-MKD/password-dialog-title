window.addEventListener("load", function windowLoader(e) {
    this.window.removeEventListener("load", windowLoader, false);   // Only need it to run this _one_ time
    startup()
}, false);

function startup() {
    let displayString = "Enter password: %MAIL%";
    let description = document.getElementById("infoBody").innerHTML;
    let reMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;
    let mails = reMail.exec(description)
    if (mails != null && mails.length == 1) {
        let mail = mails[0]        
        let host = description.substr(description.lastIndexOf(' ')+1, description.length-description.lastIndexOf(' ')-2)
        document.title = displayString.replace("%MAIL%", mail).replace("%HOST%", host)
    } else {
        console.log("password dialog title: Mail RegEx didn't match description: ", description)
    }
}

