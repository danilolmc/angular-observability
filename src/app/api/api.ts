import { InjectionToken } from "@angular/core";

export const api = 'https://dummyjson.com/posts'
export const API_ENDPOINT = new InjectionToken<string>('API_ENDPOINT');