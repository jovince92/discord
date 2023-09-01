import { ChangeEventHandler, FC, FormEventHandler, useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle } from '../ui/dialog';
import { useForm } from '@inertiajs/react';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { AlertCircleIcon, UploadCloud } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { FileUploader } from 'react-drag-drop-files';

const fileTypes = ["JPG", "PNG", "WEBP",'JPEG'];

const InitialModal:FC = () => {
    const [imgPreview,setImgPreview] = useState("");
    const [open,setOpen]=useState(true);
    const { data, setData, post, processing, errors, reset } = useForm<{name:string,image:File|undefined}>({
        name: '',
        image: undefined,
    });

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();
        post(route('server.store'),{
            onSuccess:()=>setOpen(false)
        });
    }

    const onImageSelect:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {target}=e;
        if(!target.files||target.files?.length<1) return null;
        const file=target.files[0];
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
    }

    const onFileDrop = (file:File) =>{
        const url = URL.createObjectURL(file) ;
        setData('image',file);
        setImgPreview(url);
    }
    
    return (
        <Dialog open={open}>   
            <DialogContent className='p-0 overflow-auto'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Create a Server</DialogTitle>
                    <DialogDescription className='text-center'>Provide Server Name and Image...</DialogDescription>
                </DialogHeader>
                <form id='server' onSubmit={onSubmit} className='flex flex-col space-y-7'>
                    <div className='flex flex-col space-y-7 px-5'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            {(errors.name||errors.image)&&<FileErrorAlert messages={[errors?.name||"",errors?.image||""]} />}
                            <FileUploader hoverTitle="Upload or drop a file right here" handleChange={onFileDrop} name="file" types={fileTypes}>
                                <label htmlFor="image" className='flex flex-col items-center justify-center cursor-pointer p-6'>
                                    {!imgPreview?<UploadCloud  size={150} />:<img src={imgPreview} width={150} height={150} />}
                                    <p>Click to Select an Image</p>
                                    <p>Or Drag and Drop Images Here...</p>
                                </label>
                            </FileUploader>
                            <input accept=".png,.jpeg,.jpg,.webp," onChange={onImageSelect} type="file" hidden id='image' />
                        </div>
                        <div className='flex flex-col space-y-1'>
                            <Label className='uppercase text-xs font-bold'>Server Name</Label>
                            <Input value={data.name} onChange={({target})=>setData('name',target.value)} required disabled={processing} className='border-0 focus-visible:!ring-0 focus-visible:!ring-offset-0' placeholder='Server Name....' />    
                        </div>
                        
                    </div>
                </form>
                <DialogFooter className='px-5 py-3.5'>
                    <Button  disabled={processing} form='server' className='ml-auto'>Create Server</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default InitialModal


const FileErrorAlert:FC<{messages:string[]}> = ({messages}) =>{
    
    return(
        <Alert variant="destructive">
            <AlertCircleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription className='flex flex-col'>
                {messages.map(msg=>msg.length>0 && <span key={msg}>{msg}</span>)}
            </AlertDescription>
        </Alert>
    );
}