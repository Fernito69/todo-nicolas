import React, {Fragment, useState} from 'react';
import {
    IonAlert,
    IonItem,
    IonLabel,
    IonInput,
    IonGrid,
    IonRow,
    IonCol,
    IonButton
} from "@ionic/react"
import {saveNewTask} from "../dbinteraction"

export interface Props {
    project_id: string
    setAddTask: (value: boolean) => void
}
 
const AddTask : React.FC<Props> = props => {

    //state
    const {setAddTask, project_id} = props
    const [newTask, setNewTask] = useState<string>("")
    const [emptyName, setEmptyName] = useState<boolean>(false)

    //functions
    const addNewTask = async () => {
        //ADD VALIDATION (no "")
        if (newTask === "") {
            setEmptyName(true)
            return
        }
        
        //create new object with user id
        const finalObject = {
            taskname: newTask,
            project_id: project_id
        }

        //DATABASE
        await saveNewTask(finalObject)

        //STATE TO ""
        setAddTask(false)
    }

    return (  
        <Fragment>

            <IonAlert 				
				isOpen={emptyName} 
				message="The task must have a name!"
				buttons={[{text: "Okay", handler: () => setEmptyName(false), role: 'cancel'}]}
			/>
            
            <IonItem>
                <IonLabel position="floating">Task name</IonLabel>
                <IonInput
                    autofocus
                    value={newTask}
                    onIonChange={(e: CustomEvent) => setNewTask(e.detail.value)}
                ></IonInput>
            </IonItem>
            
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton size="small" color="success" onClick={addNewTask}>Save</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton size="small" color="danger" onClick={() => setAddTask(false)}>Cancel</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>            
           
        </Fragment>
    );
}
 
export default AddTask;