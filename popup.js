
const setValues = (dataValues) => {
  let taskInput = document.getElementById("input-task")
  let titleInput = document.getElementById("input-commit-title")
  let subtasksSelect = document.getElementById("select-subtasks");

  taskInput.value = dataValues.taskId != null && dataValues.taskId != undefined ? dataValues.taskId : ""
  titleInput.value =  dataValues.title != null && dataValues.title != undefined ? dataValues.title : ""
  if(dataValues.subTasks != null && dataValues.subTasks.length > 0){
    dataValues.subTasks.forEach(task => {
      let option = document.createElement("option");
      option.text = task;
      option.value = task;
      subtasksSelect.appendChild(option)
    });
  }
}

document.addEventListener("DOMContentLoaded",() => {
  chrome.tabs.query({active:true,currentWindow:true},async (tabs) => {
    var tab = tabs[0];
    console.log(tab);
    await chrome.tabs.sendMessage(tab.id,{action: "LOAD"},(response) => {
      console.log(response);
      setValues(response);
    })
  });
});

document.getElementById("form").onsubmit = (event) =>{
  let taskId = document.getElementById("input-task").value;
  let subtaskId = document.getElementById("select-subtasks").value;
  let version = document.getElementById("input-version").value;
  let title = document.getElementById("input-commit-title").value;

  let commitTitle = `${taskId != null && taskId.length > 0 ? "#"+taskId.trim():""} ${subtaskId != null && subtaskId.length > 0 ? "#"+subtaskId.trim() : "" } ${version.trim()} ${title.trim()}`

  navigator.clipboard.writeText(commitTitle).then(() => {
      console.log("Texto copiado para o clipboard: ", commitTitle);
    }).catch((error) => {
      console.error("Falha ao copiar para o clipboard: ", error);
    });
  
  // Evitar o envio do formulário
  event.preventDefault();
}