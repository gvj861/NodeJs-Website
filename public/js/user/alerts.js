export const showAlert = (status, message) =>  {
    if (status.localeCompare("fail") == 0) {
        $(".modal-content, .modal-content p").css("background-color", "rgb(248, 59, 59)");
        $(".modal-content p").html(message);
        $(".modal").css("display", "block");
        $(".close").css("background-color", "rgb(248, 59, 59)");
    }
    else {
        $(".modal-content, .modal-content p").css("background-color", "#075E54");
        $(".modal-content p").html(message);
        $(".modal").css("display", "block");
        $(".close").css("background-color", "rgb(7, 94, 84)");
    }

    $(".close").click(function () {
        $("#myModal").css("display", "none");
    });
}