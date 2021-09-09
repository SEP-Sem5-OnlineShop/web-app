import { BlobServiceClient, ContainerClient} from '@azure/storage-blob'
import dotenv from 'dotenv'

dotenv.config()

const SASS_TOKEN = process.env.BLOB_STORAGE_ACCESS_TOKEN || "sp=r&st=2021-09-09T09:00:17Z&se=2021-09-09T17:00:17Z&spr=https&sv=2020-08-04&sr=c&sig=NTX8B4G30vc09BR1znGqTUzWiqR1jtIx%2BGveGHOPlYU%3D"
const containerName = `imagecontainer`;
const STORAGE_ACCOUNT_NAME = process.env.BLOB_STORAGE_ACCOUNT_NAME || "ontheway";

export const uploadFileToBlob = async (file) => {
    if (!file) return [];
  
    // get BlobService = notice `?` is pulled out of sasToken - if created in Azure portal
    const blobService = new BlobServiceClient(
      `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/?${SASS_TOKEN}`
    );
  
    // get Container - full public read access
    const containerClient = blobService.getContainerClient(containerName);
    await containerClient.createIfNotExists({
      access: 'container',
    });
  
    // upload file
    await createBlobInContainer(containerClient, file);
  
    // get list of blobs in container
    return getBlobsInContainer(containerClient);
};

const createBlobInContainer = async (containerClient, file) => {
  
    // create blobClient for container
    const blobClient = containerClient.getBlockBlobClient(file.name);
  
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
        `https://${STORAGE_ACCOUNT_NAME}.blob.core.windows.net/${containerName}/${blob.name}`
      );
    }
  
    return returnedBlobUrls;
}