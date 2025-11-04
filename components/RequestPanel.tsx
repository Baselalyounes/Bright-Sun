
import React, { useMemo } from 'react';
import type { Conversation } from '../types';
import { PromptType } from '../types';
import { HistoryIcon } from './icons/HistoryIcon';
import { BulbIcon } from './icons/BulbIcon';
import { CodeIcon } from './icons/CodeIcon';
import { TextIcon } from './icons/TextIcon';

interface RequestPanelProps {
    prompt: string;
    setPrompt: (prompt: string) => void;
    onGenerate: () => void;
    isLoading: boolean;
    conversations: Conversation[];
    activeConversationId: string | null;
    onSelectConversation: (conversation: Conversation) => void;
    onSuggestionClick: (suggestion: string) => void;
}

const suggestions = [
    "اكتب دالة JavaScript لترتيب مصفوفة من الأرقام.",
    "أنشئ قصيدة عن شروق الشمس فوق الصحراء.",
    "صمم مكون React لبطاقة ملف شخصي.",
    "اشرح مفهوم الحوسبة الكمومية لشخص مبتدئ."
];

export const RequestPanel: React.FC<RequestPanelProps> = ({
    prompt,
    setPrompt,
    onGenerate,
    isLoading,
    conversations,
    activeConversationId,
    onSelectConversation,
    onSuggestionClick
}) => {
    const promptType = useMemo(() => {
        const codeKeywords = ['function', 'const', 'let', 'import', 'def', 'class', 'SELECT', '<div'];
        if (codeKeywords.some(keyword => prompt.includes(keyword))) {
            return PromptType.Code;
        }
        return PromptType.Text;
    }, [prompt]);

    return (
        <aside className="w-1/4 bg-gray-800/50 p-4 flex flex-col border-l border-gray-700/50 overflow-y-auto">
            <div className="flex-grow flex flex-col">
                <div className="relative mb-4">
                    <textarea
                        className="w-full h-40 p-3 bg-gray-900 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-yellow-400 focus:outline-none transition-all duration-300 placeholder-gray-500"
                        placeholder="اكتب طلبك هنا..."
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
                                onGenerate();
                            }
                        }}
                    />
                     <div className="absolute top-2 left-2 flex items-center bg-gray-700/80 text-gray-300 text-xs px-2 py-1 rounded-full">
                        {promptType === PromptType.Code ? <CodeIcon className="w-4 h-4 mr-1 text-cyan-400" /> : <TextIcon className="w-4 h-4 mr-1 text-green-400" />}
                        <span>تحليل الطلب: {promptType}</span>
                    </div>
                </div>
                <button
                    onClick={onGenerate}
                    disabled={isLoading || !prompt}
                    className="w-full py-3 px-4 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-400 disabled:bg-gray-600 disabled:cursor-not-allowed transition-colors duration-300 flex items-center justify-center"
                >
                    {isLoading ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            جاري الإنشاء...
                        </>
                    ) : (
                        'إنشاء'
                    )}
                </button>

                <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center"><BulbIcon className="w-5 h-5 ml-2 text-yellow-300"/> اقتراحات ذكية</h3>
                    <div className="space-y-2">
                        {suggestions.map((s, i) => (
                            <button key={i} onClick={() => onSuggestionClick(s)} className="w-full text-right text-sm p-2 bg-gray-700/50 hover:bg-gray-700 rounded-md transition-colors duration-200">
                                {s}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 flex-shrink-0">
                <h3 className="text-lg font-semibold mb-3 flex items-center"><HistoryIcon className="w-5 h-5 ml-2"/> محادثاتي السابقة</h3>
                <ul className="space-y-2 max-h-48 overflow-y-auto pr-2">
                    {conversations.length > 0 ? conversations.map(convo => (
                        <li key={convo.id}>
                            <button
                                onClick={() => onSelectConversation(convo)}
                                className={`w-full text-right p-2 rounded-md truncate transition-colors duration-200 ${activeConversationId === convo.id ? 'bg-yellow-500/20 text-yellow-300' : 'hover:bg-gray-700'}`}
                            >
                                {convo.title}
                            </button>
                        </li>
                    )) : (
                        <p className="text-gray-500 text-sm">لا توجد محادثات سابقة.</p>
                    )}
                </ul>
            </div>
        </aside>
    );
};
