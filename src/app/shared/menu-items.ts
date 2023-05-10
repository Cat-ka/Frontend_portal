import { Injectable } from "@angular/core";

export interface Menu {
    state: string;
    name: string;
    type: string;
    icon: string;
    role: string | string[];
}

const MENUITEMS: Menu[] = [
    { state: 'dashboard', name: 'Úvodná stránka', type: 'link', icon: 'dashboard', role: '' },   
    { state: 'subject', name: 'Správa predmetov', type: 'link', icon: 'subject', role: 'teacher'},    
    { state: 'subject', name: 'Správa predmetov', type: 'link', icon: 'subject', role: 'admin' },
    { state: 'usersemestrals', name: 'Semestrálne práce - študent', type: 'link', icon: 'book', role: 'admin' },
    { state: 'usersemestrals', name: 'Semestrálne práce', type: 'link', icon: 'book', role: 'user' },
    { state: 'semestrals', name: 'Semestrálne práce', type: 'link', icon: 'book', role: 'admin' },
    { state: 'semestrals', name: 'Semestrálne práce', type: 'link', icon: 'book', role: 'teacher' },
    { state: 'semesterproject', name: 'Pridať semestrál. prácu', type: 'link', icon: 'library_add', role: 'admin' },
    { state: 'semesterproject', name: 'Pridať semestrál. prácu', type: 'link', icon: 'library_add', role: 'teacher' },
    { state: 'user', name: 'Správa používateľov', type: 'link', icon: 'people', role: 'admin' },

]

@Injectable()
export class MenuItems {
    getMenuitem(): Menu[] {
        return MENUITEMS;
    }
}