import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }
        // Handle signup logic here
        setError('');
        navigate('/'); // Redirect to login after signup
    };

    const handleGoogleSignup = () => {
        // TODO: Integrate Google OAuth
        alert('Google signup not implemented');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200">
            <Card className="w-full max-w-md shadow-xl border-0">
                <CardHeader>
                    <CardTitle className="text-3xl text-center font-bold mb-2">Create Account</CardTitle>
                    <p className="text-center text-gray-500 text-sm">Sign up to get started</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="text-red-500 text-center text-sm">{error}</div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                autoComplete="name"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                autoComplete="email"
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
                                autoComplete="new-password"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm Password</Label>
                            <Input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                autoComplete="new-password"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Sign up
                        </Button>
                    </form>
                    <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-200" />
                        <span className="mx-2 text-gray-400 text-xs">OR</span>
                        <div className="flex-grow border-t border-gray-200" />
                    </div>
                    <Button
                        variant="outline"
                        className="w-full flex items-center justify-center gap-2"
                        type="button"
                        onClick={handleGoogleSignup}
                    >
                        <FcGoogle className="text-xl" />
                        Sign up with Google
                    </Button>
                    <div className="text-center mt-6 text-sm">
                        Already have an account?{' '}
                        <Link to="/" className="text-indigo-600 hover:underline font-medium">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
};

export default Signup;