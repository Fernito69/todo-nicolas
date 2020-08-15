import React, { Fragment, useState } from 'react'
import {
    IonItemSliding,
    IonItem,
    IonItemOption,
    IonItemOptions,
    IonIcon,
    IonAlert
} from "@ionic/react"
import EditProject from "./EditProject"
import { trashOutline, createOutline } from 'ionicons/icons'
import {removeProject} from "../dbinteraction"

export interface Props {
    project: {
		projectname: string
		project_id: string		
    }
    setActiveProject: (value: {projectname: string, project_id: string}) => void
    setEditProject: (value: {projectname: string, project_id: string}) => void
    editProject: {
		projectname: string
		project_id: string		
    }
    user_id: string
    setDeletingProject: (value: boolean) => void
}
 
const Project : React.FC<Props> = props => {

    //state
    const {project, setActiveProject, setEditProject, editProject, user_id, setDeletingProject} = props
    const [confirmDelete, setConfirmDelete] = useState<boolean>(false)

    const deleteProject = async () => {
        setDeletingProject(true)
        await removeProject(project.project_id)
        setDeletingProject(false)
    }

    return (  
        <Fragment>

            <IonAlert 				
				isOpen={confirmDelete} 
				message="Are you sure? This action cannot be undone"
                buttons={[{text: "Okay", handler: () => deleteProject()},
                          {text: "Cancel", handler: () => setConfirmDelete(false)}]}
			/>

            {
                editProject.project_id === project.project_id 
                ?
                <EditProject 
                    editProject={editProject}
                    setEditProject={setEditProject}
                    user_id={user_id}
                />
                :
                <IonItemSliding>
                    <IonItem onClick={() => setActiveProject(project)}>
                        {project.projectname}
                    </IonItem>
                    <IonItemOptions side="end">
                        <IonItemOption color="success" onClick={() => setEditProject(project)}>
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
 
export default Project;