let movieList = []

let defaultMovieList = [
    {
        id: "1",
        mName: "Blade Runner 2049",
        bOffice: "October 3, 2017",
        rDate: "$267.5 million",
        runtime: "163 min"
    },
    {
        id: "2",
        mName: "The Nice Guys",
        bOffice: "May 11, 2016",
        rDate: "$62.8 million",
        runtime: "116 min"
    },
    {
        id: "3",
        mName: "Ted",
        bOffice: "June 29, 2012",
        rDate: "$549.4 million",
        runtime: "112 min"
    },
    {
        id: "4",
        mName: "Apocalypse Now",
        bOffice: "May 19, 1979",
        rDate: "$100–150 million",
        runtime: "153 min"
    },
    {
        id: "5",
        mName: "Platoon",
        bOffice: "December 19, 1986",
        rDate: "$138 million",
        runtime: "120 min"
    },
    {
        id: "6",
        mName: "Reservoir Dogs",
        bOffice: "October 9, 1992",
        rDate: "$2.9 million",
        runtime: "99 min"
    },
    {
        id: "7",
        mName: "Django Unchained",
        bOffice: "December 25, 2012",
        rDate: "$426 million",
        runtime: "165 min"
    },
    {
        id: "8",
        mName: "Snatch",
        bOffice: "23 August, 2000",
        rDate: "$83.6 million",
        runtime: "102 min"
    }
]

let selectedRowId;

$(document).ready(function () {
    movieList = getMoviesListFromLocalStorage();
    movieList.forEach((item) => {
        addRow(item)
    })
    $("#form").submit(function (event) {
        var form = event.target;
        var fd = new FormData(form);
        var data = Object.fromEntries(fd)
        const value = $("#submitBtn").val();
        console.log(data.rDate)
        console.log(data.bOffice)
        if (value === "Добавить") {
            data.id = getRandomIntInclusive(0, 1000);
            addMovie(data);
        } else if (value === "Изменить") {
            updateMovie(data);
        }
        clearForm()
        return false;
    })
});


function addRow(data) {

    const movieIdColumn = document.createElement("td")
    movieIdColumn.innerText = data?.id

    const movieNameColumn = document.createElement("td")
    movieNameColumn.innerText = data?.mName

    const movieBoxOfficeColumn = document.createElement("td")
    movieBoxOfficeColumn.innerText = data?.bOffice

    const movieRDateColumn = document.createElement("td")
    movieRDateColumn.innerText = data?.rDate

    const movieRuntimeColumn = document.createElement("td")
    movieRuntimeColumn.innerText = data?.runtime

    const actionColumn = document.createElement("td")

    const columnRemoveAction = document.createElement("div")
    columnRemoveAction.innerText = "Remove"
    columnRemoveAction.classList.add("table-btn", "remove-btn")
    columnRemoveAction.onclick = function () {
        removeRowFromTable(data)
    }

    const columnEditAction = document.createElement("div")
    columnEditAction.innerText = "Edit"
    columnEditAction.classList.add("table-btn", "edit-btn")
    columnEditAction.onclick = function () {
        editRowFromTable(data)
    }
    actionColumn.append(columnEditAction)
    actionColumn.append(columnRemoveAction)

    const row = document.createElement("tr")
    row.setAttribute("id", data?.id + "-row");
    row.append(movieIdColumn,
        movieNameColumn,
        movieBoxOfficeColumn,
        movieRDateColumn,
        movieRuntimeColumn,
        actionColumn)

    $(".countLines").append(row);
}

function removeRowFromTable(data) {
    result = confirm("Вы действительно хотите удалить запись?");
    if (result) {
        movieList = movieList.filter((item) => item.id !== data.id);
        saveMoviesListToLocalStorage(movieList)
        removeRow(data);
    }
}

function addMovie(data) {
    data.id = getRandomIntInclusive(0, 1000);
    movieList.push(data)
    saveMoviesListToLocalStorage(movieList)
    addRow(data)
}

function updateMovie(data) {
    data.id = selectedRowId;

    movieList = movieList.map((item) => {
        if (item.id === data.id) {
            return data;
        }
        return item;
    });

    saveMoviesListToLocalStorage(movieList)
    updateRow(data);
    returnAddButton();
}

function updateRow(data) {
    const cells = $("#" + selectedRowId + "-row").children();
    cells[1].innerText = data.mName;
    cells[2].innerText = data.rDate;
    cells[3].innerText = data.bOffice;
    cells[4].innerText = data.runtime;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function removeRow(data) {
    $("#" + data?.id + "-row").remove();
}

function clearForm() {
    $("#mName").val(function () {
        return "";
    });
    $("#bOffice").val(function () {
        return "";
    });
    $("#rDate").val(function () {
        return "";
    });
    $("#runtime").val(function () {
        return "";
    });
}

function editRowFromTable(data) {
    selectedRowId = data?.id;

    const cells = $("#" + selectedRowId + "-row").children();

    $("#mName").val(function () {
        return cells[1].innerText;
    });
    $("#rDate").val(function () {
        return cells[2].innerText;
    });
    $("#bOffice").val(function () {
        return cells[3].innerText;
    });
    $("#runtime").val(function () {
        return cells[4].innerText;
    });

    $("#submitBtn").val(function () {
        return "Изменить";
    })

    const columnCancelAction = document.createElement("input");
    columnCancelAction.classList.add("submit-btn", "submit-btn-red");
    columnCancelAction.setAttribute("type", "button");
    columnCancelAction.setAttribute("value", "Отменить");
    columnCancelAction.onclick = function () {
        returnAddButton();
    };
    $(".submit-btn-wrapper").append(columnCancelAction);

}

function returnAddButton() {
    clearForm();
    $(".submit-btn-red").remove();
    $("#submitBtn").val(function () {
        return "Добавить";
    });
}

function saveMoviesListToLocalStorage(array) {
    const arrayString = JSON.stringify(array);
    window.localStorage.setItem("movies", arrayString);
}

function getMoviesListFromLocalStorage() {
    const value = window.localStorage.getItem("movies");
    let result = JSON.parse(value);

    if (result === null || result.size === undefined) {
        result = defaultMovieList;
    }
    return result;
}


