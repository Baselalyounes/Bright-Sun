
import React, { useState, useCallback } from 'react';
import { RequestPanel } from './components/RequestPanel';
import { ActiveProcessesPanel } from './components/ActiveProcessesPanel';
import { ResultsPanel } from './components/ResultsPanel';
import type { Conversation, Process } from './types';
import { generateContent } from './services/geminiService';
import { SunIcon } from './components/icons/SunIcon';

const App: React.FC = () => {
    const [prompt, setPrompt] = useState<string>('');
    const [response, setResponse] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [conversations, setConversations] = useState<Conversation[]>([]);
    const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

    const initialProcesses: Process[] = [
        { id: '1', name: 'Generating video thumbnail', progress: 75, status: 'active' },
        { id: '2', name: 'Compiling React Native app', progress: 40, status: 'active' },
        { id: '3', name: 'Training custom model', progress: 100, status: 'completed' },
    ];
    const [processes, setProcesses] = useState<Process[]>(initialProcesses);

    const handleGenerate = useCallback(async () => {
        if (!prompt || isLoading) return;

        setIsLoading(true);
        setError(null);
        setResponse('');

        try {
            const result = await generateContent(prompt);
            setResponse(result);
            
            const newConversation: Conversation = {
                id: Date.now().toString(),
                title: prompt.substring(0, 30) + (prompt.length > 30 ? '...' : ''),
                prompt: prompt,
                response: result,
            };
            setConversations(prev => [newConversation, ...prev]);
            setActiveConversationId(newConversation.id);

        } catch (err) {
            setError('فشل في إنشاء المحتوى. الرجاء المحاولة مرة أخرى.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    }, [prompt, isLoading]);

    const handleSelectConversation = (conversation: Conversation) => {
        setPrompt(conversation.prompt);
        setResponse(conversation.response);
        setActiveConversationId(conversation.id);
        setError(null);
    };

    const handleSuggestionClick = (suggestion: string) => {
        setPrompt(suggestion);
    };

    return (
        <div className="h-screen w-full flex flex-col font-sans bg-gray-900 text-gray-200">
            <header className="flex-shrink-0 bg-gray-900/80 backdrop-blur-sm border-b border-gray-700/50 p-3 flex items-center justify-between shadow-lg">
                <div className="flex items-center space-x-3 rtl:space-x-reverse">
                    <SunIcon className="w-8 h-8 text-yellow-400" />
                    <h1 className="text-xl font-bold tracking-wider">Bright Sun</h1>
                </div>
                <div className="text-sm text-gray-400">
                    مساحة العمل الإبداعية المدعومة بالذكاء الاصطناعي
                </div>
            </header>
            <main className="flex-grow flex flex-row overflow-hidden">
                <RequestPanel
                    prompt={prompt}
                    setPrompt={setPrompt}
                    onGenerate={handleGenerate}
                    isLoading={isLoading}
                    conversations={conversations}
                    activeConversationId={activeConversationId}
                    onSelectConversation={handleSelectConversation}
                    onSuggestionClick={handleSuggestionClick}
                />
                <ActiveProcessesPanel processes={processes} />
                <ResultsPanel
                    response={response}
                    isLoading={isLoading}
                    error={error}
                />
            </main>
        </div>
    );
};

export default App;
