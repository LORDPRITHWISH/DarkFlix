
export interface items {
    name: string;
    type: 'file' | 'folder';
    relativePath: string;
    originalPath: string;
    thumbnail?: string;
    children?: items[];
}

export interface responseData {
    data: items[];
    message: string;
    success: boolean;
}