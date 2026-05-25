const Taskinput=document.getElementById("task-input");
const button=document.getElementById("Enter-task");
const Taskitems=document.querySelector(".Task-items");
document.addEventListener("DOMContentLoaded", loadData);
button.addEventListener("click",()=>{
    const taskValue = Taskinput.value.trim();
    if (taskValue !== "") { // Prevents adding empty tasks
        Addtask(taskValue,false);
        Taskinput.value = ""; // Clears input field after adding
        Savedata();
        
    }else{
        alert("Please provide task!");
    }
})
const Addtask=(val,isCompleted = false)=>{
    let task=document.createElement("li");
    const checkbox=document.createElement("input");
    checkbox.type="checkbox";
    checkbox.className="Check-box";
    checkbox.checked=isCompleted;
     if (isCompleted) {
        task.classList.add("completed");
    }
    checkbox.addEventListener("change",()=>{
        task.classList.toggle("completed",checkbox.checked);
        Savedata();
    })
    
    const textSpan = document.createElement("span");
    textSpan.textContent = val;
    const deleteBtn=document.createElement("button");
    deleteBtn.textContent="X";
    deleteBtn.className="Delete-btn"
    deleteBtn.addEventListener("click",()=>{
        task.remove();
        Savedata();
    })

    task.appendChild(checkbox);
    task.appendChild(textSpan);
    task.appendChild(deleteBtn);
    Taskitems.appendChild(task);
}
function Savedata(){
    const tasks = [];
    Taskitems.querySelectorAll("li").forEach(taskLi => {
        tasks.push({
            text: taskLi.querySelector("span").textContent,
            completed: taskLi.querySelector(".Check-box").checked
        });
    });
    localStorage.setItem("data", JSON.stringify(tasks));
}// REASON IT WORKS:
// 1. Saves raw data (JSON strings) instead of raw HTML.
// 2. HTML strings lose active JS event listeners on page reload.
// 3. Re-running Addtask() on load rebuilds elements and binds fresh listeners.
function loadData() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        const tasks = JSON.parse(savedData);
        tasks.forEach(task => {
            Addtask(task.text, task.completed);
        });
    }
}// WHY LOADDATA() IS USED:
// 1. Automatically runs every time the webpage refreshes or reopens.
// 2. Fetches the saved task data array back from the browser's localStorage.
// 3. Loops through that data to rebuild the list and restore all button clicks.
