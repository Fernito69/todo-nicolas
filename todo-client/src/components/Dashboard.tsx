import React, {Fragment, useEffect, useState} from 'react'
import {
    IonItem, 
    IonItemSliding, 
    IonList,
    IonItemOptions, 
    IonItemOption, 
    IonLabel, 
    IonContent, 
    IonButton,
    IonText
} from "@ionic/react"
import {callProjects} from "../dbinteraction"
import Project from "./Project"
import AddProject from "./AddProject"

export interface Props {
    user: {
		name: string
		id: string
		email: string
    }
    auth: boolean
    setActiveProject: (value: {projectname: string, project_id: string}) => void
}
 
const Dashboard  : React.FC<Props> = props => {

    //state
    const {user, auth, setActiveProject} = props
    
    const [projects, setProjects] = useState([])    
    const [editProject, setEditProject] = useState({projectname: "", project_id: ""})
    const [addProject, setAddProject] = useState<boolean>(false)
    const [deletingProject, setDeletingProject] = useState<boolean>(false)

    //calls projects when user is set
    useEffect(() => {
        if (user.id === "")
            return

        call(user)
    }, [user, editProject, addProject, deletingProject])

    const call = async (user: {
		name: string
		id: string
		email: string
	}) => {
        const loginResult = await callProjects(user)
        setProjects(loginResult!.data)
    }

    return (  
        <IonContent className="ion-text-center">

            {
                addProject
                ?
                <AddProject 
                    user_id={user.id}
                    setAddProject={setAddProject}                    
                />
                :
                <Fragment>
                    <IonText>
                        <h6>Click on your projects to access them. Swipe left on them to see other options.</h6>
                    </IonText>

                    <IonButton
                        onClick={() => setAddProject(true)}
                    >
                        Add new project
                </IonButton>
                </Fragment>
            }
            

            <IonList>
                {
                    projects.map(project => (
                        <Project
                            user_id={user.id}
                            key={project.project_id}
                            project={project}
                            setActiveProject={setActiveProject} 
                            setEditProject={setEditProject} 
                            editProject={editProject}
                            setDeletingProject={setDeletingProject}
                        />
                    ))
                }
            </IonList>
        </IonContent>
    );
}
 
export default Dashboard;