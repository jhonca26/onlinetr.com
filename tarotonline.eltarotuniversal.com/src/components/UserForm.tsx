import { useForm } from 'react-hook-form';
import { UserData } from '../types/tarot';

interface Props {
  onSubmit: (data: UserData) => void;
}

export const UserForm: React.FC<Props> = ({ onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<UserData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 md:p-6 bg-purple-900/30 rounded-lg backdrop-blur-sm">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-purple-100">Nombre</label>
          <input
            {...register('name', { required: 'El nombre es requerido' })}
            className="mt-1 block w-full rounded-md border-purple-300 bg-purple-900/20 text-purple-100 placeholder-purple-300 px-4 py-2"
            placeholder="Tu nombre"
          />
          {errors.name && <span className="text-red-400 text-sm">{errors.name.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-100">Email</label>
          <input
            {...register('email', { 
              required: 'El email es requerido',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Por favor ingresa un email válido'
              }
            })}
            className="mt-1 block w-full rounded-md border-purple-300 bg-purple-900/20 text-purple-100 placeholder-purple-300 px-4 py-2"
            placeholder="tu@email.com"
          />
          {errors.email && <span className="text-red-400 text-sm">{errors.email.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-100">Teléfono</label>
          <input
            {...register('phone', { 
              required: 'El teléfono es requerido',
              pattern: {
                value: /^[0-9]+$/,
                message: 'Por favor ingresa solo números'
              }
            })}
            className="mt-1 block w-full rounded-md border-purple-300 bg-purple-900/20 text-purple-100 placeholder-purple-300 px-4 py-2"
            placeholder="Tu teléfono"
            type="tel"
          />
          {errors.phone && <span className="text-red-400 text-sm">{errors.phone.message}</span>}
        </div>

        <div>
          <label className="block text-sm font-medium text-purple-100">¿Qué te gustaría consultar?</label>
          <textarea
            {...register('question', { 
              required: 'Por favor escribe tu pregunta',
              minLength: {
                value: 10,
                message: 'Tu pregunta debe tener al menos 10 caracteres'
              },
              maxLength: {
                value: 500,
                message: 'Tu pregunta no debe exceder los 500 caracteres'
              }
            })}
            className="mt-1 block w-full rounded-md border-purple-300 bg-purple-900/20 text-purple-100 placeholder-purple-300 px-4 py-2 h-24 resize-none"
            placeholder="Describe tu situación o pregunta para una lectura más precisa..."
          />
          {errors.question && <span className="text-red-400 text-sm">{errors.question.message}</span>}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors"
        >
          Continuar con la Lectura
        </button>
      </div>
    </form>
  );
};