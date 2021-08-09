// Permanaent element to store cards
const taskContainer = document.querySelector(".task_container");
console.log(taskContainer);

// Global Storage
let globalstore = [];

const newcard = ({
    id,
    imageUrl,
    taskTitle,
    taskType,
    taskDescription,
}) => `<div class="col-md-6 col-lg-4 mt-3  id=${id}">
            <div class="card ">
                <div class="card-header gap-2 d-flex justify-content-end">
                    <!-- <button type="button" class="btn btn-outline-primary px-3 rounded"><i class="fas fa-pencil-alt"></i></button> -->
                    <button type="button" class="btn btn-outline-primary"><i class="fas fa-pencil-alt"></i></button>
                    <button type="button" class="btn btn-outline-danger"><i class="fas fa-trash-alt"></i></button>
                    <!-- <button type="button" id=${id} class="btn btn-outline-danger px-3 rounded"><i class="fas fa-trash-alt"></i></button> -->
                </div>
                <div class="card-body">
                    <div class="card mb-3">
                        <img 
                            src=${imageUrl}
                            class="card-img-top rounded-10" 
                            alt="User Image"
                        >
                        <!-- <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
                        </div> -->
                    </div>
                    <h5 class="card-title">${taskTitle}</h5>
                    <p class="card-text">${taskDescription}</p>
                    <a href="#" class="btn btn-primary px-3 py-1 rounded-1">${taskType}</a>
                </div>
                <div class="card-footer text-muted">
                    <!-- <button type="button" class="btn btn-outline-primary rounded-pill float-end">Open Task</button> -->
                    <button type="button" class="btn btn-outline-primary float-end">Open Task</button>
                </div>
            </div>
        </div>
`;

// const loadInitialTaskCards = () => {
//     // access localstorage
//     const getInitialData = localStorage.getItem("tasky");
//     if(!getInitialData) return;

//     // convert stringified-object to object
//     const {cards} = JSON.parse(getInitialData);

//     //map arround the array to generate HTML card and inject it to DOM

//     cards.map((card) => {
//         const createNewCard = newcard(card);
//         taskContainer.insertAdjacentHTML("beforeend", createNewCard);
//         globalstore.push(card);
//     });

// };


const loadInitialTaskCards = () => {
    // access localstorage
    const getInitialData = localStorage.tasky;
    if(!getInitialData) return;

    // convert stringified-object to object
    const {cards} = JSON.parse(getInitialData);
    //const Ca = JSON.parse(getInitialData);

    //map arround the array to generate HTML card and inject it to DOM

    cards.map((cardObject) => {
        const createNewCard = newcard(cardObject);
        taskContainer.insertAdjacentHTML("beforeend", createNewCard);
        globalstore.push(cardObject);
    });

};

const updatelocalStorage = () =>
localStorage.setItem("tasky",JSON.stringify({cards:globalstore}));


const savechanges = () => {
    const taskData = {
        id : `${Date.now()}`, // unique number for card id
        imageUrl : document.getElementById("imageUrl").value,
        taskTitle : document.getElementById("tasktitle").value,
        taskType : document.getElementById("tasktype").value,
        taskDescription : document.getElementById("taskdescription").value,
    };
    // parent object browser -> window
    // parent object html -> DOM -> document
    //const {imageUrl} = taskData;
    
    console.log(taskData);

    // HTML code for new card
    const createCard = newcard(taskData);
    // rendering the card in Document
    taskContainer.insertAdjacentHTML("beforeend",createCard);
    // pushing data into globalstore array
    globalstore.push(taskData);
    // displaying array elements
    console.log(globalstore);

    // Aplication programming Interface
    // local storage -> interface

    // add to localstorage
    // localStorage.setItem("keyname", storing object)
    // localStorage.setItem("tasky",JSON.stringify({ cards:globalstore }));
    updatelocalStorage();
};

// const deleteCard = (event) => {
    // id
    event = window.event;
    const targetID = event.target.id;
    //search the globalStore, remove the object which matches with the id
    const newUpdatedArray = globalStore.filter(
        (cardObject) => cardObject.id !== targetID
    );
    
    // loop over the new globalStore, and inject updated cards to DOM

// }

// Issues
// The model was not closing upon adding new card.
// The cards were deleted after refresh -> localstorage (5MB)

// Features
// Delete modal features
// Edit modal features
// open task



// HINT 
// Edit ->
// 1. contenteditable -> use in html
// 2. setAttributeNode()