import React, { Fragment, useState } from 'react'
import {
    IonItemSliding,
    IonItem,
    IonText,
    IonButton,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonAlert
} from "@ionic/react"
import { trashOutline, createOutline } from 'ionicons/icons'
import {editAndSaveTask} from "../dbinteraction"
import EditTask from "./EditTask"
import {removeTask} from "../dbinteraction"

export interface Props {
    task: {
        taskname: string
        taskfinished: boolean
        task_id: string		
    }
    project_id: string
    setEditTask: (value: {taskname: string, task_id: string, taskfinished: boolean}) => void
    editTask: {
		taskname: string
        task_id: string		
        taskfinished: boolean
    }
    setEditDone: (value: boolean) => void
    setDeletingTask: (value: boolean) => void
}
 
const Task : React.FC<Props> = props => {

    //state
    const {task, project_id, editTask, setEditTask, setEditDone, setDeletingTask} = props
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    //functions
    const setDone = async () => {

        setEditDone(true)

        const finalObject = {
            _id: task.task_id,
            taskname: task.taskname,
            project_id: project_id,
            taskfinished: !task.taskfinished
        }
        
        await editAndSaveTask(finalObject)

        setEditDone(false)    
    }

    const deleteTask = async () => {
        setDeletingTask(true)
        await removeTask(task.task_id)
        setDeletingTask(false)
    }

    return (  
        <Fragment>

            <IonAlert 				
				isOpen={confirmDelete} 
				message="Are you sure? This action cannot be undone"
                buttons={[{text: "Okay", handler: () => deleteTask()},
                          {text: "Cancel", handler: () => setConfirmDelete(false), role: 'cancel'}]}
            />

            {
                editTask.task_id === task.task_id 
                ?
                <EditTask
                    editTask={editTask}
                    setEditTask={setEditTask}
                    project_id={project_id}
                />
                :
                <IonItemSliding>
                    <IonItem>
                        <IonText>{task.taskname}</IonText>
                        {
                            task.taskfinished
                            ?
                            <IonButton 
                                slot="end" 
                                size="small" 
                                color="success" 
                                onClick={() => setDone()}
                            >Done</IonButton>
                            :
                            <IonButton 
                                slot="end" 
                                size="small" 
                                color="danger"
                                onClick={() => setDone()}
                            >Not done</IonButton>
                        }
                    </IonItem>
                    <IonItemOptions side="end">
                        <IonItemOption color="success" onClick={() => setEditTask(task)}>
                            <IonIcon icon={createOutline} />
                        </IonItemOption>
                        <IonItemOption color="danger" onClick={() => setConfirmDelete(true)}>
                            <IonIcon icon={trashOutline} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            }
        </Fragment>
    );
}
 
export default Task;