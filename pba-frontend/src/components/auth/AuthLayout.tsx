import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  image?: string;
}

export default function AuthLayout({ children, title, subtitle, image = "https://images.unsplash.com/photo-1544582568-7685c359750b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24 w-full lg:w-[480px] xl:w-[560px]">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="mb-8">
            <Link to="/" className="inline-flex items-center text-sm text-gray-500 hover:text-gray-900 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>
          
          <div className="mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">{title}</h2>
            <p className="mt-2 text-sm text-gray-600">
              {subtitle}
            </p>
          </div>

          {children}
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:block relative w-0 flex-1">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src={image}
          alt="Authentication background"
        />
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-12 text-white">
          <blockquote className="max-w-xl">
            <p className="text-xl font-medium mb-4">
              "The journey of a thousand miles begins with a single step. Start your Belize adventure today."
            </p>
            <footer className="text-sm font-medium text-gray-300">
              — Private Belize Adventure
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
