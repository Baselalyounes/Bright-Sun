
export enum PromptType {
    Text = 'نص',
    Code = 'كود',
    Image = 'صورة',
    Video = 'فيديو',
}

export interface Conversation {
    id: string;
    title: string;
    prompt: string;
    response: string;
}

export interface Process {
    id: string;
    name: string;
    progress: number;
    status: 'active' | 'completed';
}
