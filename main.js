let btn = document.getElementById('button');
let input = document.querySelector('#new-list-name');
let listDiv = document.querySelector('#lists-list');
let arrayList = [];

class List {
    constructor(listName, items = []) {
        this.listName = listName;
        // this.items = items;
    }
}

btn.addEventListener('click', addList);

function addList() {
    if (input.value === '') {
        input.reportValidity();
        input.setCustomValidity('Please enter a name');
    } else {
        arrayList.push(new List(input.value, []));
        let newButton = document.createElement('button');
        newButton.className = 'newList';
        newButton.innerText = arrayList[arrayList.length - 1].listName;
        listDiv.append(newButton);
    }

}


//let paragraph = document.querySelector('#info');
// paragraph.innerText = `${numberOfSeasons} seasons, ${numberOfEpisodes} episodes per season
//
// Total viewing time: ${totalShowTime} minutes`