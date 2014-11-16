var app = {
    // Application Constructor
    initialize: function () {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function () {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function () {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

function doLogin() {
    var userName = document.getElementById("userName").value;
    window.location.assign("./chat.html?q=" + userName);
    return false;
}

function sendMessage() {
    var messageContent = document.getElementById("messageIn").value;
    refMessages.push({"message": {"userName": getUser(), "messageContent": messageContent}});
    document.getElementById("messageIn").value = "";
    return false;
}

function registerListener() {
    refMessages.on("child_added", function (messageAdded) {
        var newMessage = messageAdded.val();
        var element = document.createElement("div");
        var messageUser = newMessage.message.userName;
        if (messageUser == getUser()) {
            console.log("==");
            element.className = "bubble bubble-alt white";
            element.innerHTML = "<p>" + newMessage.message.messageContent + "</p>";
        } else {
            console.log("NO ==");
            element.className = "bubble";
            element.innerHTML = "<p>" + newMessage.message.userName + ": " + newMessage.message.messageContent + "</p>";
        }
        document.getElementById("container").appendChild(element);
    });
}

function getUser() {
    return location.search.substr(location.search.indexOf("=") + 1);
}