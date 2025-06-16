'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import { LoadingSpinner } from './loading-spinner';
import './product-image.css';

type ProductImageProps = {
  src: string;
  alt: string;
  onSale?: boolean;
};

export function ProductImage({ src, alt, onSale }: ProductImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Determinar qué imagen de placeholder usar basado en el nombre del producto
  const getPlaceholder = () => {
    const lowerAlt = alt.toLowerCase();
    if (lowerAlt.includes('auricular') || lowerAlt.includes('audio')) {
      return '/placeholder-headphones.svg';
    } else if (lowerAlt.includes('reloj') || lowerAlt.includes('smartwatch')) {
      return '/placeholder-watch.svg';
    } else {
      return '/placeholder-camera.svg';
    }
  };

  // Validar URL
  useEffect(() => {
    // Verificar si la URL es válida (comienza con http o https)
    if (!/^https?:\/\//i.test(src)) {
      setError(true);
      setLoading(false);
    }
  }, [src]);

  return (
    <div className="product-image-container">
      {loading && (
        <div className="product-image-placeholder">
          <LoadingSpinner size="md" color="primary" />
        </div>
      )}
      <Image
        src={error ? getPlaceholder() : src}
        alt={alt}
        fill
        className={`product-image ${loading ? 'product-image-loading' : 'product-image-loaded'}`}
        onError={() => {
          console.log('Error cargando imagen:', src);
          setError(true);
          setLoading(false);
        }}
        onLoad={() => {
          console.log('Imagen cargada correctamente:', src);
          setLoading(false);
        }}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={onSale}
      />
    </div>
  );
} 