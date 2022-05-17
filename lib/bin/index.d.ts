#!/usr/bin/env node 
export interface ICommand {
    version: string;
    description: string;
    command: string;
    action: (value?: any) => void;
}
