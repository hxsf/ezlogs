export const EZLogs: (configs?: EZLogsConfig[]) => EZLogger

export interface EZLogger {
    trace: (...args: any[]) => void
    debug: (...args: any[]) => void
    info: (...args: any[]) => void
    log: (...args: any[]) => void
    warn: (...args: any[]) => void
    error: (...args: any[]) => void
    fatal: (...args: any[]) => void
}

export enum LogLevel {
    Trace = 'trace',
    Debug = 'debug',
    Info = 'info',
    Warn = 'warn',
    Error = 'error',
    Fatal = 'fatal',
}

export interface ConfigConsole {
    type: 'console'
    sep?: string // default: '#'
    level?: LogLevel
}

export interface ConfigFile {
    type: 'file'
    sep?: string // default: '#'
    level?: LogLevel
    pattern?: string // default ''
    filename: string
    path: string
}

export interface ConfigFileRoll {
    type: 'file-date' | 'file-size' | 'file-number'
    sep?: string // default: '#'
    level?: LogLevel
    pattern?: string // default ''
    filename: string
    path: string
    max_backup: number
    expire?: number //  default is 3600 * 24(one day) for date
    max_size?: number// default is 10000 for number, 1024kb for size
}

export type EZLogsConfig = ConfigFileRoll | ConfigConsole | ConfigFile
