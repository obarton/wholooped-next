import * as contentful from "contentful-management"

async function Connect() {
    const client = await contentful.createClient({
      accessToken: process.env.CONTENTFUL_MANAGEMENT_ACCESS_TOKEN || ""
    })
  
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE_ID || "")
    return await space.getEnvironment('master');
  }

export const saveSelectedContentfulPhotoAsset = async (selectedPhotoFile: any) => {
    if (selectedPhotoFile && selectedPhotoFile != {}) {
        const env = await Connect();
        const title = selectedPhotoFile?.name;
        const description = "description";
        const contentType = "image/*";
        const fileName = selectedPhotoFile?.name;
        const file = selectedPhotoFile

        const publishContentResponse = await env.createAssetFromFiles({
          fields: {
            title: {
              'en-US': title
            },
            description: {
              'en-US': description
            },
            file: {
              'en-US': {
                contentType: contentType,
                fileName: fileName,
                file: file
              }
            }
          }
        })
        .then((asset) => asset.processForAllLocales())
        .then((asset) => asset.publish())
        .catch(console.error)

        return (publishContentResponse as any).sys.id;
    }

    return null;
}