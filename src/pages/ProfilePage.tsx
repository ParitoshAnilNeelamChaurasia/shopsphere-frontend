import { useForm } from 'react-hook-form';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface ProfileForm { name: string; email: string; phone: string; }

export default function ProfilePage() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const { register, handleSubmit, formState: { errors } } = useForm<ProfileForm>({ defaultValues: { name: user?.name ?? '', email: user?.email ?? '', phone: '9876543210' } });
  return <div className="page-shell container narrow-page"><div className="breadcrumb">Home / Profile</div><div className="page-title-row"><div><span className="eyebrow">Account settings</span><h1>Your profile</h1><p>These fields are local until the User Service is connected.</p></div></div><form className="checkout-card profile-form" onSubmit={handleSubmit(() => showToast('Profile saved locally.'))}><div className="profile-avatar">{user?.name.charAt(0) ?? 'S'}</div><label>Full name<input {...register('name', { required: 'Name is required' })} />{errors.name && <small className="field-error">{errors.name.message}</small>}</label><label>Email<input {...register('email', { required: 'Email is required' })} type="email" />{errors.email && <small className="field-error">{errors.email.message}</small>}</label><label>Phone<input {...register('phone')} /></label><div className="profile-role"><span>Current role</span><strong>{user?.role}</strong></div><button className="button button-dark" type="submit">Save changes</button></form></div>;
}
