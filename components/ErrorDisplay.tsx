import React from 'react';
import { AlertTriangleIcon } from './icons/AlertTriangleIcon';

interface ErrorDisplayProps {
    message: string;
    onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message, onRetry }) => {
    return (
        <div className="text-center py-16 bg-brand-light-dark rounded-lg animate-fade-in">
            <div className="flex justify-center mb-4">
                <AlertTriangleIcon className="w-12 h-12 text-red-500" />
            </div>
            <h3 className="text-xl text-white font-semibold mb-2">Ой! Что-то пошло не так.</h3>
            <p className="text-brand-light-gray mb-6">{message}</p>
            <button
                onClick={onRetry}
                className="bg-brand-purple hover:bg-violet-700 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300"
            >
                Попробовать снова
            </button>
        </div>
    );
};