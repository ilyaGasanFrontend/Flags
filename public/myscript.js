function myMessage(messageText, messageType) {
    document.addEventListener("DOMContentLoaded", function () {
        var message = messageText;
        var type = messageType;
        var duration = 2000;
        var ripple = false;
        var dismissible = false;
        var positionX = 'right'
        var positionY = 'top';
        window.notyf.open({
            type,
            message,
            duration,
            ripple,
            dismissible,
            position: {
                x: positionX,
                y: positionY
            }
        });
    });
};

function myMessageConfirm(messageText, messageType) {
    var message = messageText;
    var type = messageType;
    var duration = 2000;
    var ripple = false;
    var dismissible = false;
    var positionX = 'right'
    var positionY = 'top';
    window.notyf.open({
        type,
        message,
        duration,
        ripple,
        dismissible,
        position: {
            x: positionX,
            y: positionY
        }
    });
}
// });

