
const setValues = (dataValues) => {
  let taskInput = document.getElementById("input-task")
  let titleInput = document.getElementById("input-commit-title")
  let select = document.getElementById("mySelect");

  taskInput.value = dataValues.taskId != null && dataValues.taskId != undefined ? dataValues.taskId : ""
  titleInput.value =  dataValues.title != null && dataValues.title != undefined ? dataValues.title : ""
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