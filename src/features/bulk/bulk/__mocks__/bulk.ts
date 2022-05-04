export const getHeadersMock = jest.fn();
export const getPostUrlMock = jest.fn();
export const getDocumentViewUrlMock = jest.fn().mockResolvedValue({
	documentUrl: 'mock-url',
	documentToken: 'mock-token'
})
export const onCancelMock = jest.fn().mockResolvedValue('some-value')
export const onChangeMock = jest.fn();
export const onCloseMock = jest.fn();
export const onFileRemoveMock = jest.fn().mockResolvedValue('some-value')
export const onFileSuccessMock = jest.fn().mockResolvedValue('some-value')
export const onMetadataSubmitMock = jest.fn().mockResolvedValue('some-value')
