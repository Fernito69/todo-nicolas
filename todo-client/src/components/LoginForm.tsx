import React, {useState} from 'react';
import {logIn} from "../dbinteraction"

import { 
	IonInput, 
	IonGrid, 
	IonCol, 
	IonRow,
	IonLabel,
	IonItem,
	IonButton,
	IonContent
} from "@ionic/react"
import { AxiosResponse } from 'axios';

interface LoginProps {
	setLoginError: (value: boolean) => void
	setErrorMsg: (value: string) => void
	setAuth: (value: boolean) => void
	setUser: (value: {
		name: string
		id: string
		email: string
	}) => void
}

const LoginForm: React.FC<LoginProps> = props => {

	const {setLoginError, setErrorMsg, setAuth, setUser} = props

	//state
	const [userFields, setUserFields] = useState({
        email: "",
        password: "",
	})

	const {email, password} = userFields

	//handles
	const handleChangeEmail = (e: CustomEvent) => {
		setUserFields({
			...userFields,
			email: e.detail.value
		})
	}

	const handleChangePassword = (e: CustomEvent) => {
		setUserFields({
			...userFields,
			password: e.detail.value
		})
	}

	//user logs in
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		const loginResult: AxiosResponse | undefined = await logIn({email, password})
		setErrorMsg(loginResult!.data.msg)
		setLoginError(!loginResult!.data.auth)		
		setAuth(loginResult!.data.auth)
		setUser({
			name: loginResult!.data.user_name,
			id: loginResult!.data.user_id,
			email: email,
		})
	}
	
	//render
	return (
		<IonContent className="ion-padding">
			<form onSubmit={handleSubmit}>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonItem>
								<IonLabel position="floating">User email</IonLabel>
								<IonInput 
									type="email"
									value={email}
									onIonChange={handleChangeEmail}
								></IonInput>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonItem>
							<IonLabel position="floating">Password</IonLabel>
								<IonInput 
									type="password"
									value={password}
									onIonChange={handleChangePassword}
								></IonInput>
							</IonItem>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol className="ion-text-center">
							<IonButton 
								type="submit"
								disabled={email === "" || password === ""}
							>
								Log in
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>				
			</form>
		</IonContent>
		
	);
};

export default LoginForm;
