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
import {editAndSaveProject} from "../dbinteraction"

export interface Props {
    editProject: {
		projectname: string
		project_id: string		
    }
    setEditProject: (value: {
        projectname: string
		project_id: string	
    }) => void
    user_id: string
}
 
const EditProject : React.FC<Props> = props => {

    const {editProject, setEditProject, user_id} = props
    
    const handleChange = (e: CustomEvent) => {
        const editedProject = {...editProject, projectname: e.detail.value}
        setEditProject(editedProject)        
    }

    const saveProject = async () => {
        //ADD VALIDATION (no "")
        if (editProject.projectname === "") {
            setEditProject({projectname: "", project_id: ""})
            return
        }
        
        //create new object with user id
        const finalObject = {
            _id: editProject.project_id,
            projectname: editProject.projectname,
            user_id: user_id
        }

        //DATABASE
        await editAndSaveProject(finalObject)

        //STATE TO ""
        setEditProject({projectname: "", project_id: ""})
    }

    return (  
        <Fragment>
            
            <IonItem>
                <IonLabel position="floating">Project name</IonLabel>
                <IonInput
                    autofocus
                    value={editProject.projectname}
                    onIonChange={handleChange}
                ></IonInput>
            </IonItem>

            <IonGrid>
                <IonRow>
                    <IonCol>
                        <IonButton size="small" color="success" onClick={saveProject}>Save</IonButton>
                    </IonCol>
                    <IonCol>
                        <IonButton size="small" color="danger" onClick={() => setEditProject({projectname: "", project_id: ""})}>Cancel</IonButton>
                    </IonCol>
                </IonRow>
            </IonGrid>
               
        </Fragment>
    );
}
 
export default EditProject ;