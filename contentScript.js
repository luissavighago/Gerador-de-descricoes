console.log("Content is running")

const getPageData = () => {
  return message = {
    taskId: getTaskId(),
    title: getTitle(),
    subTasks: getSubtasks()
  }
}

const getTaskId = () => {
  let taskId = document.querySelector("#jira-issue-header > div > div > div > nav > ol > div.css-1nibrb0.er2v6i51 > div:nth-child(2) > li > a > span").innerHTML;
  return taskId != null || taskId.length > 0 ? taskId : ""
}

const getTitle = () => {
  let title = document.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._12ji1r31._1qu2glyw._12y31o36._1reo1e7b._18m92qvy._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._1e0c1txw._16jlkb7n._1o9zkb7n._i0dl1wug._1ul9idpf._1bsb1osq > div > div > div > form > div > div > div > div > h1").innerHTML;
  return title != null || taskId.length > 0 ? title : ""
}

const getSubtasks = () => {
  let elements = []
  let subTasksContainer = document.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._12ji1r31._1qu2glyw._12y31o36._1reo1e7b._18m92qvy._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._19pkftgi > div:nth-child(3) > div > div._19pkftgi._otyrftgi._u5f3t94y")
  if(subTasksContainer != null){
    let subTasksList = subTasksContainer.querySelector("#ak-main-content > div > div > div._4t3i1osq._1e0c1txw._2lx21bp4 > div._4t3i1osq._kqswh2mm > div._kqswh2mm._4t3i1osq > div._ogwtidpf._6tinidpf._1cezidpf._m3zkidpf._7yjtidpf._ldgnidpf._un3pidpf._29hzidpf._4t3i1osq._1e0c1txw._2lx21bp4._15y61q9c._k8em1osq._dzc24jg8 > div > div._12ji1r31._1qu2glyw._12y31o36._1reo1e7b._18m92qvy._16jlkb7n._1o9zidpf._i0dlidpf._1ul9xilx._19bv18bx > div > div._19pkftgi > div:nth-child(3) > div > div._19pkftgi._otyrftgi._u5f3t94y > ul ")
    if(subTasksList != null){
      Array.from(subTasksList.querySelectorAll('[data-test-id="issue.issue-view.views.common.issue-line-card.issue-line-card-view.key"]')).forEach(element => {
        let value = element.textContent;
        if (value != null && value != undefined) {
          elements.push(value.trim());
        }
      });
    }
  }
  return elements;
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let response = message.action == "LOAD" ? getPageData() : {}
  sendResponse(response)
})