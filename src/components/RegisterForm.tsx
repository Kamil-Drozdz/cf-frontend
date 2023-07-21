'use client';
import { Input } from '@/common/Input';
import { socialIcons } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { AiOutlineLock, AiOutlineMail } from 'react-icons/ai';
import { FiUser } from 'react-icons/fi';
import FormHeader from './FormHeader';
import { z } from 'zod';
import ErrorMessage from '@/common/ErrorMessage';
import Button from '@/common/Button';

const RegisterFormSchema = z.object({
	name: z
		.string()
		.nonempty('Name is required')
		.refine(value => {
			const trimmedName = value.trim();
			return trimmedName.split(' ').filter(Boolean).length >= 2;
		}, ' full name must contain at least two words'),
	email: z.string().email('Invalid email format'),
	password: z.string().min(8, 'Minimum password length is 8'),
});

const RegisterForm = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errors, setErrors] = useState<ErrorSchema | null>(null);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const result = RegisterFormSchema.safeParse({ name, email, password });
		if (result.success) {
			setErrors(null);
		} else {
			setErrors(result.error.formErrors.fieldErrors);
		}
	};

	return (
		<div className='w-[500px]'>
			<FormHeader />
			<div className='shadow-lg pb-8   bg-white'>
				<div className='relative overflow-hidden h-14 '>
					<Link href='/auth/signup' className='relative w-1/2 py-4 z-[1] inline-block text-center  bg-white right-shadow font-bold'>
						Sign Up
					</Link>
					<Link className='relative w-1/2 text-center inline-block py-4 z-0 bg-[#f9fbfb] font-bold' href='/auth/login'>
						Login
					</Link>
				</div>
				<form className='relative z-[3]  px-6 mt-4 py-6 space-y-8' onSubmit={handleSubmit}>
					<Input icon={<FiUser />} placeholder='First and last name' value={name} onChange={e => setName(e.target.value)} />
					<Input icon={<AiOutlineMail />} placeholder='E-mail' value={email} onChange={e => setEmail(e.target.value)} />
					<Input icon={<AiOutlineLock />} isPassword placeholder='Password' value={password} onChange={e => setPassword(e.target.value)} />
					{errors?.name && <ErrorMessage>{errors.name}</ErrorMessage>}
					{errors?.email && <ErrorMessage>{errors.email}</ErrorMessage>}
					{errors?.password && <ErrorMessage>{errors.password}</ErrorMessage>}
					<div className='flex justify-between items-center'>
						<label className='flex justify-between items-center' htmlFor='remember'>
							<input id='remember' className='mr-4 w-4 h-4 accent-green-700' type='checkbox' />
							Remember me
						</label>
						<Link className='text-blue-600 underline' href='/auth/forgot_password'>
							Forgot your password?
						</Link>
					</div>
					<Button text='	Create an account' variant='secondary' />
				</form>
				<div className='flex w-full  px-6 justify-center items-center'>
					<hr className='w-full' />
					<p className='w-fit whitespace-nowrap px-4 text-gray-300'>or connect with</p>
					<hr className='w-full' />
				</div>
				<ul className='flex w-full justify-between px-4 mt-4'>
					{socialIcons.map((icon, index) => (
						<li key={index} className={`${index !== socialIcons.length - 1 ? 'px-8 border-r-[1px] border-gray-200' : 'pr-8'}`}>
							<Image width={40} height={40} className='cursor-pointer' src={icon.src} alt={icon.alt} />
						</li>
					))}
				</ul>
			</div>
		</div>
	);
};

export default RegisterForm;