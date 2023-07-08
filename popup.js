const INPUT_TASK_ID = "input-task";
const MANUAL_SUBTASK_CHECKBOX_ID = "cbx-manual-subtask";
const INPUT_SUBTASKS_ID = "input-subtasks";
const SELECT_SUBTASKS_ID = "select-subtasks";
const INPUT_VERSION_ID = "input-version";
const DISABLE_COMMIT_TITLE_CHECKBOX_ID = "cbx-disable-title";
const INPUT_COMMIT_TITLE_ID = "input-commit-title";

const enableTyping = () => {
  document.getElementById(SELECT_SUBTASKS_ID).style.display = "none";
  document.getElementById(INPUT_SUBTASKS_ID).style.display = "inline-block";
}

const disableTyping = () => {
  document.getElementById(INPUT_SUBTASKS_ID).style.display = "none";
  document.getElementById(SELECT_SUBTASKS_ID).style.display = "inline-block";
}

document.getElementById(DISABLE_COMMIT_TITLE_CHECKBOX_ID).addEventListener("change", (event) => {
  if (event.target.checked) {
    document.getElementById(INPUT_COMMIT_TITLE_ID).disabled = true;
  } else {
    document.getElementById(INPUT_COMMIT_TITLE_ID).disabled = false;
  }
});

document.getElementById(MANUAL_SUBTASK_CHECKBOX_ID).addEventListener("change", (event) => {
  if (event.target.checked) {
    enableTyping();
    document.getElementById(INPUT_SUBTASKS_ID).focus();
  } else {
    disableTyping();
    document.getElementById(SELECT_SUBTASKS_ID).focus();
  }
});

const setValues = (dataValues) => {
  let taskInput = document.getElementById(INPUT_TASK_ID)
  let titleInput = document.getElementById(INPUT_COMMIT_TITLE_ID)
  let subtasksSelect = document.getElementById(SELECT_SUBTASKS_ID);

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
    await chrome.tabs.sendMessage(tab.id,{action: "LOAD"},(response) => {
      setValues(response);
    })
  });
});

const getSubtaskId = () => {
  const manualSubtaskCheckbox = document.getElementById(MANUAL_SUBTASK_CHECKBOX_ID);
  const subtaskIdElement = document.getElementById(manualSubtaskCheckbox.checked ? INPUT_SUBTASKS_ID : SELECT_SUBTASKS_ID);
  const subtaskId = subtaskIdElement.value.trim();
  return subtaskId.length > 0 ? (manualSubtaskCheckbox.checked ? subtaskId : "#" + subtaskId) : "";
}

document.getElementById("form").onsubmit = (event) =>{
  let taskId = document.getElementById(INPUT_TASK_ID).value.trim();
  let subtaskId = getSubtaskId();
  let version = document.getElementById(INPUT_VERSION_ID).value.trim();
  let title = document.getElementById(INPUT_COMMIT_TITLE_ID).value.trim();
  const disableCommitTitle = document.getElementById(DISABLE_COMMIT_TITLE_CHECKBOX_ID).checked;

  let commitTitle = "";
  if(taskId.length > 0) {
    commitTitle += `#${taskId} `;
  }
  if(subtaskId.length > 0) {
    commitTitle += `${subtaskId} `;
  }
  if(version.length > 0) {
    commitTitle += `${version} `;
  }
  if(!disableCommitTitle) {
    commitTitle += title;
  }

  navigator.clipboard.writeText(commitTitle.trim()).then(() => {
      console.log("Texto copiado para o clipboard: ", commitTitle);
    }).catch((error) => {
      console.error("Falha ao copiar para o clipboard: ", error);
    });
  
  // Evitar o envio do formulário
  event.preventDefault();
}