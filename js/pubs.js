var myArray = []
$.getJSON("data/pub.json", function (jsonData) {
    // console.log(jsonData); 
    myArray = jsonData["items"];
    // console.log(myArray)
    buildTable(myArray)
});


function toggleAbstract(abstractId) {
    var abstractDiv = document.getElementById(abstractId);
    var abstractTrigger = abstractDiv.previousElementSibling; // Assuming the <b> tag is directly before the <div>

    if (abstractDiv.style.display === "none") {
        abstractDiv.style.display = "block";
        abstractTrigger.innerHTML = abstractTrigger.innerHTML.replace('▶', '▼');
    } else {
        abstractDiv.style.display = "none";
        abstractTrigger.innerHTML = abstractTrigger.innerHTML.replace('▼', '▶');
    }
}

function buildTable(data) {
    var table = document.getElementById('myTable')
    table.innerHTML = ''
    // Assuming data is an array of objects and each object has a date property
    data.sort(function (a, b) {
        var dateA = new Date(a.date); // Convert date string to Date object
        var dateB = new Date(b.date); // Convert date string to Date object
        return dateB - dateA; // Sort in descending order
    });
    var lastYear = null;
    for (var i = 0; i < data.length; i++) {
        var date = new Date(data[i].date)
        var yy = date.getFullYear()
        if (lastYear !== null && yy !== lastYear) {
            // If the year changes, insert a horizontal line
            table.innerHTML += '<tr><td colspan="100%" style="padding: 0; height: auto;"><hr style="margin: 0;"></td></tr>';
        }
        lastYear = yy;
        var mm = date.getMonth()
        var creators = data[i].creators
        var authorList = ''
        and = ''
        var mynote = data[i].mynote ? data[i].mynote : ''
        for (var j = 0; j < creators.length; j++) {
            if (j > 0 && j == creators.length - 1) {
                and = " and "
            }
            authorList += and + creators[j].firstName + " " + creators[j].lastName + ", ";
        }
        var journal = null;
        if (data[i].itemType == "journalArticle") {
            dataIssue = data[i].issue ? " (" + data[i].issue + ")" : ""
            journal = data[i].journalAbbreviation + " " + data[i].volume + dataIssue + ", " + data[i].pages
        } else if (data[i].itemType == "preprint") {
            journal = "arXiv preprint " + data[i].archiveID
        } else if (data[i].itemType == "conferencePaper") {
            journal = data[i].proceedingsTitle + ", " + data[i].pages
        }

        var row = `<tr style="font-family: Garamond, serif; font-size:18px;">
        <td>${yy}</td>
        <td class="text-wrap"> <i style="color: #565656;">${data[i].title}</i>, ${authorList}  <a href="${data[i].url}" style="text-decoration: none; color: #016d9b">${journal}</a> ${mynote} <b style="color: #565656; cursor: pointer;" onclick="toggleAbstract('abstract${i}')">▶ Abstract</b>
            <div id="abstract${i}" style="display: none; font-family: 'Times New Roman'; font-size:16px ; color: black; margin-top: 10px;border: 1px solid #ccc; border-radius: 8px; padding: 10px;background-color:#e8e8e8;">
                ${data[i].abstractNote ? data[i].abstractNote : "No abstract available."}
            </div>
        </td>
   </tr>`;
        table.innerHTML += row;
    }
}



