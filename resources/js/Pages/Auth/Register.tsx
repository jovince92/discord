import { useEffect, FormEventHandler } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';
import { AlertCircle, Loader } from 'lucide-react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'));
    };

    return (
        <>
            <Head title='Log In' />
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Create Account
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your details
                        </p>
                    </div>
                    <div className='grid gap-6'>
                        <form onSubmit={submit}>
                            {
                                (errors.email||errors.password||errors.name||errors.password_confirmation)&&(
                                    <Alert variant="destructive" className='mb-6'>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        
                                        <AlertDescription className='flex flex-col space-y-1.5'>
                                            <span>
                                                {errors?.email}
                                            </span>
                                            <span>
                                                {errors?.password}
                                            </span><span>
                                                {errors?.name}
                                            </span>
                                        </AlertDescription>
                                    </Alert>
                                )
                            }
                            
                            <div className="grid gap-6">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="name">
                                        Name
                                    </Label>
                                    <Input
                                        required
                                        id="name"
                                        placeholder="name@example.com"
                                        type="text"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('name', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        id="email"
                                        placeholder="name@example.com"
                                        type="email"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('email', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input
                                        required
                                        id="password"
                                        placeholder="password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('password', target.value)}
                                    />
                                </div>
                                <div className="grid gap-1.5">
                                    <Label htmlFor="password_confirmation">
                                        Password Confirmation
                                    </Label>
                                    <Input
                                        required
                                        id="password_confirmation"
                                        placeholder="password"
                                        type="password"
                                        autoCapitalize="none"
                                        autoComplete="off"
                                        autoCorrect="off"
                                        disabled={processing}
                                        onChange={({target}) => setData('password_confirmation', target.value)}
                                    />
                                </div>
                                <Button disabled={processing}>
                                    {processing && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign Up
                                </Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t" />
                            </div>
                        </div>
                    </div>
                    <p className="px-8 text-center text-sm text-muted-foreground">
                    Already have an account?
                    <Link
                        href={route('login')}
                        className="ml-2 underline underline-offset-4 hover:text-primary"
                    >
                        Login
                    </Link>
                    .
                    </p>
                </div>
            </div>
        </>
        
    );
}
