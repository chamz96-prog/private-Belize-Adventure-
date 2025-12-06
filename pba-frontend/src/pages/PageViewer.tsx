import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/client';

interface Page {
  title: string;
  content: string;
  updatedAt: string;
}

export default function PageViewer() {
  const { slug } = useParams();
  const [page, setPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await api.get(`/pages/slug/${slug}`);
        if (res.data) {
          setPage(res.data);
          document.title = `${res.data.title} | Private Belize Adventure`;
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch page:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchPage();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !page) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
        <p className="text-gray-600 mb-8">Page not found</p>
        <a href="/" className="text-blue-600 hover:text-blue-800 font-medium">
          Return Home
        </a>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">{page.title}</h1>
        <div 
          className="prose prose-lg max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: page.content }}
        />
        <div className="mt-12 pt-8 border-t border-gray-100 text-sm text-gray-400">
          Last updated: {new Date(page.updatedAt).toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}
