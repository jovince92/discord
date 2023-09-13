import { ChangeEventHandler, FC, FormEventHandler, useState, useEffect, useMemo, ReactNode } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader,DialogTitle } from '../ui/dialog';
import { useForm } from '@inertiajs/react';
import { Button } from '../ui/button';
import { AlertCircleIcon, FileIcon, UploadCloud } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';
import { FileUploader } from 'react-drag-drop-files';
import { useModal } from '@/Hooks/useModalStore';
import { toast } from '../ui/use-toast';

const fileTypes = ["JPG", "PNG", "WEBP",'JPEG','PDF'];

const MessageFileModal:FC = () => {
    const {isOpen,onClose,type,data:ModalData} = useModal();
    const [imgPreview,setImgPreview] = useState("");
    const [fileType,setFileType] = useState("");
    const { data, setData, post, processing, errors, reset } = useForm<{image:File|undefined,message:string}>({
        message:'',
        image: undefined,
    });

    const onSubmit:FormEventHandler = (e) =>{
        e.preventDefault();
        if(!ModalData.apiRoute){
            return null;
        }
        post(ModalData.apiRoute,{
            preserveScroll:true,
            preserveState:true,
            onSuccess:handleClose,
            onError:()=>toast({title:'Internal Error',description:`Can't upload image/PDF. Please try again!`})
        });
    }

    const onImageSelect:ChangeEventHandler<HTMLInputElement> = (e) =>{
        const {target}=e;
        if(!target.files||target.files?.length<1) return null;
        const file=target.files[0];
        setData('image',file);
        setFileType(file.type);
        //application/pdf
        if(file.type==='application/pdf'){
            return setImgPreview(`${route('home')}/uploads/pdf/pdf.png`);
        }
        const url = URL.createObjectURL(file) ;
        setImgPreview(url);
    }

    const onFileDrop = (file:File) =>{
        setData('image',file);
        setFileType(file.type);
        //application/pdf
        if(file.type==='application/pdf'){
            return setImgPreview(`${route('home')}/uploads/pdf/pdf.png`);
        }
        const url = URL.createObjectURL(file) ;
        setImgPreview(url);
    }

    const handleClose = () =>{
        reset();
        onClose();
        setImgPreview("");
    }

    useEffect(()=>{
        if(errors.image){
            toast({title:'Invalid File',description:errors.image});
        }
    },[errors.image]);

    const OPEN = useMemo(()=>isOpen&&type==='MessageFile',[isOpen,type]);
    
    

    return (
        <Dialog open={OPEN} onOpenChange={handleClose}>   
            <DialogContent className='p-0 overflow-hidden'>
                <DialogHeader className='pt-7 px-5'>
                    <DialogTitle className='text-2xl text-center font-bold'>Add Attachment</DialogTitle>
                    <DialogDescription className='text-center'>Send a File...</DialogDescription>
                </DialogHeader>
                <form id='server' onSubmit={onSubmit} className='flex flex-col space-y-7'>
                    <div className='flex flex-col space-y-7 px-5'>
                        <div className='flex flex-col items-center justify-center text-center'>
                            <FileUploader hoverTitle="Upload or drop a file right here" handleChange={onFileDrop} name="file" types={fileTypes}>
                                <label htmlFor="image" className='flex flex-col items-center justify-center cursor-pointer p-6'>
                                    {!imgPreview?<UploadCloud  size={150} />:<img src={imgPreview} width={150} height={150} />}
                                    <p>Click to Select an Image/PDF</p>
                                    <p>Or Drag and Drop Image/PDF Here...</p>
                                </label>
                            </FileUploader>
                            <input accept=".png,.jpeg,.jpg,.webp," onChange={onImageSelect} type="file" hidden id='image' />
                        </div>
                        
                    </div>
                </form>
                <DialogFooter className='px-5 py-3.5'>
                    <Button  disabled={processing} form='server' className=''>Send File</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default MessageFileModal


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