import { useState } from "react"
import{fileReaderPromise} from '../../../../server/src/utils/fileReader'

const UploadFile=({userData, setUserData })=>{
    console.log("Tipo de setUserData:", typeof setUserData);
    const[preview,setPreview]= useState(null)
    const[file,setFile]= useState(null)
    return( 
        <>
        <form onSubmit={(event)=>handleSubmit(event,file,userData,setUserData)} >
            <input type="file" name='image' onChange={(event)=>handleFileChange(event,setFile,setPreview)} />
            <input type="submit" value='Upload' disabled={!file}/>
        </form>
        {preview && <img src={preview} alt='preview' />

        }
        
        </>
    )
}



const handleFileChange=async(event,setFile,setPreview)=>{
    const file= event.target.files[0]
     if(!file)return
    setFile(file)
    try {
        const result= await fileReaderPromise(file)
        setPreview(result)
    } catch (error) {
        console.log(error)
        
    }
    
    
   


   
}
const handleSubmit=async(event,file,userData,setUserData)=>{
    event.preventDefault()
    if(!file){
        console.error('No file selected')
        return
    }
    const formData= new FormData()
    formData.append('image',file)
    
    try {
        const response = await fetch('http://localhost:3000/api/upload',{
            method: 'POST',
            body:formData
        })
        if(!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`)
        }
        const result= await response.json()
        console.log('File uploaded successfully:', result)

        const uploadedImageUrl = result.url;
        console.log(uploadedImageUrl)
        
        setUserData({...userData,image:uploadedImageUrl});
        
       
    } catch (error) { 
        console.log('Error uploading file:', error)
    }
    
}

export default UploadFile