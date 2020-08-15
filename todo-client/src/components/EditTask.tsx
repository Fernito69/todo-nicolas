import React, {Fragment, useState} from 'react'
import { 
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonGrid,
    IonCol,
    IonRow
} from '@ionic/react'
import {editAndSaveTask} from "../dbinteraction"

export interface Props {
    editTask: {
		taskname: string
        task_id: string		
        taskfinished: boolean
    }
    setEditTask: (value: {
        taskname: string
        task_id: string	
        taskfinished: boolean
    }) => void
    project_id: string
}
 
const EditTask : React.FC<Props> = props => {

    const {editTask, setEditTask, project_id} = props
    
    const handleChange = (e: CustomEvent) => {
        const editedTask = {...editTask, taskname: e.detail.value}
        setEditTask(editedTask)        
    }

    const saveTask = async () => {
        //ADD VALIDATION (no "")
        if (editTask.taskname === "") {
            //cancels edition
            setEditTask({taskname: "", task_id: "", taskfinished: false})
            return
        }
        
        //create new object with project id
        const finalObject = {
            _id: editTask.task_id,
            taskname: editTask.taskname,
            project_id: project_id,
            taskfinished: editTask.taskfinished
        }

        //DATABASE
        await editAndSaveTask(finalObject)

        //STATE TO ""
        setEditTask({taskname: "", task_id: "", taskfinished: false})
    }

    return (  
        <Fragment>
            
            <IonItem>
                <IonLabel position="floating">Project name</IonLabel>
                <IonInput
                    autofocus
                    value={editTask.taskname}
                    onIonChange={handleChange}
                ></IonInput>
            </IonItem>

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton size="small" color="success" onClick={saveTask}>Save</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton size="small" color="danger" onClick={() => setEditTask({taskname: "", task_id: "", taskfinished: false})}>Cancel</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
               
        </Fragment>
    );
}
 
export default EditTask;