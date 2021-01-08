// Variables
let lists = [
    {
        name: "Courses",
        tasks: [
            {
                text: "Acheter du lait",
                checked: false,
                id: Date.now() + Math.random() * 1000,
            },
        ],
        id: Date.now() + +Math.random() * 1000,
    },
    {
        name: "Cadeaux",
        tasks: [
            {
                text: "Livre",
                checked: false,
                id: Date.now() + Math.random() * 1000,
            },
        ],
        id: Date.now() + Math.random() * 1000,
    },
];
let selectedListId = lists[0].id;

function selectList(listId) {
    const elements = document.querySelectorAll("[data-key");
    elements.forEach((element) => {
        element.className = "";
    });

    const selectedList = lists.find((_) => listId === _.id);

    selectedListId = selectedList ? selectedList.id : lists[0].id;

    const listElement = document.querySelector(`[data-key="${selectedListId}"]`);
    listElement.className = "selected";

    renderTasks();
}

// function isVisible() {
//     return listSection.style.visibility === 'visible';
// }
//
// function setVisible() {
//     if (!isVisible())
//         listSection.style.visibility = 'visible';
// }

function addList() {
    const element = document.getElementById("listInput");
    const list = {
        name: element.value,
        tasks: [],
        id: Date.now(),
    };
    element.value = "";

    lists.push(list);
    renderLists();

    // if (listInput.value === '') {
    //     listInput.reportValidity();
    //     listInput.setCustomValidity('Please enter a name');
    // } else {
    //     let list = new List(listInput.value, [])
    //     arrayList.push(list);
    //     let newButton = document.createElement('button');
    //     newButton.className = 'newList';
    //     newButton.innerText = list.listName;
    //     listDiv.append(newButton);
    //     newButton.addEventListener('click', () => displayList(arrayList.indexOf(list)));
    // }
}

function addTask() {
    const element = document.getElementById("taskInput");
    const task = {
        text: element.value,
        checked: false,
        id: Date.now(),
    };
    element.value = "";

    const list = lists.find((_) => selectedListId === _.id);

    list.tasks.push(task);
    renderTasks();
}

function deleteTask(taskId) {
    lists = lists.map((list) => {
        if (list.id === selectedListId)
            return {
                ...list,
                tasks: list.tasks.filter((task) => task.id !== taskId),
            };

        return list;
    });

    renderTasks();
}

function deleteList(listId) {
    lists = lists.filter((list) => listId !== list.id);

    if (!lists.find((_) => _.id === selectedListId)) selectedListId = lists[0].id;

    renderLists();
}

function checkTask(taskId) {
    lists = lists.map((list) => {
        if (list.id === selectedListId)
            return {
                ...list,
                tasks: list.tasks.map((task) => {
                    if (task.id === taskId)
                        return {
                            ...task,
                            checked: true,
                        };
                    return task;
                }),
            };

        return list;
    });

    renderTasks();
}

// function clearArea() {
//     while (taskListDiv.firstChild) {
//         taskListDiv.removeChild(taskListDiv.firstChild);
//     }
// }

function renderLists() {
    const parentElement = document.getElementById("lists");
    parentElement.innerHTML = "";

    lists.forEach((list) => {
        const childElement = document.createElement("li");
        childElement.setAttribute("data-key", `${list.id}`);
        childElement.setAttribute("onclick", `selectList(${list.id})`);
        if (selectedListId === list.id) childElement.className = "selected";
        childElement.innerHTML = `${list.name} <i onclick="deleteList(${list.id})" class="fas fa-trash-alt"></i>`;

        parentElement.append(childElement);
    });
}

function renderTasks() {
    const parentElement = document.getElementById("tasks");
    parentElement.innerHTML = "";

    const selectedList = lists.find((_) => selectedListId === _.id);

    selectedList.tasks.forEach((task) => {
        const childElement = document.createElement("li");
        childElement.setAttribute("data-key", `${task.id}`);
        childElement.innerHTML = `${task.text} <i onclick="checkTask(${task.id})" class="fas fa-check-square"></i> <i onclick="deleteTask(${task.id})" class="fas fa-trash-alt"></i>`;
        if (task.checked) childElement.className = "checked";

        parentElement.append(childElement);
    });
}

// function displayList(index) {
//     let list = arrayList[index];
//     listName.innerHTML = list.listName;
//     displayTasks(list);
//     //ça s'ajoute 800 fois
//     taskButton.addEventListener('click', function () {
//         for (let i = 0; i < arrayList.length; i++) {
//             console.log(arrayList[i].listName + "   ");
//             for (let i = 0; i < list.tasks.length; i++)
//                 console.log(list.tasks[i]);
//         }
//
//         if (taskInput.value === '') {
//             taskInput.reportValidity();
//             taskInput.setCustomValidity('Please enter something');
//         } else {
//             let item = taskInput.value;
//             list.tasks.push(item);
//         }
//         displayTasks(list);
//     });
//     setVisible();
// }
//
// function displayTasks(list) {
//     clearArea();
//     for (let i = 0; i < list.tasks.length; i++) {
//         let newElement = document.createElement('p');
//         newElement.className = 'task';
//         newElement.innerText = list.tasks[i];
//         taskListDiv.append(newElement);
//     }
// }

renderLists();
renderTasks();