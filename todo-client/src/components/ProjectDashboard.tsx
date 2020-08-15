import React, {useEffect, useState, Fragment} from 'react'
import {
    IonContent,
    IonList,
    IonText,
    IonButton,
    IonToolbar,
    IonTitle
} from "@ionic/react"
import {callTasks} from "../dbinteraction"
import Task from "./Task"
import AddTask from "./AddTask"

export interface Props {
    user: {
		name: string
		id: string
		email: string
    }
    setActiveProject: (value: {projectname: string, project_id: string}) => void
    activeProject: {projectname: string, project_id: string}
}
 
const ProjectDashboard : React.FC<Props> = props => {

    //state
    const {user, setActiveProject, activeProject} = props
    
    const [tasks, setTasks] = useState([]) 
    const [editTask, setEditTask] = useState({taskname: "", task_id: "", taskfinished: false})
    const [addTask, setAddTask] = useState<boolean>(false)
    const [editDone, setEditDone] = useState<boolean>(false)
    const [deletingTask, setDeletingTask] = useState<boolean>(false)

    //calls tasks when project is set
    useEffect(() => {
        if (activeProject.project_id === "")
            return

        callProject(user)
    }, [activeProject, addTask, editTask, editDone])

    //functions    
    const callProject = async (user: {
        name: string
        id: string
        email: string
    }) => {
        const callResult = await callTasks(user, activeProject.project_id)     
        setTasks(callResult!.data)      
    }

    return (  
        <IonContent className="ion-text-center">

            <IonToolbar color="tertiary">
                <IonTitle>{activeProject.projectname}</IonTitle>
            </IonToolbar>

            {                
                addTask
                ?
                <AddTask
                    project_id={activeProject.project_id}
                    setAddTask={setAddTask}                      
                />
                :
                <Fragment>
                    <IonText>
                        <h6>Click on each task to set it as "done" or "not done". Swipe left on them to see other options.</h6>
                    </IonText>

                    <IonButton
                        onClick={() => setAddTask(true)}
                    >
                        Add new task
                    </IonButton>
                </Fragment>                
            }            

            <IonList>
                {
                    tasks.map(task => (
                        <Task
                            setEditDone={setEditDone}
                            key={task.task_id}
                            task={task}
                            setEditTask={setEditTask}
                            editTask={editTask}
                            project_id={activeProject.project_id}
                        />
                    ))
                }
            </IonList>
        </IonContent>
    );
}
 
export default ProjectDashboard;