import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

// add cloudinary cred
cloudinary.config({ 
    cloud_name: 'dt6iftysw', 
    api_key: '358665995111157', 
    api_secret: 'DPv-NXNPuDyqUxP2fOIHZ58hlWw'
});



const uploadOnCloudinary = async (localPath)=>{
    try {
        if(!localPath) return null

        const response = await cloudinary.uploader.upload(
            localPath, {
                resource_type: 'auto'
            }
        )

        fs.unlinkSync(localPath)
        return response;

    } catch (error) {
        fs.unlinkSync(localPath)
        return null
    }
}

export {uploadOnCloudinary}