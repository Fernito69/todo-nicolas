import React, {useState, } from 'react';
import { 
	IonContent, 
	IonHeader, 
	IonPage, 
	IonTitle, 
	IonToolbar, 
	IonAlert, 
	IonText,
	IonButton,
	IonIcon
} from '@ionic/react';
import LoginForm from '../components/LoginForm';
import Dashboard from '../components/Dashboard';
import ProjectDashboard from '../components/ProjectDashboard';
import { logOut as logOutIcon, caretBackOutline } from "ionicons/icons" 

const Home: React.FC = (props) => {

	//state
	const [loginError, setLoginError] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>("")
	const [auth, setAuth] = useState<boolean>(false)
	const [user, setUser] = useState<{
		name: string
		id: string
		email: string
	}>({name: "", id: "", email: ""})
	const [activeProject, setActiveProject] = useState<{
		projectname: string 
		project_id: string
	}>({projectname: "", project_id: ""})

	//functions
	const clearError = () => {
		setLoginError(false)
		setErrorMsg("")
	}

	const logOut = () => {
		setAuth(false)
		setUser({name: "", id: "", email: ""})
		setActiveProject({projectname: "", project_id: ""})
	}

	const backToProjects = () => {
		setActiveProject({projectname: "", project_id: ""})
	}

	return (
		<IonPage>
			<IonAlert 				
				isOpen={loginError} 
				message={errorMsg}
				buttons={[{text: "Okay", handler: clearError}]}
			/>

			<IonHeader>
				
				<IonToolbar color="primary">
					<IonTitle slot="start"><h1>To-do list</h1></IonTitle>
					{
						auth &&
						<IonButton 
							fill="clear" 
							color="light" 
							slot="end"
							onClick={logOut}
						>
							<IonIcon slot="start" icon={logOutIcon} />
							Log out
						</IonButton>
					}					
				</IonToolbar>

				<IonToolbar color="secondary">
					{
					auth 
					?
					<IonTitle size="small">Welcome {user.name}</IonTitle>
					:
					<IonTitle size="small">Log in</IonTitle>
					}
					{
						auth && activeProject.project_id !== "" &&
						<IonButton 
							fill="clear" 
							color="light" 
							slot="end"
							size="small"
							onClick={backToProjects}
						>
							<IonIcon slot="start" icon={caretBackOutline} />
							To projects
						</IonButton>
					}		
				</IonToolbar>

			</IonHeader>

			<IonContent className="ion-padding">
				
				{
					//renders LOGIN 
					!auth &&
					<LoginForm 
					setLoginError={setLoginError}
					setErrorMsg={setErrorMsg}
					setAuth={setAuth}
					setUser={setUser}
					/>
				}

				{
					//renders DASHBOARD
					auth && !activeProject.project_id &&
					<Dashboard 
						user={user}
						auth={auth}
						setActiveProject={setActiveProject}
					/>
				}

				{
					//renders PROJECT DASHBOARD
					auth && activeProject.project_id &&
					<ProjectDashboard
						user={user}
						activeProject={activeProject}
						setActiveProject={setActiveProject}
					/>
				}				

			</IonContent>

		</IonPage>
	);
};

export default Home;
