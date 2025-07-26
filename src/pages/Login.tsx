import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!username || !password) {
            setError('Both fields are required');
            return;
        }
        // Handle login logic here
        setError('');
        navigate('/home'); // Redirect to home after login
    };

    const handleGoogleLogin = () => {
        // TODO: Integrate Google OAuth
        alert('Google login not implemented');
    };

    const handleGithubLogin = () => {
        // TODO: Integrate GitHub OAuth
        alert('GitHub login not implemented');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-3xl text-center font-bold mb-2">Welcome Back</CardTitle>
                    <p className="text-center text-gray-500 text-sm">Sign in to your account</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="text-red-500 text-center text-sm">{error}</div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            <Input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                autoComplete="username"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                autoComplete="current-password"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                    </form>
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200" />
                        <span className="mx-2 text-gray-400 text-xs">OR</span>
                        <div className="flex-grow border-t border-gray-200" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                            type="button"
                            onClick={handleGoogleLogin}
                        >
                            <FcGoogle className="text-xl" />
                            Continue with Google
                        </Button>
                        <Button
                            variant="outline"
                            className="w-full flex items-center justify-center gap-2"
                            type="button"
                            onClick={handleGithubLogin}
                        >
                            <FaGithub className="text-xl" />
                            Continue with GitHub
                        </Button>
                    </div>
                    <div className="text-center mt-6 text-sm">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-600 hover:underline font-medium">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Login;