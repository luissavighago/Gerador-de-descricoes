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
  let title = document.querySelector('[data-test-id="issue.views.issue-base.foundation.summary.heading"]').innerHTML;
  return title != null && title != undefined && title.length > 0 ? title : ""
}

const getSubtasks = () => {
  let elements = []
  let subTasksContainer = document.querySelector('[data-testid="issue.issue-view.views.common.child-issues-panel.issues-container"]')
  if(subTasksContainer != null){
    Array.from(subTasksContainer.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]')).forEach(element => {
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