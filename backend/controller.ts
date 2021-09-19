// import express from 'express';
// import { TypedKnex } from '@wwwouter/typed-knex';

// export const inforingApi = process.env.INFORING_API || 'https://bmidms.amsterdam.nl/api/v1.0/';

// // async function getObject(objectId: string): Promise<any> {
// // 	const typedKnex = new TypedKnex(database);

// // 	return await typedKnex
// // 		.query(ZxyObject)
// // 		.innerJoinColumn((i) => i.objectType)
// // 		.where((i) => i.id, objectId)
// // 		.select((i) => [i.code, i.externalRefId, i.objectType.dmsCategory])
// // 		.getSingle();
// // }

// export async function getDocuments(req: express.Request, res: express.Response) {
// 	try {
// 		const dmsDocuments = await getDocumentsFromDms(
// 			req.params.objectId,
// 			(req.query['query'] as string) || '',
// 			req.query.surveyId as string,
// 		);
// 		if (dmsDocuments.length === 0) {
// 			return res.status(404).send({ code: 'NO_DATA_AVAILABLE' });
// 		}
// 		return res.send(dmsDocuments);
// 	} catch (error) {
// 		console.error('Api call failed', error);
// 		return res.status(500).send({ code: 'API_CALL_FAILED' });
// 	}
// }

// export async function getDocumentsFromDms(objectId: string, query: string, surveyId?: string): Promise<IDmsDocument[]> {
// 	const object = await getObject(objectId);
// 	let url = inforingApi + 'documents?';

// 	const dmsCategory = object.objectType.dmsCategory ? object.objectType.dmsCategory.toLowerCase() : 'bruggen';

// 	if (object.code && object.code !== '') {
// 		url += 'code=' + object.code;
// 	} else {
// 		return [];
// 	}

// 	if (surveyId) {
// 		url += `&metadata=[{"key":"survey-id-${dmsCategory}","value":"${surveyId}"}]`;
// 	}

// 	// Not using Axios here on purpose. The responses for this request get rather large. Axios intermittently
// 	// truncates the string causing JSON.parse to fail 🤯
// 	const response = await fetch(url, {
// 		headers: inforingApiKeyResolver.getAuthorizationHeader(),
// 		timeout: 5000,
// 	});

// 	if (response.status !== 200) {
// 		return [];
// 	}

// 	const data = (await response.json()) as any;
// 	const dmsDocuments: IDmsDocument[] = [];

// 	if (data) {
// 		for (let i = 0; i < data.length; i++) {
// 			if (i > 199) {
// 				break;
// 			}
// 			const item: {
// 				guid: string;
// 				name: string;
// 				pid: string;
// 				metadata: IDocumentMetadata[];
// 				download_url: string;
// 			} = data[i];

// 			let tekeningdocumentomschrijving =
// 				item.metadata.find((x) => x.key === 'tekeningdocumentomschrijving-' + dmsCategory)?.value || '';
// 			if (dmsCategory === 'bruggen') {
// 				tekeningdocumentomschrijving = item.metadata.find((x) => x.key === 'tekeningdocumentomschrijving')?.value || '';
// 			} else if (dmsCategory === 'sluizen') {
// 				tekeningdocumentomschrijving =
// 					item.metadata.find((x) => x.key === 'documentomschrijving-' + dmsCategory)?.value || '';
// 			}
// 			dmsDocuments.push({
// 				guid: item.guid,
// 				name: item.name,
// 				pid: item.pid || '',
// 				url: '/api/inforing/documents/' + item.guid + '/download',
// 				objectkaartomschrijving:
// 					item.metadata.find((x) => x.key === 'objectkaartomschrijving-' + dmsCategory)?.value || '',
// 				'ils-3': item.metadata.find((x) => x.key === 'ils-3-' + dmsCategory)?.value ? true : false,
// 				'ils-2': item.metadata.find((x) => x.key === 'ils-2-' + dmsCategory)?.value ? true : false,
// 				tekeningdocumentomschrijving: tekeningdocumentomschrijving,
// 				jaar: item.metadata.find((x) => x.key === 'uitvoeringsdatum-monitoring')?.value || '',
// 				'document-type': item.metadata.find((x) => x.key === 'document-type')?.value || '',
// 				'jaar-notitie': item.metadata.find((x) => x.key === 'jaar-' + dmsCategory)?.value || '',
// 				'documentomschrijving-notitie':
// 					item.metadata.find((x) => x.key === 'documentomschrijving-' + dmsCategory)?.value || '',
// 				'document-type-notitie': item.metadata.find((x) => x.key === 'document-type-' + dmsCategory)?.value || '',
// 				bron: item.metadata.find((x) => x.key === 'bron-' + dmsCategory)?.value || '',
// 				'documentomschrijving-kademuren':
// 					item.metadata.find((x) => x.key === 'documentomschrijving-kademuren')?.value || '',
// 				'type-meting-monitoring': item.metadata.find((x) => x.key === 'type-meting-monitoring')?.value || '',
// 				'herhalingsmeting-monitoring': item.metadata.find((x) => x.key === 'herhalingsmeting-monitoring')?.value || '',
// 				'herhalingsmeting-panden-monitoring':
// 					item.metadata.find((x) => x.key === 'herhalingsmeting-panden-monitoring')?.value || '',
// 				volgnummer: item.metadata.find((x) => x.key === 'volgnummer-' + dmsCategory)?.value || '',
// 			});
// 		}
// 		dmsDocuments.sort((a, b) => {
// 			const volgnummerA = parseInt(a.volgnummer, 10);
// 			const volgnummerB = parseInt(b.volgnummer, 10);

// 			if (a.jaar === b.jaar) {
// 				if (a.tekeningdocumentomschrijving === b.tekeningdocumentomschrijving) {
// 					return volgnummerA < volgnummerB ? -1 : volgnummerA > volgnummerB ? 1 : 0;
// 				} else {
// 					return a.tekeningdocumentomschrijving < b.tekeningdocumentomschrijving ? -1 : 1;
// 				}
// 			} else {
// 				return a.jaar > b.jaar ? -1 : 1;
// 			}
// 		});
// 	}

// 	return dmsDocuments;
// }
