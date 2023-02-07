!function(){"use strict";class t{constructor(t,s){this.parent=t,this.task=s}addTask(){const t=document.createElement("li");t.classList.add("tasks-list__item"),t.classList.add("task"),t.textContent=this.task,this.parent.appendChild(t)}}(new class{constructor(){this.board=null,this.tasksTodo=[],this.tasksInP=[],this.tasksDone=[],this.tasks=[this.tasksTodo,this.tasksInP,this.tasksDone],this.addInput=this.addInput.bind(this),this.closeForm=this.closeForm.bind(this),this.addNewTask=this.addNewTask.bind(this),this.onTaskEnter=this.onTaskEnter.bind(this),this.removeTask=this.removeTask.bind(this),this.saveListOfTasks=this.saveListOfTasks.bind(this),this.loadListOfTasks=this.loadListOfTasks.bind(this),this.mouseDown=this.mouseDown.bind(this),this.dragMove=this.dragMove.bind(this),this.mouseUp=this.mouseUp.bind(this),this.drawSavedTasks=this.drawSavedTasks.bind(this),this.showPossiblePlace=this.showPossiblePlace.bind(this)}init(){this.loadListOfTasks(),this.drawBoard(),this.drawSavedTasks(),[...this.board.querySelectorAll(".column__add")].forEach((t=>t.addEventListener("click",this.addInput))),window.addEventListener("beforeunload",this.saveListOfTasks)}loadListOfTasks(){const t=localStorage.getItem("tasks");null!==t&&(this.tasks=JSON.parse(t))}saveListOfTasks(){this.tasksTodo=[],this.tasksInP=[],this.tasksDone=[];const t=this.board.querySelector(".todo"),s=this.board.querySelector(".in-progress"),e=this.board.querySelector(".done"),a=[...t.querySelectorAll(".task")],o=[...s.querySelectorAll(".task")],d=[...e.querySelectorAll(".task")];a.forEach((t=>this.tasksTodo.push(t.textContent))),o.forEach((t=>this.tasksInP.push(t.textContent))),d.forEach((t=>this.tasksDone.push(t.textContent))),this.tasks=[this.tasksTodo,this.tasksInP,this.tasksDone],localStorage.setItem("tasks",JSON.stringify(this.tasks))}drawBoard(){this.board=document.createElement("section"),this.board.classList.add("board"),this.board.innerHTML='<div class="column">\n    <h2 class="column__header">todo</h2>\n    <ul class="tasks-list todo"></ul>\n    <div class="column__add">+ Add another card</div>\n  </div>\n  <div class="column">\n    <h2 class="column__header">in progress</h2>\n    <ul class="tasks-list in-progress" id="trew"></ul> \n    <div class="column__add">+ Add another card</div>\n  </div>\n  <div class="column">\n    <h2 class="column__header">done</h2>\n    <ul class="tasks-list done"></ul>\n    <div class="column__add">+ Add another card</div>\n  </div>',document.querySelector("body").appendChild(this.board)}drawSavedTasks(){const s=[".todo",".in-progress",".done"];for(let e=0;e<s.length;e+=1){const a=this.board.querySelector(s[e]);this.tasks[e].forEach((s=>{new t(a,s).addTask(),0===e&&this.tasksTodo.push(s),1===e&&this.tasksInP.push(s),2===e&&this.tasksDone.push(s)})),this.addListeners()}}addInput(t){const s=document.createElement("form");s.classList.add("column__add-form"),s.innerHTML='\n    <textarea class="add-form__textarea" type ="text" placeholder="Enter a title for this card"></textarea>\n    <div class="add-form__form-control">\n      <button class="add-form__submit-button add-form__button">Add Card</button>\n      <button class="add-form__close-button add-form__button">Close</button>\n    </div>\n ';const e=t.target.closest(".column");t.target.replaceWith(s);const a=e.querySelector(".add-form__submit-button"),o=e.querySelector(".add-form__close-button");a.addEventListener("click",this.addNewTask),o.addEventListener("click",this.closeForm)}closeForm(t){t.preventDefault();const s=document.createElement("div");s.classList.add("column__add"),s.textContent="+ Add another card";const e=t.target.closest(".column"),a=e.querySelector(".column__add-form");e.removeChild(a),e.appendChild(s),s.addEventListener("click",this.addInput)}addNewTask(s){s.preventDefault();const e=s.target.closest(".column"),a=e.querySelector(".tasks-list"),o=e.querySelector(".add-form__textarea").value;if(/\S.*/.test(o)){new t(a,o).addTask();const s=document.createElement("div");s.classList.add("column__add"),s.textContent="+ Add another card",e.removeChild(e.querySelector(".column__add-form")),e.appendChild(s),s.addEventListener("click",this.addInput),this.addListeners()}else!function(t,s){const e=document.createElement("div");e.classList.add("error"),e.classList.add(`error-${s}`);const a=document.createElement("span");a.textContent="Please type at least one symbol",e.insertAdjacentElement("afterbegin",a),t.querySelector(`.error-${s}`)||t.insertAdjacentElement("afterbegin",e),setTimeout((()=>{t.removeChild(e)}),2500)}(e.querySelector(".column__add-form"),"empty")}addListeners(){const t=this.board.querySelectorAll(".task");[...t].forEach((t=>t.addEventListener("mouseover",this.onTaskEnter))),[...t].forEach((t=>t.addEventListener("mouseleave",this.onTaskLeave))),[...t].forEach((t=>t.addEventListener("mousedown",this.mouseDown)))}removeTask(t){const s=t.target.closest(".task");t.target.closest(".tasks-list").removeChild(s)}onTaskEnter(t){if(t.target.classList.contains("task")&&!t.target.querySelector(".close")){const s=document.createElement("div");s.classList.add("tasks-list__close"),s.classList.add("close"),t.target.appendChild(s),s.style.top=s.offsetTop-s.offsetHeight/2+"px",s.style.left=t.target.offsetWidth-s.offsetWidth-3+"px",s.addEventListener("click",this.removeTask)}}onTaskLeave(t){t.target.removeChild(t.target.querySelector(".close"))}mouseDown(t){if(t.target.classList.contains("task")){this.draggedEl=t.target,this.ghostEl=t.target.cloneNode(!0),this.ghostEl.removeChild(this.ghostEl.querySelector(".close")),this.ghostEl.classList.add("dragged"),this.ghostEl.classList.add("ghost"),this.ghostEl.style.width=`${this.draggedEl.offsetWidth}px`,this.ghostEl.style.height=`${this.draggedEl.offsetHeight}px`,document.body.appendChild(this.ghostEl);const{top:s,left:e}=t.target.getBoundingClientRect();this.top=t.pageY-s,this.left=t.pageX-e,this.ghostEl.style.top=s-this.draggedEl.offsetHeight+"px",this.ghostEl.style.left=e-this.board.offsetWidth+"px",this.ghostEl.style.width=`${this.draggedEl.offsetWidth}px`,this.ghostEl.style.height=`${this.draggedEl.offsetHeight}px`,this.draggedEl.style.display="none",this.board.addEventListener("mousemove",this.dragMove),document.addEventListener("mousemove",this.showPossiblePlace),document.addEventListener("mouseup",this.mouseUp)}}dragMove(t){t.preventDefault(),this.draggedEl&&(this.ghostEl.style.top=t.pageY-this.top+"px",this.ghostEl.style.left=t.pageX-this.left+"px")}mouseUp(){this.draggedEl&&(this.newPlace.replaceWith(this.draggedEl),this.draggedEl.style.display="flex",document.body.removeChild(document.body.querySelector(".dragged")),this.ghostEl=null,this.draggedEl=null)}showPossiblePlace(t){if(t.preventDefault(),!this.draggedEl)return;const s=t.target.closest(".tasks-list");if(s){const e=s.querySelectorAll(".task"),a=[s.getBoundingClientRect().top];if(e)for(const t of e)a.push(t.getBoundingClientRect().top+t.offsetHeight/2);this.newPlace||(this.newPlace=document.createElement("div"),this.newPlace.classList.add("task-list__new-place")),this.newPlace.style.width=`${this.ghostEl.offsetWidth}px`,this.newPlace.style.height=`${this.ghostEl.offsetHeight}px`;const o=a.findIndex((s=>s>t.pageY));-1!==o?s.insertBefore(this.newPlace,e[o-1]):s.appendChild(this.newPlace)}}}).init()}();