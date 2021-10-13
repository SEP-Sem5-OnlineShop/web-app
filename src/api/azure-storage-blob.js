import { BlobServiceClient, ContainerClient } from '@azure/storage-blob'

const SASS_TOKEN = process.env.REACT_APP_BLOB_STORAGE_ACCESS_TOKEN || ""
const STORAGE_ACCOUNT_NAME = process.env.REACT_APP_BLOB_STORAGE_ACCOUNT_NAME || ""
const CONTAINER_NAME = process.env.REACT_APP_CONTAINER_NAME || ""

export const azure_url = `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SASS_TOKEN}`

export const uploadFileToBlob = async (file) => {
  console.log(SASS_TOKEN)

  if (!file) return [];

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(azure_url);

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(CONTAINER_NAME);
  // console.log(containerClient)
  // try {
  //   await containerClient.createIfNotExists({
  //     access: 'blob',
  //   });
  // }
  // catch(e) {
  //   console.log('Container already exists!')

  // upload file
  return await createBlobInContainer(containerClient, file);

  // get list of blobs in container
  // return getBlobsInContainer(containerClient);
};

const createBlobInContainer = async (containerClient, file) => {

  // create blobClient for container
  // console.log(fileName, file)
  const blobClient = containerClient.getBlockBlobClient(file.name);

  // set mimetype as determined from browser with file upload control
  const options = {
    blobHTTPHeaders: { blobContentType: file.type },
    onprogress: (e) => {
      console.log(e)
    }
  };

  // upload file
  return await blobClient.uploadBrowserData(file, options);
}

export const deleteBlobFile = async (fileName) => {
  try {
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(azure_url);

    // get Container - full public read access
    const containerClient = blobService.getContainerClient(CONTAINER_NAME);
    const blobClient = containerClient.getBlockBlobClient(fileName);
    return await blobClient.delete();
  }
  catch (e) {

  }
}

// return list of blobs in container to display
export const getBlobsInContainer = async () => {

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(azure_url);

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(CONTAINER_NAME);

  const returnedBlobUrls = [];

  // get list of blobs in container
  // eslint-disable-next-line
  for await (const blob of containerClient.listBlobsFlat()) {
    // if image is public, just construct URL
    returnedBlobUrls.push(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${blob.name}`
    );
  }
  return returnedBlobUrls;
}

export const getFileUrl = (fileName) => {
  return `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${CONTAINER_NAME}/${fileName}`
}

export const getFile = async (fileName) => {

  // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
  const blobService = new BlobServiceClient(azure_url);

  // get Container - full public read access
  const containerClient = blobService.getContainerClient(CONTAINER_NAME);
  const blobClient = containerClient.getBlobClient(fileName)
  const downloadBlockBlobResponse = await blobClient.download()
  return downloadBlockBlobResponse

}