import { SemesterProject } from "./semester-project";

export class SemesterFile {
    id!: number;
    fileName!: string;
    fileData: any;  // v Angulari nemáme typ byte[], takže tu môžeme použiť any
    type!: string;
    semesterProject!: SemesterProject;  // predpokladám, že máte už vytvorený model SemesterProject

    constructor(id: number, fileName: string, fileData: any, type: string, semesterProject: SemesterProject) {
        this.id = id;
        this.fileName = fileName;
        this.fileData = fileData;
        this.type = type;
        this.semesterProject = semesterProject;
    }
}
