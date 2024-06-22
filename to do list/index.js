let ToDoList=
{
    TaskArray:[],
    // arw function
    SavaTask:()=>
    {
        let taskName=document.getElementById("txtTaskName")
        let periority=document.getElementById("ddlPeriority")
        let reminderDate=document.getElementById("txtDate")
        let description=document.getElementById("txtDescription")
        // save data in local storage
        let Task=
        {
            TaskId:ToDoList.GetNewId(),
            TaskName:taskName.value,
            PeriorityId:periority.value,
            // take the value of periority(1,2,3,4) from drop down list and give the innerText(low-medium-high-highest)
            Periority:periority.options[periority.selectedIndex].innerText,
            ReminderDate:reminderDate.value,
            Description:description.value
        };
        // Array of objects
        ToDoList.TaskArray.push(Task);
        // call the fuctions
        ToDoList.SavaInStorage()
        ToDoList.ShowTasks();
        
    },
    ShowTasks:()=>
    {
        // convert data from objects to array of string
        let SavedArray=JSON.parse(localStorage.getItem("Tasks"))
        let container=document.getElementById("TaskContainer")
        container.innerHTML="";
        let htmlExample=""
        let periorityclass=""
        // function call back
        // we use SavedArray to get the old(from local storage) and current data
        SavedArray.forEach(function(task,index) {
            switch(task.PeriorityId)
            {
                case "1":
                    periorityclass="low"
                    break
                case "2":
                    periorityclass="Medium"
                    break
                case "3":
                    periorityclass="High"
                    break 
                case "4":
                    periorityclass="Highest"
                    break        
            }
            // class name dynamic
            htmlExample+="<div class='"+periorityclass+"'><div style='width: 20%; float: left;'>"+task.TaskName+"</div>"
            htmlExample+="<div style='width: 20%; float: left;'>"+task.Periority+"</div>"
            htmlExample+="<div style='width: 20%; float: left;'>"+task.ReminderDate+"</div>"
            htmlExample+="<div style='width: 20%; float: left;'>"+task.Description+"</div>"
            htmlExample+="<div style='width: 20%; float: left;'> <input type='button' value='Delete' onclick='ToDoList.DeleteTask(this,"+task.TaskId+")'> </div></div>"
        });
        container.innerHTML=htmlExample
    },
    // save data in local storage
    SavaInStorage:()=>
    {
        localStorage.setItem("Tasks",JSON.stringify(ToDoList.TaskArray))
    },
    GetDataFromStorage:()=>
    {
        let SavedArray=JSON.parse(localStorage.getItem("Tasks"))
        // i want array to be equal the data come from local storage
        ToDoList.TaskArray=SavedArray
        return SavedArray
    },
    DeleteTask:(element,taskId)=>
    {
       ToDoList.TaskArray.forEach(function(task,index)
       {
        if(task.TaskId===taskId)
        {
            ToDoList.TaskArray.splice(index,1)
            ToDoList.SavaInStorage();
            element.parentNode.parentNode.remove();
            return
        }
       })
       
    },
    GetNewId:()=>
    {
        // this case when we delete all the elements in the array
        if(ToDoList.TaskArray.length===0)
            return 1
        else
            return ToDoList.TaskArray[ToDoList.TaskArray.length-1].TaskId+1;
    },
    ChangeTasks:()=>
    {

    }
}
// we link the button with (SavaTask)function in the runtime
let MyInput=document.getElementById("btnSave")
MyInput.addEventListener("click",ToDoList.SavaTask)

let myInput=document.getElementById("btnChangeTasks")
myInput.onclick=function()
{
    ToDoList.ChangeTasks();
}

// it call in the 1st when the program open
ToDoList.GetDataFromStorage();