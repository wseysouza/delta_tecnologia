import React, { createContext, useCallback, useContext, useState } from 'react';
import { toast } from '../components/Toast';

import { api } from '../services/api';

export interface StudentProps {
    objectId: string,
    name: string,
    adress: string,
    photo: string,
}

export interface PutPostStudentProps {
    name?: string,
    adress?: string,
    photo?: string,
}

export interface DataStudentProps {
    data?: {}
    name: string,
}

export interface DeltaContextData {
    listStudents: StudentProps[];
    studentFilter: StudentProps[];
    studentNotFound: boolean;
    clearSearchStudent: () => void;
    searchStudent: (data: DataStudentProps, callDelete?: boolean) => void;
    getListStudent(): Promise<void>;
    postStudent: (student: PutPostStudentProps) => void;
    putStudent: (id: string, student: PutPostStudentProps) => void;
    deleteStudent: (id: string) => void;
}


const DeltaContext = createContext<DeltaContextData>({} as DeltaContextData)

export const DeltaProvider: React.FC = ({ children }) => {
    const [listStudents, setListStudents] = useState<StudentProps[]>([])
    const [studentFilter, setStudentFilter] = useState<StudentProps[]>([]);
    const [studentNotFound, setStudentNotFound] = useState(false);

    const clearSearchStudent = () => {
        setStudentFilter([]);
        setStudentNotFound(false);
    }

    const searchStudent = useCallback((data: DataStudentProps, callDelete = true) => {
        if (callDelete) {
            setStudentNotFound(true)
        }
        const filterList = listStudents.filter(student => {
            if (student.name.toLowerCase().trim() === data.name.toLowerCase().trim()) {
                setStudentNotFound(false)
                return student;
            }
        })
        setStudentFilter(filterList)
    }, [listStudents])


    const getListStudent = async () => {

        try {
            const { data } = await api.get("/Aluno");
            setListStudents(data.results);
        } catch (error) {
            console.warn("error >> ", error)
            toast.warn({ menssage: "Lista de alunos não encontrada" });
        }
    }

    const postStudent = async (student: PutPostStudentProps) => {
        try {
            await api.post("/Aluno", student);
            toast.success({ menssage: "Aluno cadastrado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao cadastrar" });
        }
    }

    const putStudent = async (id: string, student: PutPostStudentProps) => {
        try {
            await api.put(`/Aluno/${id}`, student);
            toast.success({ menssage: "Aluno alterado com sucesso!!!" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao editar" });
        }
    }

    const deleteStudent = async (id: string) => {
        try {
            await api.delete(`/Aluno/${id}`);
            toast.success({ menssage: "Aluno deletado com sucesso" });
        } catch (error) {
            console.warn("typeError >> ", error)
            toast.warn({ menssage: "Erro ao deletar" });
        }
    }

    return (
        <DeltaContext.Provider value={{
            listStudents,
            studentNotFound,
            studentFilter,
            searchStudent,
            clearSearchStudent,
            getListStudent,
            postStudent,
            putStudent,
            deleteStudent
        }}>
            {children}
        </DeltaContext.Provider>
    )
}


export const useDelta = () => {
    const context = useContext(DeltaContext);

    if (!context) {
        throw new Error('useDelta must be used within an homeProps')
    }

    return context;
}
