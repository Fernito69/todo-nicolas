import React, { Fragment } from 'react'
import {
    IonItemSliding,
    IonItem,
    IonText,
    IonButton,
    IonItemOption,
    IonItemOptions,
    IonIcon
} from "@ionic/react"
import { trashOutline, createOutline } from 'ionicons/icons'
import {editAndSaveTask} from "../dbinteraction"
import EditTask from "./EditTask"

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
}
 
const Task : React.FC<Props> = props => {

    //state
    const {task, project_id, editTask, setEditTask, setEditDone} = props

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

    return (  
        <Fragment>
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
                        <IonItemOption color="danger" onClick={() => {}}>
                            <IonIcon icon={trashOutline} />
                        </IonItemOption>
                    </IonItemOptions>
                </IonItemSliding>
            }
        </Fragment>
    );
}
 
export default Task;