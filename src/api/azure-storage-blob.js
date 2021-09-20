import { BlobServiceClient, ContainerClient} from '@azure/storage-blob'
import { v4 as uuidv4 } from 'uuid'

const SASS_TOKEN = process.env.REACT_APP_BLOB_STORAGE_ACCESS_TOKEN || ""
const STORAGE_ACCOUNT_NAME = process.env.REACT_APP_BLOB_STORAGE_ACCOUNT_NAME || ""
const CONTAINER_NAME = process.env.REACT_APP_CONTAINER_NAME || ""

export const uploadFileToBlob = async (file) => {
    console.log(SASS_TOKEN)
  
    if (!file) return [];
  
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SASS_TOKEN}`
    );
  
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
    // }
  
    // upload file
    await createBlobInContainer(containerClient, file);
  
    // get list of blobs in container
    // return getBlobsInContainer(containerClient);
};

const createBlobInContainer = async (containerClient, file) => {
  
    // create blobClient for container
    const fileName = `${uuidv4()}.${file.type.split("/")[1]}`
    // console.log(fileName, file)
    const blobClient = containerClient.getBlockBlobClient(fileName);
  
    // set mimetype as determined from browser with file upload control
    const options = { blobHTTPHeaders: { blobContentType: file.type } };
  
    // upload file
    await blobClient.uploadBrowserData(file, options);
}

// return list of blobs in container to display
const getBlobsInContainer = async (containerClient) => {

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