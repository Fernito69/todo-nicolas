import React, {useState, Fragment } from 'react';
import { 
	IonContent, 
	IonHeader, 
	IonPage, 
	IonTitle, 
	IonToolbar, 
	IonAlert, 
	IonButton,
	IonIcon,
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
				</IonToolbar>

				{
				auth 
				?
				<IonToolbar color="secondary">
				<IonTitle size="small">Welcome {user.name}</IonTitle>
					<IonButton 
						fill="clear" 
						color="light" 
						slot="end"
						onClick={logOut}
					>
						<IonIcon slot="start" icon={logOutIcon} />
						Log out
					</IonButton>
				</IonToolbar>
				:
				<IonToolbar color="secondary">
					<IonTitle size="small">Log in</IonTitle>
				</IonToolbar>
				}	

			</IonHeader>
				
			{
				//renders LOGIN 
				!auth &&
				<IonContent>
					<LoginForm 
					setLoginError={setLoginError}
					setErrorMsg={setErrorMsg}
					setAuth={setAuth}
					setUser={setUser}
					/>
				</IonContent>
			}

			{
				//renders DASHBOARD
				auth && !activeProject.project_id &&
				<IonContent>
					<Dashboard 
						user={user}
						auth={auth}
						setActiveProject={setActiveProject}
					/>
				</IonContent>
			}

			{
				//renders PROJECT DASHBOARD
				auth && activeProject.project_id &&
				<Fragment>
					<IonToolbar color="medium">
						<IonTitle size="small">{activeProject.projectname}</IonTitle>
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
					</IonToolbar>
					
					<ProjectDashboard
						user={user}
						activeProject={activeProject}
						setActiveProject={setActiveProject}
					/>
					
				</Fragment>
			}				

		</IonPage>
	);
};

export default Home;
