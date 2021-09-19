// import express from 'express';

// export interface ISessionUser {
// 	emailAddress: string;
// 	firstName: string;
// 	id: string;
// 	lastName: string;
// 	loggedIn: boolean;
// 	role: string;
// 	companyId: string;
// 	token: string;
// 	language: string;
// 	isClient: boolean;
// 	isDemoAccount: boolean;
// 	isReadOnly: boolean;
// 	isAccountManager: boolean;
// 	isConfigurationManager: boolean;
// 	isContractManager: boolean;
// 	isTempLogin: boolean;
// 	tempSurveyId: string;
// 	useNen2767Form: boolean;
// 	useBatches: boolean;
// 	customerVersion: 'ronik' | 'amsterdam' | 'zxy';
// 	usePointCloud: boolean;
// 	isSsoLogin: boolean;
// 	externalUserId?: string;
// 	accessToken?: string;
// 	isWebGL1User: boolean;
// 	clientName: string;
// }

// class InforingApiKeyResolver {
// 	private readonly readonlyApiKey = process.env.INFORING_READONLY_API_KEY || null;
// 	private readonly writeApiKey = process.env.INFORING_WRITE_API_KEY || null;

// 	private user: ISessionUser;

// 	public setUser(user: ISessionUser) {
// 		this.user = user;
// 	}

// 	public getAuthorizationHeader() {
// 		if (this.user.isSsoLogin) {
// 			return { Authorization: `Bearer ${this.user.accessToken}` };
// 		}

// 		return { 'x-api-token': this.user.isReadOnly ? this.readonlyApiKey : this.writeApiKey };
// 	}
// }

// const inforingApiKeyResolver = new InforingApiKeyResolver();

// export async function resolveInforingApiKeyMiddleware(req: express.Request, res: express.Response, next: Function) {
// 	if (req.session && req.session.user) {
// 		inforingApiKeyResolver.setUser(req.session.user);
// 	}

// 	return next();
// }

// export default inforingApiKeyResolver;
