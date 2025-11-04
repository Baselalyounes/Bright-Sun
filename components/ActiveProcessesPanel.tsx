
import React from 'react';
import type { Process } from '../types';
import { UserIcon } from './icons/UserIcon';

interface ActiveProcessesPanelProps {
    processes: Process[];
}

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => (
    <div className="w-full bg-gray-700 rounded-full h-2.5">
        <div
            className="bg-green-500 h-2.5 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
        ></div>
    </div>
);

export const ActiveProcessesPanel: React.FC<ActiveProcessesPanelProps> = ({ processes }) => {
    return (
        <aside className="w-1/4 bg-gray-800 p-4 border-l border-r border-gray-700/50 flex flex-col space-y-8 overflow-y-auto">
            <div>
                <h2 className="text-xl font-bold mb-4 flex items-center">
                    <UserIcon className="w-6 h-6 ml-2"/>
                    حسابي
                </h2>
                <div className="bg-gray-900/50 p-4 rounded-lg space-y-3">
                    <div className="flex items-center space-x-3 rtl:space-x-reverse">
                        <img src="https://picsum.photos/50" alt="User Avatar" className="w-12 h-12 rounded-full border-2 border-yellow-400" />
                        <div>
                            <p className="font-semibold">المستخدم النشط</p>
                            <p className="text-sm text-gray-400">user@brightsun.ai</p>
                        </div>
                    </div>
                    <div>
                        <p className="text-sm">الخطة: <span className="font-bold text-yellow-400">مميزة</span></p>
                        <p className="text-xs text-gray-500">$10 سنويًا - صلاحية حتى 2025/12/31</p>
                    </div>
                </div>
            </div>
            
            <div>
                <h2 className="text-xl font-bold mb-4">العمليات الجارية</h2>
                <div className="space-y-5">
                    {processes.map(proc => (
                        <div key={proc.id} className="bg-gray-900/50 p-3 rounded-lg">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-sm font-medium">{proc.name}</span>
                                <span className={`text-xs font-semibold ${proc.status === 'completed' ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {proc.status === 'completed' ? 'مكتمل' : `${proc.progress}%`}
                                </span>
                            </div>
                            <ProgressBar progress={proc.progress} />
                        </div>
                    ))}
                </div>
            </div>
        </aside>
    );
};
