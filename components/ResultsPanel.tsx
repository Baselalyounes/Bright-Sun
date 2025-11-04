
import React from 'react';
import { SpinnerIcon } from './icons/SpinnerIcon';
import { SunIcon } from './icons/SunIcon';

interface ResultsPanelProps {
    response: string;
    isLoading: boolean;
    error: string | null;
}

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ response, isLoading, error }) => {
    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <SpinnerIcon className="w-16 h-16 mb-4" />
                    <p className="text-lg">يفكر الذكاء الاصطناعي...</p>
                </div>
            );
        }

        if (error) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-red-400">
                    <p className="text-lg font-semibold">حدث خطأ</p>
                    <p>{error}</p>
                </div>
            );
        }

        if (response) {
            return (
                <pre className="whitespace-pre-wrap break-words">
                    <code className="font-mono text-base leading-relaxed">{response}</code>
                </pre>
            );
        }

        return (
            <div className="flex flex-col items-center justify-center h-full text-center text-gray-500">
                <SunIcon className="w-24 h-24 mb-4 opacity-10" />
                <h2 className="text-2xl font-bold mb-2">مرحبًا بك في Bright Sun</h2>
                <p className="max-w-md">ستظهر نتائجك هنا. ابدأ بكتابة طلب في اللوحة اليمنى لإطلاق العنان لقوة الذكاء الاصطناعي.</p>
            </div>
        );
    };

    return (
        <main className="flex-grow w-1/2 bg-gray-900 flex flex-col">
             <div className="flex-shrink-0 bg-gray-800/50 p-3 border-b border-gray-700/50 flex justify-between items-center">
                <h2 className="text-xl font-bold">المعاينة والنتائج</h2>
                <div className="space-x-2 rtl:space-x-reverse">
                    <button className="px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 rounded-md transition-colors">حفظ</button>
                    <button className="px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 rounded-md transition-colors">تصدير</button>
                </div>
            </div>
            <div className="flex-grow p-6 overflow-y-auto">
                {renderContent()}
            </div>
        </main>
    );
};
