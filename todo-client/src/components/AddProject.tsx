import React, {Fragment, useState} from 'react'
import {
    IonItem,
    IonLabel,
    IonInput,
    IonButton,
    IonAlert,
    IonGrid,
    IonCol,
    IonRow
} from "@ionic/react"
import {saveNewProject} from "../dbinteraction"

export interface Props {
    setAddProject: (value: boolean) => void
    user_id: string
}
  
const AddProject : React.FC<Props> = props => {

    //state
    const {setAddProject, user_id} = props
    const [newProject, setNewProject] = useState<string>("")
    const [emptyName, setEmptyName] = useState<boolean>(false)
    
    const addNewProject = async () => {
        //ADD VALIDATION (no "")
        if (newProject === "") {
            setEmptyName(true)
            return
        }
        
        //create new object with user id
        const finalObject = {
            projectname: newProject,
            user_id: user_id
        }

        //DATABASE
        await saveNewProject(finalObject)

        //STATE TO ""
        setAddProject(false)
    }

    return ( 
        <Fragment>

            <IonAlert 				
				isOpen={emptyName} 
				message="The project must have a name!"
				buttons={[{text: "Okay", handler: () => setEmptyName(false)}]}
			/>
            
            <IonItem>
                <IonLabel position="floating">Project name</IonLabel>
                <IonInput
                    autofocus
                    value={newProject}
                    onIonChange={(e: CustomEvent) => setNewProject(e.detail.value)}
                ></IonInput>
            </IonItem>
            
            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton size="small" color="success" onClick={addNewProject}>Save</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton size="small" color="danger" onClick={() => setAddProject(false)}>Cancel</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
            
           
        </Fragment>
    );
}
 
export default AddProject;