console.log("Content is running")

const getPageData = () => {
  return message = {
    taskId: getTaskId(),
    title: getTitle(),
    subTasks: getSubtasks()
  }
}

const getTaskId = () => {
  let taskId = document.querySelector('[data-testid="issue.views.issue-base.foundation.breadcrumbs.current-issue.item"]').querySelector('[class="css-1gd7hga"]').innerHTML;
  return taskId != null && taskId != undefined && taskId.length > 0 ? taskId : ""
}

const getTitle = () => {
  let title = document.querySelector('[data-testid="issue.views.issue-base.foundation.summary.heading"]').innerHTML;
  return title != null && title != undefined && title.length > 0 ? title : ""
}

const getSubtasks = () => {
  let elements = []
  let subTasksContainer = document.querySelector('[data-testid="native-issue-table.ui.scroll-container.scroll-container"]')
  if(subTasksContainer != null){
    Array.from(subTasksContainer.querySelectorAll('[data-testid="native-issue-table.common.ui.issue-cells.issue-key.issue-key-cell"]')).forEach(element => {
      let value = element.textContent;
      if (value != null && value != undefined) {
        elements.push(value.trim());
      }
    });
  }
  return elements;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response = message.action == "LOAD" ? getPageData() : {}
  sendResponse(response)
})