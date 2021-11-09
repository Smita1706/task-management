const taskContainer = document.querySelector(".task_container");
let globalTaskData = [];

const generateHTML = (taskData) =>
`<div id=${taskData.id} class="col-md-6 col-lg-4 my-4">
      <div class="card ">
          <div class="card-header gap-2 d-flex justify-content-end ">
            <button class="btn btn-outline-info" onclick="editCard.apply(this,arguments)" name=${taskData.id}>
              <i class="fal fa-pencil"></i>
            </button>
            <button class="btn btn-outline-danger" onclick="deleteCard.apply(this ,arguments)" name=${taskData.id}>
              <i class="far fa-trash-alt" name=${taskData.id}></i>
            </button>
          </div>
          <div class="card-body">
              <img class="card-img" src=${taskData.image} alt="image">
            <h5 class="card-title mt-4">${taskData.title}</h5>
            <p class="card-text">${taskData.description}</p>
            <span class="badge bg-primary">${taskData.task}</span>
          </div>
          <div class="card-footer ">
            <button class="btn btn-outline-primary" name=${taskData.id}>
                 Open Task
            </button>
          </div>
        </div>
  </div>
  `;
const saveToLocalStorage=()=>{
        localStorage.setItem("taskyCA",JSON.stringify({cards:globalTaskData}));
}

  const insertToDOM = function (content) {
    taskContainer.insertAdjacentHTML("beforeend", content);
  };

const addNewCard=()=>{
    //get task data
    const taskData={
        id:`${Date.now()}`, //tamplet literal
        title:document.getElementById("taskTitle").value,
        image:document.getElementById("imageURL").value,
        task:document.getElementById("taskType").value,
       
        description:document.getElementById("taskDescription").value,
    };
      globalTaskData.push(taskData);

   saveToLocalStorage();

  const newCard = generateHTML(taskData);
  insertToDOM(newCard);

    //clear form
    document.getElementById("taskTitle").value="";
    document.getElementById("imageURL").value="";
    document.getElementById("taskType").value="";
    document.getElementById("taskDescription").value="";
   return;
};

const loadExistingCards = function () {
  //check Localstorage
  const getData = localStorage.getItem("taskyCA");

  //Parse data if Exist
  if (!getData) return;

  const taskCards = JSON.parse(getData);
console.log(taskCards.cards);
  globalTaskData = taskCards.cards;
  

  globalTaskData.map(function (item) {
       const newCard = generateHTML(item);
       insertToDOM(newCard);
  });


  return;
};
  
 const deleteCard =(event) =>{		
  const targetId = event.target.getAttribute("name");		
  const elementType = event.target.tagName;		
		
  const removeTask = globalTaskData.filter((task)=> task.id!==targetId);		
  globalTaskData=removeTask;
		
	saveToLocalStorage();		
		
  //access dom to remove card		
 if(elementType === "BUTTON"){		
     return taskContainer.removeChild		
     (event.target.parentNode.parentNode.parentNode);		
     }else{		
     	 		    return taskContainer.removeChild		
     (event.target.parentNode.parentNode.parentNode.parentNode);		
     }				
 };		
		
	const editCard=(event)=>{		
     const targetId = event.target.getAttribute("name");		
     const elementType = event.target.tagName;		
		
     let taskTitle;		
     let taskType;		
     let taskDescription;		
     let parentElement;		
     let submitButton;		
		
      if(elementType ==="BUTTON"){		
          parentElement = event.target.parentNode.parentNode;		
		
      }else{		
         parentElement = event.target.parentNode.parentNode.parentNode;			
     }		
console.log(parentElement.childNodes);
   taskTitle=parentElement.childNodes[3].childNodes[3];		
     taskType=parentElement.childNodes[3].childNodes[7];		
     taskDescription=parentElement.childNodes[3].childNodes[5];		
    submitButton=parentElement.childNodes[5].childNodes[1];		
 		
     taskTitle.setAttribute("contenteditable","true");		
     taskDescription.setAttribute("contenteditable","true");		
     taskType.setAttribute("contenteditable","true");		
   submitButton.setAttribute("onclick","saveEdit.apply(this,arguments)");		
  submitButton.innerHTML = ("Save Changes");		

 };		
	
 const saveEdit=(event)=>{		
     const targetId = event.target.getAttribute("name");		
     const elementType = event.target.tagName;

 let parentElement;

 if(elementType ==="BUTTON"){		
            parentElement = event.target.parentNode.parentNode;		
      
        }else{		
           parentElement = event.target.parentNode.parentNode.parentNode;			
       }	

    const taskTitle=parentElement.childNodes[3].childNodes[3];		
    const taskType=parentElement.childNodes[3].childNodes[7];		
    const taskDescription=parentElement.childNodes[3].childNodes[5];		
    const submitButton=parentElement.childNodes[5].childNodes[1];		
	
    const updateData ={		
        title:taskTitle.innerHTML,		
        type:taskType.innerHTML,
     description:taskDescription.innerHTML,		
    };		
   const updateGlobalTask = globalTaskData.map((task)=>{		
        if(task.id ===targetId){		
            return{		
                ...task,...updateData		
            };		
        }		
        return task;		
    }) ;		
globalTaskData=updateGlobalTask;
    saveToLocalStorage();		
    taskTitle.setAttribute("contenteditable","false");		
   taskDescription.setAttribute("contenteditable","false");		
    taskType.setAttribute("contenteditable","false");		
    submitButton.innerHTML = "Open Task";		
 };	



