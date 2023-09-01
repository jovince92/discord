import { useEffect, FormEventHandler } from 'react';

import { Head, Link, useForm } from '@inertiajs/react';
import { Label } from '@/Components/ui/label';
import { Input } from '@/Components/ui/input';
import { Button } from '@/Components/ui/button';
import { Loader,AlertCircle } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/Components/ui/alert';

export default function Login({ status, canResetPassword }: { status?: string, canResetPassword: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'));
    };

    return (
        <>
            <Head title='Log In' />
            <div className="lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col space-y-2 text-center">
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Sign In
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Enter your email and password
                        </p>
                    </div>
                    <div className='grid gap-6'>
                        <form onSubmit={submit}>
                            {
                                (errors.email||errors.password)&&(
                                    <Alert variant="destructive" className='mb-6'>
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Error</AlertTitle>
                                        
                                        <AlertDescription className='flex flex-col space-y-1.5'>
                                            <span>
                                                {errors?.email}
                                            </span>
                                            <span>
                                                {errors?.password}
                                            </span>
                                        </AlertDescription>
                                    </Alert>
                                )
                            }
                            <div className="grid gap-6">
                                <div className="grid gap-1.5">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input
                                        required
                                        id="email"
                                        placeholder="name@example.com"
                                        type="text"
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
                                <Button disabled={processing}>
                                    {processing && (
                                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                                    )}
                                    Sign In
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
                    New User?
                    <Link
                        href={route('register')}
                        className="ml-2 underline underline-offset-4 hover:text-primary"
                    >
                        Register
                    </Link>
                    .
                    </p>
                </div>
            </div>
        </>
    );
}
