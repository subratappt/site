var myArray = []
$.getJSON("data/pub.json", function (jsonData) {
    // console.log(jsonData); 
    myArray = jsonData["items"];
    console.log(myArray)
    buildTable(myArray)
});

// $('th').on('click', function () {
//     var column = $(this).data('column')
//     var order = $(this).data('order')
//     var text = $(this).html()
//     // console.log(text)
//     // text = text.substring(0, text.length - 1)

//     if (order == 'desc') {
//         $(this).data('order', "asc")
//         myArray = myArray.sort((a, b) => a[column] > b[column] ? 1 : -1)
//         // text += '&#9660'

//     } else {
//         $(this).data('order', "desc")
//         myArray = myArray.sort((a, b) => a[column] < b[column] ? 1 : -1)
//         // text += '&#9650'

//     }
//     $(this).html(text)
//     buildTable(myArray)
// })

// $(function () {
//     $('[data-toggle="tooltip"]').tooltip()
// })

function buildTable(data) {
    var table = document.getElementById('myTable')
    table.innerHTML = ''
    for (var i = 0; i < data.length; i++) {
        // var appsLink = data[i].applicationLink
        // var link = "&#x1F5CF"
        // if (typeof appsLink == "undefined") {
        //     appsLink = ""
        //     // link = "&#x1F5CF"
        //     link = "&#x2709"
        // }
        // var deadline = data[i].deadline
        // if (typeof deadline == "undefined") {
        //     deadline = ""
        // }
        // var msg = data[i].message
        // if (typeof msg == "undefined") {
        //     msg = ""
        // }
        var date = new Date(data[i].date)
        var yy = date.getFullYear()
        var mm = date.getMonth()
        var creators = data[i].creators
        var authorList = ''
        and = ''
        for (var j = 0; j < creators.length; j++) {
            if (j > 0 && j == creators.length - 1) {
                and = " and "
            }
            authorList += and + creators[j].firstName + " " + creators[j].lastName + ", ";
        }

        var row = `<tr>
                            <td  class=""> ${yy}</td>
							<td  class="text-wrap">${authorList} ${data[i].title}, <a href=${data[i].url}>${data[i].journalAbbreviation} ${data[i].volume} (${data[i].issue}), ${data[i].pages}</a></td>
					  </tr>`
        table.innerHTML += row
    }
}



